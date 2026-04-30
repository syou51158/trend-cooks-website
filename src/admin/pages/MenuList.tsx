import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export type MenuSection = {
  id: string
  name_ja: string
  name_en: string | null
  description: string | null
  sort_order: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export type MenuItem = {
  id: string
  section_id: string
  name_ja: string
  name_en: string | null
  description: string | null
  price: number
  currency: string
  badges: string[] | null
  sort_order: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export default function MenuList() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)

  const [sections, setSections] = useState<MenuSection[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)

  const [sectionDialogOpen, setSectionDialogOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<MenuSection | null>(null)
  const [sectionNameJa, setSectionNameJa] = useState('')
  const [sectionNameEn, setSectionNameEn] = useState('')
  const [sectionDesc, setSectionDesc] = useState('')
  const [sectionPublic, setSectionPublic] = useState<'true' | 'false'>('true')

  const [itemDialogOpen, setItemDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [itemNameJa, setItemNameJa] = useState('')
  const [itemNameEn, setItemNameEn] = useState('')
  const [itemDesc, setItemDesc] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemCurrency, setItemCurrency] = useState('JPY')
  const [itemBadges, setItemBadges] = useState('')
  const [itemPublic, setItemPublic] = useState<'true' | 'false'>('true')

  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [reloadingItems, setReloadingItems] = useState(false)

  const selectedSection = useMemo(() => sections.find((s) => s.id === selectedSectionId) || null, [sections, selectedSectionId])

  const loadSections = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('menu_sections')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    if (error) {
      setError(error.message)
      toast.error('セクションの読み込みに失敗しました', { description: error.message })
    } else {
      setSections((data ?? []) as MenuSection[])
    }
    setLoading(false)
  }

  const loadItems = async (sectionId: string) => {
    setReloadingItems(true)
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('section_id', sectionId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })
    setReloadingItems(false)
    if (error) {
      toast.error('アイテムの読み込みに失敗しました', { description: error.message })
    } else {
      setItems((data ?? []) as MenuItem[])
    }
  }

  useEffect(() => {
    void loadSections()
  }, [])

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

  useEffect(() => {
    if (selectedSectionId) {
      void loadItems(selectedSectionId)
    } else {
      setItems([])
    }
  }, [selectedSectionId])

  const openCreateSection = () => {
    setEditingSection(null)
    setSectionNameJa('')
    setSectionNameEn('')
    setSectionDesc('')
    setSectionPublic('true')
    setSectionDialogOpen(true)
  }
  const openEditSection = (s: MenuSection) => {
    setEditingSection(s)
    setSectionNameJa(s.name_ja)
    setSectionNameEn(s.name_en ?? '')
    setSectionDesc(s.description ?? '')
    setSectionPublic(s.is_public ? 'true' : 'false')
    setSectionDialogOpen(true)
  }

  const saveSection = async () => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ作成・編集できます' })
      return
    }
    if (!sectionNameJa.trim()) {
      toast.error('保存できません', { description: 'セクション名（日本語）は必須です' })
      return
    }
    setSaving(true)
    const payload: Partial<MenuSection> & { name_ja: string } = {
      name_ja: sectionNameJa.trim(),
      name_en: sectionNameEn.trim() || null,
      description: sectionDesc.trim() || null,
      is_public: sectionPublic === 'true',
    }
    if (editingSection) {
      const { error } = await supabase.from('menu_sections').update(payload).eq('id', editingSection.id)
      setSaving(false)
      if (error) return toast.error('更新に失敗しました', { description: error.message })
      toast.success('セクションを更新しました')
    } else {
      // 新規は末尾に
      const maxOrder = sections.reduce((m, s) => Math.max(m, s.sort_order), 0)
      const { error } = await supabase.from('menu_sections').insert({ ...payload, sort_order: maxOrder + 10 })
      setSaving(false)
      if (error) return toast.error('作成に失敗しました', { description: error.message })
      toast.success('セクションを作成しました')
    }
    setSectionDialogOpen(false)
    await loadSections()
  }

  const removeSection = async (s: MenuSection) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ削除できます' })
      return
    }
    // 子アイテムがある場合は削除不可
    const { count } = await supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('section_id', s.id)
    if ((count ?? 0) > 0) {
      toast.error('削除できません', { description: 'このセクションにはアイテムが存在します。先にアイテムを削除してください。' })
      return
    }
    if (!confirm('このセクションを削除しますか？')) return
    setDeletingId(s.id)
    const { error } = await supabase.from('menu_sections').delete().eq('id', s.id)
    setDeletingId(null)
    if (error) return toast.error('削除に失敗しました', { description: error.message })
    if (selectedSectionId === s.id) setSelectedSectionId(null)
    toast.success('セクションを削除しました')
    await loadSections()
  }

  const moveSection = async (s: MenuSection, dir: 'up' | 'down') => {
    if (!isAdmin) return
    const delta = dir === 'up' ? -15 : 15
    const { error } = await supabase.from('menu_sections').update({ sort_order: s.sort_order + delta }).eq('id', s.id)
    if (error) return toast.error('並び替えに失敗しました', { description: error.message })
    await loadSections()
  }

  const openCreateItem = () => {
    if (!selectedSectionId) {
      toast.error('先にセクションを選択してください')
      return
    }
    setEditingItem(null)
    setItemNameJa('')
    setItemNameEn('')
    setItemDesc('')
    setItemPrice('')
    setItemCurrency('JPY')
    setItemBadges('')
    setItemPublic('true')
    setItemDialogOpen(true)
  }
  const openEditItem = (it: MenuItem) => {
    setEditingItem(it)
    setItemNameJa(it.name_ja)
    setItemNameEn(it.name_en ?? '')
    setItemDesc(it.description ?? '')
    setItemPrice(String(it.price))
    setItemCurrency(it.currency ?? 'JPY')
    setItemBadges((it.badges ?? []).join(','))
    setItemPublic(it.is_public ? 'true' : 'false')
    setItemDialogOpen(true)
  }

  const saveItem = async () => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ作成・編集できます' })
      return
    }
    if (!selectedSectionId) return
    if (!itemNameJa.trim()) {
      toast.error('保存できません', { description: 'アイテム名（日本語）は必須です' })
      return
    }
    const price = parseFloat(itemPrice)
    if (isNaN(price) || price < 0) {
      toast.error('保存できません', { description: '価格は0以上の数値で入力してください' })
      return
    }
    const payload: Partial<MenuItem> & { name_ja: string } = {
      section_id: selectedSectionId,
      name_ja: itemNameJa.trim(),
      name_en: itemNameEn.trim() || null,
      description: itemDesc.trim() || null,
      price,
      currency: itemCurrency || 'JPY',
      badges: itemBadges.split(',').map((b) => b.trim()).filter(Boolean),
      is_public: itemPublic === 'true',
    }
    setSaving(true)
    if (editingItem) {
      const { error } = await supabase.from('menu_items').update(payload).eq('id', editingItem.id)
      setSaving(false)
      if (error) return toast.error('更新に失敗しました', { description: error.message })
      toast.success('アイテムを更新しました')
    } else {
      const maxOrder = items.reduce((m, it) => Math.max(m, it.sort_order), 0)
      const { error } = await supabase.from('menu_items').insert({ ...payload, sort_order: maxOrder + 10 })
      setSaving(false)
      if (error) return toast.error('作成に失敗しました', { description: error.message })
      toast.success('アイテムを作成しました')
    }
    setItemDialogOpen(false)
    await loadItems(selectedSectionId)
  }

  const removeItem = async (it: MenuItem) => {
    if (!isAdmin) {
      toast.error('権限がありません', { description: '管理者のみ削除できます' })
      return
    }
    if (!confirm('このアイテムを削除しますか？')) return
    setDeletingId(it.id)
    const { error } = await supabase.from('menu_items').delete().eq('id', it.id)
    setDeletingId(null)
    if (error) return toast.error('削除に失敗しました', { description: error.message })
    toast.success('アイテムを削除しました')
    if (selectedSectionId) await loadItems(selectedSectionId)
  }

  const moveItem = async (it: MenuItem, dir: 'up' | 'down') => {
    if (!isAdmin) return
    const delta = dir === 'up' ? -15 : 15
    const { error } = await supabase.from('menu_items').update({ sort_order: it.sort_order + delta }).eq('id', it.id)
    if (error) return toast.error('並び替えに失敗しました', { description: error.message })
    if (selectedSectionId) await loadItems(selectedSectionId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">メニュー管理</h1>
        <div className="flex gap-2">
          <Button onClick={openCreateSection} disabled={!isAdmin}>セクション追加</Button>
          <Button variant="outline" onClick={loadSections} disabled={loading}>再読込</Button>
        </div>
      </div>

      {isAdmin === false && (
        <div className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded p-3">
          現在このアカウントには管理者権限がありません。作成・編集・削除は行えません。
          {adminError && <span className="ml-2 text-red-600">({adminError})</span>}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>セクション</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-sm text-zinc-500">読み込み中...</div>
            ) : error ? (
              <div className="text-sm text-red-600">{error}</div>
            ) : sections.length === 0 ? (
              <div className="text-sm text-zinc-500">セクションがありません</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名称</TableHead>
                      <TableHead>公開</TableHead>
                      <TableHead>並び</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sections.map((s) => (
                      <TableRow key={s.id} className={selectedSectionId === s.id ? 'bg-zinc-50' : ''}>
                        <TableCell className="font-medium">
                          <button className="underline" onClick={() => setSelectedSectionId(s.id)}>{s.name_ja}</button>
                          {s.name_en && <div className="text-xs text-zinc-500">{s.name_en}</div>}
                          {s.description && <div className="text-xs text-zinc-500">{s.description}</div>}
                        </TableCell>
                        <TableCell>
                          {s.is_public ? <Badge className="bg-emerald-600">公開</Badge> : <Badge variant="secondary">非公開</Badge>}
                        </TableCell>
                        <TableCell>{s.sort_order}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={() => moveSection(s, 'up')} disabled={!isAdmin}>↑</Button>
                          <Button size="sm" variant="outline" onClick={() => moveSection(s, 'down')} disabled={!isAdmin}>↓</Button>
                          <Button size="sm" variant="outline" onClick={() => openEditSection(s)} disabled={!isAdmin || deletingId === s.id}>編集</Button>
                          <Button size="sm" variant="destructive" onClick={() => void removeSection(s)} disabled={!isAdmin || deletingId === s.id}>{deletingId === s.id ? '削除中...' : '削除'}</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>アイテム {selectedSection ? `（${selectedSection.name_ja}）` : ''}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-zinc-600">{selectedSection ? 'このセクションのメニューアイテムを管理します' : '左のセクションを選択してください'}</div>
              <div className="space-x-2">
                <Button onClick={openCreateItem} disabled={!isAdmin || !selectedSectionId}>アイテム追加</Button>
                <Button variant="outline" onClick={() => selectedSectionId && loadItems(selectedSectionId)} disabled={reloadingItems || !selectedSectionId}>再読込</Button>
              </div>
            </div>
            {!selectedSectionId ? (
              <div className="text-sm text-zinc-500">セクション未選択</div>
            ) : reloadingItems ? (
              <div className="text-sm text-zinc-500">読み込み中...</div>
            ) : items.length === 0 ? (
              <div className="text-sm text-zinc-500">アイテムがありません</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>名称</TableHead>
                      <TableHead>価格</TableHead>
                      <TableHead>公開</TableHead>
                      <TableHead>並び</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((it) => (
                      <TableRow key={it.id}>
                        <TableCell className="font-medium">
                          {it.name_ja}
                          {it.name_en && <div className="text-xs text-zinc-500">{it.name_en}</div>}
                          {it.description && <div className="text-xs text-zinc-500">{it.description}</div>}
                          {(it.badges ?? []).length > 0 && (
                            <div className="space-x-1 mt-1">
                              {(it.badges ?? []).map((b, i) => (
                                <Badge key={i} variant="secondary">{b}</Badge>
                              ))}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{new Intl.NumberFormat('ja-JP', { style: 'currency', currency: it.currency || 'JPY' }).format(it.price)}</TableCell>
                        <TableCell>{it.is_public ? <Badge className="bg-emerald-600">公開</Badge> : <Badge variant="secondary">非公開</Badge>}</TableCell>
                        <TableCell>{it.sort_order}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={() => moveItem(it, 'up')} disabled={!isAdmin}>↑</Button>
                          <Button size="sm" variant="outline" onClick={() => moveItem(it, 'down')} disabled={!isAdmin}>↓</Button>
                          <Button size="sm" variant="outline" onClick={() => openEditItem(it)} disabled={!isAdmin || deletingId === it.id}>編集</Button>
                          <Button size="sm" variant="destructive" onClick={() => void removeItem(it)} disabled={!isAdmin || deletingId === it.id}>{deletingId === it.id ? '削除中...' : '削除'}</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* セクション編集モーダル */}
      <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editingSection ? 'セクションを編集' : 'セクションを追加'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">名称（日本語）</label>
              <Input value={sectionNameJa} onChange={(e) => setSectionNameJa(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">名称（英語・任意）</label>
              <Input value={sectionNameEn} onChange={(e) => setSectionNameEn(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">説明（任意）</label>
              <Textarea value={sectionDesc} onChange={(e) => setSectionDesc(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">公開設定</label>
              <Select value={sectionPublic} onValueChange={(v: any) => setSectionPublic(v)}>
                <SelectTrigger className="w-40"><SelectValue placeholder="選択" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">公開</SelectItem>
                  <SelectItem value="false">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <Button onClick={saveSection} disabled={!isAdmin || saving}>{saving ? '保存中...' : '保存'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* アイテム編集モーダル */}
      <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editingItem ? 'アイテムを編集' : 'アイテムを追加'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">名称（日本語）</label>
              <Input value={itemNameJa} onChange={(e) => setItemNameJa(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">名称（英語・任意）</label>
              <Input value={itemNameEn} onChange={(e) => setItemNameEn(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">説明（任意）</label>
              <Textarea value={itemDesc} onChange={(e) => setItemDesc(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">価格</label>
                <Input inputMode="decimal" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">通貨</label>
                <Input value={itemCurrency} onChange={(e) => setItemCurrency(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">バッジ（カンマ区切り・任意）</label>
              <Input placeholder="例: 人気, 新作, 辛口" value={itemBadges} onChange={(e) => setItemBadges(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">公開設定</label>
              <Select value={itemPublic} onValueChange={(v: any) => setItemPublic(v)}>
                <SelectTrigger className="w-40"><SelectValue placeholder="選択" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">公開</SelectItem>
                  <SelectItem value="false">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <Button onClick={saveItem} disabled={!isAdmin || saving || !selectedSectionId}>{saving ? '保存中...' : '保存'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}