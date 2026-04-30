import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

export type ReservationItem = {
  id: string
  name: string
  email: string
  phone: string | null
  people: number
  reserved_at: string
  notes: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}

export default function ReservationsList() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ReservationItem[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editingNotes, setEditingNotes] = useState<Record<string, string | undefined>>({})

  // 追加: キーワード検索、期間フィルタ、任意の日付範囲
  const [q, setQ] = useState('')
  const [period, setPeriod] = useState<'all' | 'upcoming' | 'past'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = useMemo(() => {
    let rows = items
    if (filter !== 'all') {
      rows = rows.filter((i) => i.status === filter)
    }
    // 期間フィルタ
    const now = Date.now()
    if (period === 'upcoming') {
      rows = rows.filter((i) => new Date(i.reserved_at).getTime() >= now)
    } else if (period === 'past') {
      rows = rows.filter((i) => new Date(i.reserved_at).getTime() < now)
    }
    // 日付範囲フィルタ（オプション）
    if (dateFrom) {
      const fromTs = new Date(`${dateFrom}T00:00:00`).getTime()
      rows = rows.filter((i) => new Date(i.reserved_at).getTime() >= fromTs)
    }
    if (dateTo) {
      const toTs = new Date(`${dateTo}T23:59:59`).getTime()
      rows = rows.filter((i) => new Date(i.reserved_at).getTime() <= toTs)
    }
    // キーワード検索（名前 / メール / 電話 / メモ）
    if (q.trim()) {
      const kw = q.trim().toLowerCase()
      rows = rows.filter((i) =>
        (i.name && i.name.toLowerCase().includes(kw)) ||
        (i.email && i.email.toLowerCase().includes(kw)) ||
        (i.phone && i.phone.toLowerCase().includes(kw)) ||
        (i.notes && i.notes.toLowerCase().includes(kw))
      )
    }
    return rows
  }, [items, filter, period, dateFrom, dateTo, q])

  const load = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('reserved_at', { ascending: false })
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
      toast.error('読み込みに失敗しました', { description: error.message })
    } else {
      setItems((data ?? []) as ReservationItem[])
    }
    setLoading(false)
  }

  useEffect(() => {
    void load()
  }, [])

  // 管理者判定
  useEffect(() => {
    (async () => {
      setAdminError(null)
      const { data: userResp } = await supabase.auth.getUser()
      const user = userResp.user
      if (!user) {
        setIsAdmin(false)
        return
      }
      const { data, error } = await supabase.rpc('is_admin', { uid: user.id })
      if (error) {
        setAdminError(error.message)
        setIsAdmin(false)
      } else {
        setIsAdmin(!!data)
      }
    })()
  }, [])

  const handleUpdateStatus = async (id: string, status: ReservationItem['status']) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ更新できます' })
      return
    }
    setSavingId(id)
    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single()
    setSavingId(null)
    if (error) {
      toast.error('更新に失敗しました', { description: error.message })
      return
    }
    toast.success('ステータスを更新しました')
    setItems((prev) => prev.map((it) => (it.id === id ? (data as ReservationItem) : it)))
  }

  const handleSaveNotes = async (id: string) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ更新できます' })
      return
    }
    const notes = editingNotes[id] ?? null
    setSavingId(id)
    const { data, error } = await supabase
      .from('reservations')
      .update({ notes })
      .eq('id', id)
      .select('*')
      .single()
    setSavingId(null)
    if (error) {
      toast.error('メモの更新に失敗しました', { description: error.message })
      return
    }
    toast.success('メモを保存しました')
    setItems((prev) => prev.map((it) => (it.id === id ? (data as ReservationItem) : it)))
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ削除できます' })
      return
    }
    if (!confirm('この予約を削除しますか？')) return
    setDeletingId(id)
    const { error } = await supabase.from('reservations').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      toast.error('削除に失敗しました', { description: error.message })
      return
    }
    toast.success('削除しました')
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const statusLabel = (s: ReservationItem['status']) =>
    s === 'pending' ? '保留' : s === 'confirmed' ? '確定' : 'キャンセル'

  const Row = ({ item }: { item: ReservationItem }) => {
    const [status, setStatus] = useState<ReservationItem['status']>(item.status)
    useEffect(() => setStatus(item.status), [item.status])

    return (
      <div className="border rounded p-3 space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm font-medium">{item.name}</div>
            <div className="text-xs text-zinc-500">{item.email}{item.phone ? ` / ${item.phone}` : ''}</div>
          </div>
          <div className="text-right text-sm text-zinc-600">
            <span>人数 {item.people}名</span>
            <span className="ml-3">予約日時 {new Date(item.reserved_at).toLocaleString()}</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3 items-start">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">ステータス</label>
            <div className="flex gap-2 items-center">
              <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                <SelectTrigger className="w-40"><SelectValue placeholder="選択" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">保留</SelectItem>
                  <SelectItem value="confirmed">確定</SelectItem>
                  <SelectItem value="cancelled">キャンセル</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => handleUpdateStatus(item.id, status)} disabled={!isAdmin || savingId === item.id}>
                {savingId === item.id ? '保存中...' : '保存'}
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} disabled={!isAdmin || deletingId === item.id}>
                {deletingId === item.id ? '削除中...' : '削除'}
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">メモ</label>
            <Textarea
              placeholder="任意"
              value={editingNotes[item.id] ?? item.notes ?? ''}
              onChange={(e) => setEditingNotes((p) => ({ ...p, [item.id]: e.target.value }))}
            />
            <div className="mt-2 text-right">
              <Button size="sm" variant="outline" onClick={() => handleSaveNotes(item.id)} disabled={!isAdmin || savingId === item.id}>
                {savingId === item.id ? '保存中...' : 'メモを保存'}
              </Button>
            </div>
          </div>
        </div>
        <div className="text-xs text-zinc-500">作成: {new Date(item.created_at).toLocaleString()} / 現在の状態: {statusLabel(item.status)}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">予約管理</h1>
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <div className="flex gap-2 items-center">
            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="フィルター" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="pending">保留</SelectItem>
                <SelectItem value="confirmed">確定</SelectItem>
                <SelectItem value="cancelled">キャンセル</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="期間" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての期間</SelectItem>
                <SelectItem value="upcoming">今後の予約</SelectItem>
                <SelectItem value="past">過去の予約</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="検索: 名前・メール・電話・メモ"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-64"
            />
          </div>
          <div className="flex gap-2 items-center">
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} aria-label="開始日" />
            <span className="text-sm text-zinc-500">〜</span>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} aria-label="終了日" />
            <Button variant="outline" onClick={load} disabled={loading}>再読込</Button>
          </div>
        </div>
      </div>

      {isAdmin === false && (
        <div className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded p-3">
          現在このアカウントには管理者権限がありません。更新・削除は行えません。
          {adminError && <span className="ml-2 text-red-600">({adminError})</span>}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-zinc-500">読み込み中...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <Row key={item.id} item={item} />
          ))}
          {filtered.length === 0 && (
            <div className="text-sm text-zinc-500">データがありません</div>
          )}
        </div>
      )}
    </div>
  )
}