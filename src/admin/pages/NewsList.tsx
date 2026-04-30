import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
// import { useToast } from '@/hooks/use-toast'
import { toast } from 'sonner'

// DB型が未導入のため簡易的な型を定義
export type NewsStatus = 'draft' | 'published'
export type NewsRow = {
  id: string
  title: string
  body: string | null
  status: NewsStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

function toLocalDatetimeInputValue(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  const year = d.getFullYear()
  const month = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hours = pad(d.getHours())
  const minutes = pad(d.getMinutes())
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export default function NewsList() {
  const [rows, setRows] = useState<NewsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // 管理者判定
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)
  // const { toast } = useToast()

  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<NewsRow | null>(null)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<NewsStatus>('draft')
  const [publishedAt, setPublishedAt] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // const hasPublished = useMemo(() => status === 'published', [status])

  const load = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
      toast.error('読み込みに失敗しました', { description: error.message })
    } else {
      setRows((data ?? []) as NewsRow[])
    }
    setLoading(false)
  }

  useEffect(() => {
    void load()
  }, [])

  // 認証済みユーザーの管理者判定
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

  // ステータス切替時の公開日時の自動補完/クリア
  useEffect(() => {
    if (status === 'published' && !publishedAt) {
      setPublishedAt(toLocalDatetimeInputValue(new Date()))
    }
    if (status === 'draft') {
      setPublishedAt('')
    }
  }, [status, publishedAt])

  const openCreate = () => {
    setEditing(null)
    setTitle('')
    setContent('')
    setStatus('draft')
    setPublishedAt('')
    setEditorOpen(true)
  }

  const openEdit = (row: NewsRow) => {
    setEditing(row)
    setTitle(row.title)
    setContent(row.body ?? '')
    setStatus(row.status)
    setPublishedAt(row.published_at ? row.published_at.slice(0, 16) : '')
    setEditorOpen(true)
  }

  const save = async () => {
    if (!isAdmin) {
      setError('権限がありません（管理者のみ更新できます）')
      toast.error('権限がありません', { description: '管理者のみ作成・編集できます' })
      return
    }

    if (!title.trim()) {
      setError('タイトルは必須です')
      toast.error('保存できません', { description: 'タイトルは必須です' })
      return
    }

    setSaving(true)
    const publishedAtIso = status === 'published'
      ? (publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString())
      : null

    const payload: Partial<NewsRow> & { title: string; body: string | null } = {
      title,
      body: content,
      status,
      published_at: publishedAtIso,
    }
    if (editing) {
      const { error } = await supabase.from('news').update(payload).eq('id', editing.id)
      if (error) {
        setError(error.message)
        toast.error('更新に失敗しました', { description: error.message })
        setSaving(false)
        return
      }
      toast.success('保存しました', { description: 'ニュースを更新しました' })
    } else {
      const { error } = await supabase.from('news').insert(payload)
      if (error) {
        setError(error.message)
        toast.error('作成に失敗しました', { description: error.message })
        setSaving(false)
        return
      }
      toast.success('保存しました', { description: 'ニュースを作成しました' })
    }
    setEditorOpen(false)
    await load()
    setSaving(false)
  }

  const remove = async (row: NewsRow) => {
    if (!isAdmin) {
      setError('権限がありません（管理者のみ削除できます）')
      toast.error('権限がありません', { description: '管理者のみ削除できます' })
      return
    }
    if (!confirm('このニュースを削除しますか？')) return
    setDeletingId(row.id)
    const { error } = await supabase.from('news').delete().eq('id', row.id)
    if (error) {
      setError(error.message)
      toast.error('削除に失敗しました', { description: error.message })
      setDeletingId(null)
      return
    }
    toast.success('削除しました', { description: 'ニュースを削除しました' })
    await load()
    setDeletingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ニュース管理</h1>
        <div className="flex gap-2">
          <Button onClick={openCreate} disabled={!isAdmin}>新規作成</Button>
          <Button variant="outline" onClick={load} disabled={loading}>再読込</Button>
        </div>
      </div>

      {isAdmin === false && (
        <div className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded p-3">
          現在このアカウントには管理者権限がありません。作成・編集・削除は行えません。
          {adminError && <span className="ml-2 text-red-600">({adminError})</span>}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-zinc-500">読み込み中...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : rows.length === 0 ? (
            <div className="text-sm text-zinc-500">データがありません</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タイトル</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>公開日時</TableHead>
                    <TableHead>更新</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.title}</TableCell>
                      <TableCell>
                        {r.status === 'published' ? (
                          <Badge className="bg-emerald-600">公開</Badge>
                        ) : (
                          <Badge variant="secondary">下書き</Badge>
                        )}
                      </TableCell>
                      <TableCell>{r.published_at ? new Date(r.published_at).toLocaleString() : '-'}</TableCell>
                      <TableCell>{new Date(r.updated_at).toLocaleString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => openEdit(r)} disabled={!isAdmin || deletingId === r.id}>編集</Button>
                        <Button size="sm" variant="destructive" onClick={() => void remove(r)} disabled={!isAdmin || deletingId === r.id}>{deletingId === r.id ? '削除中...' : '削除'}</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editing ? '編集' : '新規作成'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">タイトル</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">本文</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">ステータス</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as NewsStatus)}
                  className="w-full border rounded px-2 py-2 bg-transparent"
                >
                  <option value="draft">下書き</option>
                  <option value="published">公開</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">公開日時</label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full border rounded px-2 py-2 bg-transparent"
                  disabled={status !== 'published'}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditorOpen(false)} disabled={saving}>キャンセル</Button>
              <Button onClick={() => void save()} disabled={saving}>{saving ? '保存中...' : '保存'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}