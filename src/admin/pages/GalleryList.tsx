import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { publicStorageUrl } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export type GalleryImage = {
  id: string
  title: string | null
  alt: string | null
  image_path: string
  is_public: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export default function GalleryList() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<GalleryImage[]>([])
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)

  const [openEdit, setOpenEdit] = useState(false)
  const [editing, setEditing] = useState<GalleryImage | null>(null)
  const [title, setTitle] = useState('')
  const [alt, setAlt] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [saving, setSaving] = useState(false)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [uploading, setUploading] = useState(false)

  const load = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
      toast.error('読み込みに失敗しました', { description: error.message })
    } else {
      setItems((data ?? []) as GalleryImage[])
    }
    setLoading(false)
  }

  useEffect(() => { void load() }, [])

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

  const beginCreate = () => {
    setEditing(null)
    setTitle('')
    setAlt('')
    setIsPublic(true)
    setOpenEdit(true)
  }

  const beginEdit = (it: GalleryImage) => {
    setEditing(it)
    setTitle(it.title ?? '')
    setAlt(it.alt ?? '')
    setIsPublic(!!it.is_public)
    setOpenEdit(true)
  }

  const handleSave = async () => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ更新できます' })
      return
    }
    setSaving(true)
    if (editing) {
      const { data, error } = await supabase
        .from('gallery_images')
        .update({ title, alt, is_public: isPublic })
        .eq('id', editing.id)
        .select('*')
        .single()
      setSaving(false)
      if (error) return toast.error('更新に失敗しました', { description: error.message })
      toast.success('更新しました')
      setItems(prev => prev.map(x => x.id === editing.id ? (data as GalleryImage) : x))
      setOpenEdit(false)
      return
    } else {
      // 新規作成時はファイル必須
      const file = fileRef.current?.files?.[0]
      if (!file) {
        setSaving(false)
        return toast.error('画像ファイルを選択してください')
      }
      try {
        setUploading(true)
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const path = `${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await supabase.storage.from('gallery').upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        })
        if (upErr) {
          setUploading(false)
          setSaving(false)
          return toast.error('アップロードに失敗しました', { description: upErr.message })
        }
        const { data, error } = await supabase
          .from('gallery_images')
          .insert({ title, alt, image_path: path, is_public: isPublic })
          .select('*')
          .single()
        setUploading(false)
        setSaving(false)
        if (error) return toast.error('保存に失敗しました', { description: error.message })
        toast.success('追加しました')
        setItems(prev => [data as GalleryImage, ...prev])
        setOpenEdit(false)
        if (fileRef.current) fileRef.current.value = ''
      } catch (e: any) {
        setUploading(false)
        setSaving(false)
        toast.error('エラーが発生しました', { description: e?.message ?? String(e) })
      }
    }
  }

  const handleDelete = async (it: GalleryImage) => {
    if (!isAdmin) return toast.error('権限がありません', { description: '管理者のみ削除できます' })
    if (!confirm('削除してよろしいですか？ この操作は取り消せません。')) return
    const { error } = await supabase.from('gallery_images').delete().eq('id', it.id)
    if (error) return toast.error('削除に失敗しました', { description: error.message })
    // 画像も削除（失敗しても続行）
    const p = it.image_path.startsWith('http') ? it.image_path.split('/').slice(-1)[0] : it.image_path
    await supabase.storage.from('gallery').remove([p])
    toast.success('削除しました')
    setItems(prev => prev.filter(x => x.id !== it.id))
  }

  const move = async (it: GalleryImage, dir: 'up' | 'down') => {
    if (!isAdmin) return
    const delta = dir === 'up' ? -15 : 15
    const { error } = await supabase.from('gallery_images').update({ sort_order: (it.sort_order ?? 100) + delta }).eq('id', it.id)
    if (error) return toast.error('並び替えに失敗しました', { description: error.message })
    await load()
  }

  const gridCols = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'

  return (
    <Card className="bg-trend-panel border-trend-accent/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">ギャラリー</CardTitle>
        <div className="flex items-center gap-2">
          {adminError && <span className="text-xs text-red-500">({adminError})</span>}
          <Button variant="secondary" onClick={() => load()} disabled={loading}>{loading ? '再読込中...' : '再読込'}</Button>
          <Button onClick={beginCreate} disabled={isAdmin === false}>追加</Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-3 text-sm text-red-500">{error}</div>}
        {items.length === 0 && !loading && (
          <div className="text-sm text-trend-muted">画像がまだありません。右上の「追加」からアップロードしてください。</div>
        )}
        <div className={gridCols}>
          {items.map(it => (
            <div key={it.id} className="relative bg-trend-bg/40 border border-trend-accent/20 rounded overflow-hidden">
              <img
                src={publicStorageUrl('gallery', it.image_path)}
                alt={it.alt ?? ''}
                className="w-full h-36 object-cover bg-black/10"
                loading="lazy"
              />
              <div className="p-2 text-xs space-y-1">
                <div className="font-medium line-clamp-1">{it.title ?? '(無題)'}</div>
                <div className="text-trend-muted line-clamp-2">{it.alt ?? ''}</div>
                <div className="flex items-center gap-2">
                  <Badge variant={it.is_public ? 'default' : 'secondary'}>{it.is_public ? '公開' : '非公開'}</Badge>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button size="sm" variant="outline" onClick={() => move(it, 'up')}>↑</Button>
                  <Button size="sm" variant="outline" onClick={() => move(it, 'down')}>↓</Button>
                  <Button size="sm" variant="secondary" onClick={() => beginEdit(it)}>編集</Button>
                  <Button size="sm" variant="destructive" onClick={() => void handleDelete(it)}>削除</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={openEdit} onOpenChange={setOpenEdit}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? '画像を編集' : '画像を追加'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {!editing && (
              <div>
                <label className="block text-sm mb-1">画像ファイル</label>
                <Input ref={fileRef} type="file" accept="image/*" />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1">タイトル</label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="例）外観" />
            </div>
            <div>
              <label className="block text-sm mb-1">代替テキスト（ALT）</label>
              <Textarea value={alt} onChange={e => setAlt(e.target.value)} placeholder="画像の説明" rows={3} />
            </div>
            <div className="flex items-center gap-2">
              <input id="is_public" type="checkbox" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
              <label htmlFor="is_public" className="text-sm">公開</label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpenEdit(false)} disabled={saving || uploading}>キャンセル</Button>
              <Button onClick={handleSave} disabled={saving || uploading}>{saving ? '保存中...' : uploading ? 'アップロード中...' : '保存'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}