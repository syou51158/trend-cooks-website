import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { useAuth } from '../AdminLayout'
import { toast } from 'sonner'

export type EventItem = {
  id: string
  title: string
  description: string | null
  location: string | null
  starts_at: string
  ends_at: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export default function EventsList() {
  // const { session, isAdmin, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<EventItem[]>([])
  const [editing, setEditing] = useState<Record<string, Partial<EventItem> | undefined>>({})
  const [creating, setCreating] = useState<Partial<EventItem>>({ status: 'draft' as const })
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  // 追加: 検索・期間・任意日付
  const [q, setQ] = useState('')
  const [period, setPeriod] = useState<'all' | 'upcoming' | 'past'>('all')
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let out = items
    // ステータス
    if (filter !== 'all') out = out.filter((i) => i.status === filter)
    // キーワード（タイトル・説明・場所）
    if (q.trim()) {
      const s = q.trim().toLowerCase()
      out = out.filter((i) =>
        (i.title ?? '').toLowerCase().includes(s) ||
        (i.description ?? '').toLowerCase().includes(s) ||
        (i.location ?? '').toLowerCase().includes(s)
      )
    }
    // 期間（開始日時基準）
    if (period !== 'all') {
      const now = new Date()
      out = out.filter((i) => {
        const start = new Date(i.starts_at)
        return period === 'upcoming' ? start >= now : start < now
      })
    }
    // 任意の日付範囲（開始日時基準）
    if (dateFrom) {
      const df = new Date(dateFrom)
      out = out.filter((i) => new Date(i.starts_at) >= df)
    }
    if (dateTo) {
      const dtEnd = new Date(dateTo)
      dtEnd.setHours(23, 59, 59, 999)
      out = out.filter((i) => new Date(i.starts_at) <= dtEnd)
    }
    return out
  }, [items, filter, q, period, dateFrom, dateTo])

  const load = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('starts_at', { ascending: false })
      .order('updated_at', { ascending: false })
    if (error) {
      setError(error.message)
      toast.error('読み込みに失敗しました', { description: error.message })
    } else {
      setItems((data ?? []) as EventItem[])
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

  const handleCreate = async () => {
    if (!isAdmin) {
      setError('権限がありません（管理者のみ作成できます）')
      toast.error('権限がありません', { description: '管理者のみ作成できます' })
      return
    }
    if (!creating.title || !creating.starts_at) {
      toast.error('タイトルと開始日時は必須です')
      return
    }
    const payload = {
      title: creating.title,
      description: creating.description ?? null,
      location: creating.location ?? null,
      starts_at: creating.starts_at,
      ends_at: creating.ends_at ?? null,
      status: (creating.status as 'draft' | 'published') ?? 'draft',
    }
    const { data, error } = await supabase.from('events').insert(payload).select('*').single()
    if (error) {
      toast.error(`作成に失敗しました: ${error.message}`)
      return
    }
    toast.success('イベントを作成しました')
    setItems((prev) => [data as EventItem, ...prev])
    setCreating({ status: 'draft' })
  }

  const handleSave = async (id: string) => {
    if (!isAdmin) {
      setError('権限がありません（管理者のみ更新できます）')
      toast.error('権限がありません', { description: '管理者のみ更新できます' })
      return
    }
    const draft = editing[id]
    if (!draft) return
    const payload: Partial<EventItem> = {
      title: draft.title,
      description: draft.description ?? null,
      location: draft.location ?? null,
      starts_at: draft.starts_at,
      ends_at: draft.ends_at ?? null,
      status: draft.status as 'draft' | 'published' | undefined,
    }
    const { data, error } = await supabase.from('events').update(payload).eq('id', id).select('*').single()
    if (error) {
      toast.error(`更新に失敗しました: ${error.message}`)
      return
    }
    toast.success('保存しました')
    setItems((prev) => prev.map((it) => (it.id === id ? (data as EventItem) : it)))
    setEditing((prev) => ({ ...prev, [id]: undefined }))
  }

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      setError('権限がありません（管理者のみ削除できます）')
      toast.error('権限がありません', { description: '管理者のみ削除できます' })
      return
    }
    if (!confirm('このイベントを削除しますか？')) return
    setDeletingId(id)
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      toast.error(`削除に失敗しました: ${error.message}`)
      setDeletingId(null)
      return
    }
    toast.success('削除しました')
    setItems((prev) => prev.filter((it) => it.id !== id))
    setDeletingId(null)
  }

  const Row = ({ item }: { item: EventItem }) => {
    const d = editing[item.id] ?? item
    const update = (patch: Partial<EventItem>) => setEditing((prev) => ({ ...prev, [item.id]: { ...(prev[item.id] ?? {}), ...patch } }))
    return (
      <div className="border rounded p-3 space-y-2">
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">タイトル</label>
            <Input value={d.title ?? ''} onChange={(e) => update({ title: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">ステータス</label>
            <Select value={(d.status as any) ?? 'draft'} onValueChange={(v) => update({ status: v as any })}>
              <SelectTrigger><SelectValue placeholder="選択" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">下書き</SelectItem>
                <SelectItem value="published">公開</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">開始日時</label>
            <Input type="datetime-local" value={toLocalInputValue(d.starts_at)} onChange={(e) => update({ starts_at: fromLocalInputValue(e.target.value) })} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">終了日時</label>
            <Input type="datetime-local" value={toLocalInputValue(d.ends_at)} onChange={(e) => update({ ends_at: fromLocalInputValue(e.target.value) })} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">場所</label>
            <Input value={d.location ?? ''} onChange={(e) => update({ location: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">説明</label>
            <Textarea value={d.description ?? ''} onChange={(e) => update({ description: e.target.value })} />
          </div>
        </div>
        <div className="text-xs text-zinc-500">更新: {new Date(item.updated_at).toLocaleString()}</div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleSave(item.id)} disabled={!isAdmin}>保存</Button>
          <Button size="sm" variant="outline" onClick={() => setEditing((p) => ({ ...p, [item.id]: undefined }))}>取消</Button>
          <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} disabled={!isAdmin || deletingId === item.id}>{deletingId === item.id ? '削除中...' : '削除'}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-col md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">イベント管理</h1>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex gap-2 items-center">
            <Select value={filter} onValueChange={(v: 'all'|'published'|'draft') => setFilter(v)}>
              <SelectTrigger className="w-40"><SelectValue placeholder="フィルター" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="published">公開</SelectItem>
                <SelectItem value="draft">下書き</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={(v: 'all'|'upcoming'|'past') => setPeriod(v)}>
              <SelectTrigger className="w-44"><SelectValue placeholder="期間" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての期間</SelectItem>
                <SelectItem value="upcoming">今後のイベント</SelectItem>
                <SelectItem value="past">過去のイベント</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <Input
              placeholder="検索: タイトル・説明・場所"
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
          現在このアカウントには管理者権限がありません。作成・編集・削除は行えません。
          {adminError && <span className="ml-2 text-red-600">({adminError})</span>}
        </div>
      )}

      {loading ? (
        <div className="text-sm text-zinc-500">読み込み中...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle>新規作成</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">タイトル</label>
                <Input value={creating.title ?? ''} onChange={(e) => setCreating((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">開始日時</label>
                  <Input type="datetime-local" value={toLocalInputValue(creating.starts_at)} onChange={(e) => setCreating((p) => ({ ...p, starts_at: fromLocalInputValue(e.target.value) }))} />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">終了日時</label>
                  <Input type="datetime-local" value={toLocalInputValue(creating.ends_at)} onChange={(e) => setCreating((p) => ({ ...p, ends_at: fromLocalInputValue(e.target.value) }))} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">場所</label>
                  <Input value={creating.location ?? ''} onChange={(e) => setCreating((p) => ({ ...p, location: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">説明</label>
                  <Textarea value={creating.description ?? ''} onChange={(e) => setCreating((p) => ({ ...p, description: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">ステータス</label>
                <Select value={(creating.status as any) ?? 'draft'} onValueChange={(v) => setCreating((p) => ({ ...p, status: v as any }))}>
                  <SelectTrigger><SelectValue placeholder="選択" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">下書き</SelectItem>
                    <SelectItem value="published">公開</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreate} disabled={!isAdmin}>作成</Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {filtered.map((item) => (
              <Row key={item.id} item={item} />
            ))}
            {filtered.length === 0 && (
              <div className="text-sm text-zinc-500">データがありません</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function toLocalInputValue(value?: string | null) {
  if (!value) return ''
  const d = new Date(value)
  const pad = (n: number) => n.toString().padStart(2, '0')
  const yyyy = d.getFullYear()
  const mm = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mi = pad(d.getMinutes())
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`
}

function fromLocalInputValue(v: string) {
  if (!v) return '' as any
  // そのままローカルの日時文字列をISOに変換
  const d = new Date(v)
  return d.toISOString()
}