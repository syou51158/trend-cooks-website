import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { publicStorageUrl } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export type StaffProfile = {
  id: string
  name: string
  role: string | null
  bio: string | null
  photo_path: string | null
  is_public: boolean
  created_at: string
  updated_at: string
}

export default function StaffList() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)

  const [profiles, setProfiles] = useState<StaffProfile[]>([])

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<StaffProfile | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [photoPath, setPhotoPath] = useState('')
  const [isPublic, setIsPublic] = useState<'true' | 'false'>('true')

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const loadProfiles = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('staff_profiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      setError(error.message)
      toast.error('スタッフの読み込みに失敗しました', { description: error.message })
    } else {
      setProfiles((data ?? []) as StaffProfile[])
    }
    setLoading(false)
  }

  useEffect(() => { void loadProfiles() }, [])

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

  const openCreate = () => {
    setEditing(null)
    setName('')
    setRole('')
    setBio('')
    setPhotoPath('')
    setIsPublic('true')
    setDialogOpen(true)
    if (fileRef.current) fileRef.current.value = ''
  }

  const openEdit = (p: StaffProfile) => {
    setEditing(p)
    setName(p.name)
    setRole(p.role ?? '')
    setBio(p.bio ?? '')
    setPhotoPath(p.photo_path ?? '')
    setIsPublic(p.is_public ? 'true' : 'false')
    setDialogOpen(true)
    if (fileRef.current) fileRef.current.value = ''
  }

  const saveProfile = async () => {
    if (!isAdmin) return
    if (!name.trim()) {
      toast.error('名前は必須です')
      return
    }
    setSaving(true)

    // 画像アップロード（ファイルが選択されている場合）
    let newPhotoPath: string | null = photoPath.trim() || null
    const file = fileRef.current?.files?.[0]
    try {
      if (file) {
        setUploading(true)
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
        const storagePath = `${crypto.randomUUID()}.${ext}`
        const { error: upErr } = await supabase.storage.from('staff').upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        })
        if (upErr) {
          setUploading(false)
          setSaving(false)
          return toast.error('画像のアップロードに失敗しました', { description: upErr.message })
        }
        newPhotoPath = storagePath
        setUploading(false)
      }
    } catch (e: any) {
      setUploading(false)
      setSaving(false)
      return toast.error('画像アップロード中にエラーが発生しました', { description: e?.message ?? String(e) })
    }

    const payload = {
      name: name.trim(),
      role: role.trim() || null,
      bio: bio.trim() || null,
      photo_path: newPhotoPath,
      is_public: isPublic === 'true',
      updated_at: new Date().toISOString(),
    }

    if (editing) {
      const prevPhoto = editing.photo_path
      const { error } = await supabase.from('staff_profiles').update(payload).eq('id', editing.id)
      setSaving(false)
      if (error) {
        toast.error('更新に失敗しました', { description: error.message })
      } else {
        // 古い画像のクリーンアップ（新規アップロードが行われ、かつ旧パスがStorageパスの場合のみ）
        if (file && prevPhoto && !/^https?:\/\//.test(prevPhoto)) {
          const p = prevPhoto.startsWith('http') ? prevPhoto.split('/').slice(-1)[0] : prevPhoto
          await supabase.storage.from('staff').remove([p]).catch(() => {})
        }
        toast.success('スタッフを更新しました')
        setDialogOpen(false)
        if (fileRef.current) fileRef.current.value = ''
        void loadProfiles()
      }
    } else {
      const { error } = await supabase.from('staff_profiles').insert(payload as any)
      setSaving(false)
      if (error) {
        toast.error('作成に失敗しました', { description: error.message })
      } else {
        toast.success('スタッフを追加しました')
        setDialogOpen(false)
        if (fileRef.current) fileRef.current.value = ''
        void loadProfiles()
      }
    }
  }

  const deleteProfile = async (p: StaffProfile) => {
    if (!isAdmin) return
    if (!confirm(`「${p.name}」を削除しますか？`)) return
    setDeletingId(p.id)
    const { error } = await supabase.from('staff_profiles').delete().eq('id', p.id)
    setDeletingId(null)
    if (error) {
      toast.error('削除に失敗しました', { description: error.message })
    } else {
      // ストレージの画像も削除（失敗しても続行）
      if (p.photo_path && !/^https?:\/\//.test(p.photo_path)) {
        const key = p.photo_path.startsWith('http') ? p.photo_path.split('/').slice(-1)[0] : p.photo_path
        await supabase.storage.from('staff').remove([key]).catch(() => {})
      }
      toast.success('削除しました')
      void loadProfiles()
    }
  }

  const togglePublish = async (p: StaffProfile) => {
    if (!isAdmin) return
    const { error } = await supabase.from('staff_profiles').update({ is_public: !p.is_public, updated_at: new Date().toISOString() }).eq('id', p.id)
    if (error) {
      toast.error('公開状態の更新に失敗しました', { description: error.message })
    } else {
      setProfiles(prev => prev.map(x => x.id === p.id ? { ...x, is_public: !p.is_public } : x))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">スタッフ管理</h1>
        <div className="flex gap-2">
          <Button onClick={openCreate} disabled={!isAdmin}>スタッフ追加</Button>
          <Button variant="outline" onClick={loadProfiles} disabled={loading}>再読込</Button>
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
          <CardTitle>スタッフ一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-sm text-zinc-500">読み込み中...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : profiles.length === 0 ? (
            <div className="text-sm text-zinc-500">スタッフが登録されていません</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>写真</TableHead>
                    <TableHead>名前 / 役割</TableHead>
                    <TableHead>公開</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        {p.photo_path ? (
                          <img src={publicStorageUrl('staff', p.photo_path)} alt={p.name} className="w-12 h-12 object-cover rounded-full border" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-zinc-100 border" />
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="font-medium">{p.name}</div>
                        {p.role && <div className="text-xs text-zinc-500">{p.role}</div>}
                        {p.bio && <div className="text-xs text-zinc-500 mt-1 line-clamp-2">{p.bio}</div>}
                      </TableCell>
                      <TableCell>
                        {p.is_public ? <Badge className="bg-emerald-600">公開</Badge> : <Badge variant="secondary">非公開</Badge>}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => togglePublish(p)} disabled={!isAdmin}>{p.is_public ? '非公開にする' : '公開にする'}</Button>
                        <Button size="sm" onClick={() => openEdit(p)} disabled={!isAdmin}>編集</Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteProfile(p)} disabled={!isAdmin || deletingId === p.id}>削除</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'スタッフ編集' : 'スタッフ追加'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">名前</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="氏名" />
            </div>
            <div>
              <label className="block text-sm mb-1">役割</label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="シェフ / バリスタ など" />
            </div>
            <div>
              <label className="block text-sm mb-1">自己紹介</label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} placeholder="経歴など" />
            </div>
            <div>
              <label className="block text-sm mb-1">写真ファイル（任意）</label>
              <Input ref={fileRef} type="file" accept="image/*" />
              <div className="text-xs text-zinc-500 mt-1">画像ファイルを選択すると、保存時に自動的にStorage（staffバケット）へアップロードされます。</div>
            </div>
            <div>
              <label className="block text-sm mb-1">写真URL（任意）</label>
              <Input value={photoPath} onChange={(e) => setPhotoPath(e.target.value)} placeholder="https:// または Storage の相対パス" />
              <div className="text-xs text-zinc-500 mt-1">URLを直接入力するか、上でファイルを選択してください。Storageパスの場合も公開URLに解決されます。</div>
            </div>
            <div>
              <label className="block text-sm mb-1">公開</label>
              <Select value={isPublic} onValueChange={(v) => setIsPublic(v as 'true' | 'false')}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">公開</SelectItem>
                  <SelectItem value="false">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving || uploading}>キャンセル</Button>
              <Button onClick={saveProfile} disabled={saving || uploading || !isAdmin}>{editing ? '更新' : '作成'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}