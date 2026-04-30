import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

export type ContactItem = {
  id: string
  name: string
  email: string
  message: string
  status: 'new' | 'in_progress' | 'resolved'
  created_at: string
}

export default function ContactsList() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<ContactItem[]>([])
  const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'resolved'>('all')
  // 追加: 検索・期間クイック・任意日付
  const [q, setQ] = useState('')
  const [period, setPeriod] = useState<'all' | 'today' | 'last7' | 'last30'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let out = items
    if (filter !== 'all') out = out.filter((i) => i.status === filter)
    if (q.trim()) {
      const s = q.trim().toLowerCase()
      out = out.filter((i) =>
        (i.name ?? '').toLowerCase().includes(s) ||
        (i.email ?? '').toLowerCase().includes(s) ||
        (i.message ?? '').toLowerCase().includes(s)
      )
    }
    if (period !== 'all') {
      const now = new Date()
      let start: Date
      if (period === 'today') {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      } else if (period === 'last7') {
        start = new Date(now)
        start.setDate(start.getDate() - 7)
      } else {
        start = new Date(now)
        start.setDate(start.getDate() - 30)
      }
      out = out.filter((i) => new Date(i.created_at) >= start)
    }
    if (dateFrom) {
      const df = new Date(dateFrom)
      out = out.filter((i) => new Date(i.created_at) >= df)
    }
    if (dateTo) {
      const dtEnd = new Date(dateTo)
      dtEnd.setHours(23, 59, 59, 999)
      out = out.filter((i) => new Date(i.created_at) <= dtEnd)
    }
    return out
  }, [items, filter, q, period, dateFrom, dateTo])

  const load = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
      toast.error('読み込みに失敗しました', { description: error.message })
    } else {
      setItems((data ?? []) as ContactItem[])
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

  const handleUpdateStatus = async (id: string, status: ContactItem['status']) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ更新できます' })
      return
    }
    setSavingId(id)
    const { data, error } = await supabase
      .from('contact_messages')
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
    setItems((prev) => prev.map((it) => (it.id === id ? (data as ContactItem) : it)))
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ削除できます' })
      return
    }
    if (!confirm('このお問い合わせを削除しますか？')) return
    setDeletingId(id)
    const { error } = await supabase.from('contact_messages').delete().eq('id', id)
    setDeletingId(null)
    if (error) {
      toast.error('削除に失敗しました', { description: error.message })
      return
    }
    toast.success('削除しました')
    setItems((prev) => prev.filter((it) => it.id !== id))
  }

  const statusLabel = (s: ContactItem['status']) =>
    s === 'new' ? '新規' : s === 'in_progress' ? '対応中' : '解決済み'

  const statusColor = (s: ContactItem['status']) =>
    s === 'new' ? 'bg-red-500' : s === 'in_progress' ? 'bg-yellow-500' : 'bg-green-500'

  const Row = ({ item }: { item: ContactItem }) => {
    const [status, setStatus] = useState<ContactItem['status']>(item.status)
    useEffect(() => setStatus(item.status), [item.status])

    return (
      <div className="border rounded p-4 space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="text-sm font-medium">{item.name}</div>
            <div className="text-xs text-zinc-500">{item.email}</div>
          </div>
          <div className="text-right text-sm text-zinc-600">
            <span>受信: {new Date(item.created_at).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="bg-zinc-50 rounded p-3">
          <div className="text-sm whitespace-pre-wrap">{item.message}</div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Badge className={statusColor(item.status)}>{statusLabel(item.status)}</Badge>
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">新規</SelectItem>
                <SelectItem value="in_progress">対応中</SelectItem>
                <SelectItem value="resolved">解決済み</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" onClick={() => handleUpdateStatus(item.id, status)} disabled={!isAdmin || savingId === item.id}>
              {savingId === item.id ? '保存中...' : '保存'}
            </Button>
          </div>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} disabled={!isAdmin || deletingId === item.id}>
            {deletingId === item.id ? '削除中...' : '削除'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">お問い合わせ管理</h1>
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <div className="flex gap-2 items-center">
            <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="フィルター" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="new">新規</SelectItem>
                <SelectItem value="in_progress">対応中</SelectItem>
                <SelectItem value="resolved">解決済み</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="期間" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての期間</SelectItem>
                <SelectItem value="today">今日</SelectItem>
                <SelectItem value="last7">直近7日</SelectItem>
                <SelectItem value="last30">直近30日</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <Input
              placeholder="検索: 名前・メール・本文"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="md:w-72"
            />
            <div className="flex items-center gap-2">
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              <span className="text-sm text-zinc-500">〜</span>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <Button variant="ghost" onClick={() => { setQ(''); setPeriod('all'); setDateFrom(''); setDateTo(''); }}>クリア</Button>
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

      <Card>
        <CardHeader>
          <CardTitle>一覧 ({filtered.length}件)</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}