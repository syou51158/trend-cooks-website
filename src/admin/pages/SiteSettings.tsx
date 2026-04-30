import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export type SiteSettingsRow = {
  id: number
  site_name: string | null
  contact_email: string | null
  hero_title: string | null
  hero_subtitle: string | null
  created_at: string
  updated_at: string
  address_zip?: string | null
  address_line1?: string | null
  address_line2?: string | null
  address_access_note?: string | null
  address_parking_note?: string | null
  phone?: string | null
  owner?: string | null
  hours_day?: string | null
  hours_night?: string | null
  shuttle_text?: string | null
  shuttle_note?: string | null
  map_embed_url?: string | null
}

export default function SiteSettings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [adminError, setAdminError] = useState<string | null>(null)

  const [exists, setExists] = useState(false)
  const [siteName, setSiteName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [heroTitle, setHeroTitle] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')

  const [addressZip, setAddressZip] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [addressAccessNote, setAddressAccessNote] = useState('')
  const [addressParkingNote, setAddressParkingNote] = useState('')
  const [phone, setPhone] = useState('')
  const [owner, setOwner] = useState('')
  const [hoursDay, setHoursDay] = useState('')
  const [hoursNight, setHoursNight] = useState('')
  const [shuttleText, setShuttleText] = useState('')
  const [shuttleNote, setShuttleNote] = useState('')
  const [mapEmbedUrl, setMapEmbedUrl] = useState('')

  const loadSettings = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()
    if (error && error.code !== 'PGRST116') { // PGRST116: Results contain 0 rows
      setError(error.message)
      toast.error('サイト設定の読み込みに失敗しました', { description: error.message })
      setLoading(false)
      return
    }
    if (!data) {
      setExists(false)
      setSiteName('')
      setContactEmail('')
      setHeroTitle('')
      setHeroSubtitle('')
    } else {
      setExists(true)
      setSiteName(data.site_name ?? '')
      setContactEmail(data.contact_email ?? '')
      setHeroTitle(data.hero_title ?? '')
      setHeroSubtitle(data.hero_subtitle ?? '')
      setAddressZip((data as SiteSettingsRow).address_zip ?? '')
      setAddressLine1((data as SiteSettingsRow).address_line1 ?? '')
      setAddressLine2((data as SiteSettingsRow).address_line2 ?? '')
      setAddressAccessNote((data as SiteSettingsRow).address_access_note ?? '')
      setAddressParkingNote((data as SiteSettingsRow).address_parking_note ?? '')
      setPhone((data as SiteSettingsRow).phone ?? '')
      setOwner((data as SiteSettingsRow).owner ?? '')
      setHoursDay((data as SiteSettingsRow).hours_day ?? '')
      setHoursNight((data as SiteSettingsRow).hours_night ?? '')
      setShuttleText((data as SiteSettingsRow).shuttle_text ?? '')
      setShuttleNote((data as SiteSettingsRow).shuttle_note ?? '')
      setMapEmbedUrl((data as SiteSettingsRow).map_embed_url ?? '')
    }
    setLoading(false)
  }

  useEffect(() => { void loadSettings() }, [])

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

  const save = async () => {
    if (!isAdmin) return
    setSaving(true)
    const payload = {
      site_name: siteName.trim() || null,
      contact_email: contactEmail.trim() || null,
      hero_title: heroTitle.trim() || null,
      hero_subtitle: heroSubtitle.trim() || null,
      updated_at: new Date().toISOString(),
    }
    if (exists) {
      const { error } = await supabase.from('site_settings').update(payload).eq('id', 1)
      setSaving(false)
      if (error) {
        toast.error('更新に失敗しました', { description: error.message })
      } else {
        toast.success('設定を保存しました')
        void loadSettings()
      }
    } else {
      const { error } = await supabase.from('site_settings').insert({ id: 1, ...payload } as any)
      setSaving(false)
      if (error) {
        toast.error('作成に失敗しました', { description: error.message })
      } else {
        toast.success('設定を作成しました')
        setExists(true)
        void loadSettings()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">サイト設定</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSettings} disabled={loading}>再読込</Button>
          <Button onClick={save} disabled={saving || !isAdmin}>保存</Button>
        </div>
      </div>

      {isAdmin === false && (
        <div className="text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded p-3">
          現在このアカウントには管理者権限がありません。編集は行えません。
          {adminError && <span className="ml-2 text-red-600">({adminError})</span>}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>基本情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-zinc-500">読み込み中...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <>
              <div>
                <label className="block text-sm mb-1">サイト名</label>
                <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="Trend Cooks" disabled={!isAdmin} />
              </div>
              <div>
                <label className="block text-sm mb-1">お問い合わせメール</label>
                <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="hello@example.com" disabled={!isAdmin} />
              </div>
              <div>
                <label className="block text-sm mb-1">ヒーロータイトル</label>
                <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="ようこそ" disabled={!isAdmin} />
              </div>
              <div>
                <label className="block text-sm mb-1">ヒーローサブタイトル</label>
                <Textarea value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={3} placeholder="サブコピー" disabled={!isAdmin} />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>店舗情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="text-sm text-zinc-500">読み込み中...</div>
          ) : error ? (
            <div className="text-sm text-red-600">{error}</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">郵便番号・ビル名等</label>
                  <Input value={addressZip} onChange={(e) => setAddressZip(e.target.value)} placeholder="〒520-0025" disabled={!isAdmin} />
                </div>
                <div>
                  <label className="block text-sm mb-1">電話番号</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="077-xxx-xxxx" disabled={!isAdmin} />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">住所1</label>
                <Input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="滋賀県大津市〇〇〇" disabled={!isAdmin} />
              </div>
              <div>
                <label className="block text-sm mb-1">住所2（任意）</label>
                <Input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="建物名・階数など" disabled={!isAdmin} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">アクセス補足（任意）</label>
                  <Textarea value={addressAccessNote} onChange={(e) => setAddressAccessNote(e.target.value)} rows={2} placeholder="最寄駅から徒歩x分 など" disabled={!isAdmin} />
                </div>
                <div>
                  <label className="block text-sm mb-1">駐車場（任意）</label>
                  <Textarea value={addressParkingNote} onChange={(e) => setAddressParkingNote(e.target.value)} rows={2} placeholder="台数・場所など" disabled={!isAdmin} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">担当者・店主名（任意）</label>
                  <Input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="店主 山田" disabled={!isAdmin} />
                </div>
                <div>
                  <label className="block text-sm mb-1">地図埋め込みURL（任意）</label>
                  <Input value={mapEmbedUrl} onChange={(e) => setMapEmbedUrl(e.target.value)} placeholder="https://www.google.com/maps/embed?..." disabled={!isAdmin} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">営業時間（昼）</label>
                  <Input value={hoursDay} onChange={(e) => setHoursDay(e.target.value)} placeholder="11:30 - 14:30 (L.O 14:00)" disabled={!isAdmin} />
                </div>
                <div>
                  <label className="block text-sm mb-1">営業時間（夜）</label>
                  <Input value={hoursNight} onChange={(e) => setHoursNight(e.target.value)} placeholder="17:30 - 22:00 (L.O 21:00)" disabled={!isAdmin} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">送迎案内</label>
                  <Input value={shuttleText} onChange={(e) => setShuttleText(e.target.value)} placeholder="大津京駅〜店舗間" disabled={!isAdmin} />
                </div>
                <div>
                  <label className="block text-sm mb-1">送迎注記（任意）</label>
                  <Input value={shuttleNote} onChange={(e) => setShuttleNote(e.target.value)} placeholder="事前予約が必要です など" disabled={!isAdmin} />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}