import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [kpi, setKpi] = useState({
    news: { total: 0, published: 0, draft: 0, latest: '-' },
    events: { total: 0, published: 0, draft: 0, latest: '-' },
    menu: { sections: 0, items: 0, latest: '-' },
    gallery: { images: 0, latest: '-' },
    staff: { profiles: 0, latest: '-' },
    reservations: { pending: 0, total: 0, latest: '-' },
    contacts: { total: 0, latest: '-' },
    settings: { exists: false, latest: '-' },
  })

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        // counts
        const newsTotal = await supabase.from('news').select('*', { count: 'exact', head: true })
        const newsPub = await supabase.from('news').select('*', { count: 'exact', head: true }).eq('status', 'published')
        const newsDraft = await supabase.from('news').select('*', { count: 'exact', head: true }).eq('status', 'draft')
        const newsLatest = await supabase.from('news').select('updated_at').order('updated_at', { ascending: false }).limit(1)

        const eventsTotal = await supabase.from('events').select('*', { count: 'exact', head: true })
        const eventsPub = await supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'published')
        const eventsDraft = await supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'draft')
        const eventsLatest = await supabase.from('events').select('updated_at').order('updated_at', { ascending: false }).limit(1)

        const menuSections = await supabase.from('menu_sections').select('*', { count: 'exact', head: true })
        const menuItems = await supabase.from('menu_items').select('*', { count: 'exact', head: true })
        const menuLatestA = await supabase.from('menu_sections').select('updated_at').order('updated_at', { ascending: false }).limit(1)
        const menuLatestB = await supabase.from('menu_items').select('updated_at').order('updated_at', { ascending: false }).limit(1)

        const galleryImages = await supabase.from('gallery_images').select('*', { count: 'exact', head: true })
        const galleryLatest = await supabase.from('gallery_images').select('updated_at').order('updated_at', { ascending: false }).limit(1)

        const staffProfiles = await supabase.from('staff_profiles').select('*', { count: 'exact', head: true })
        const staffLatest = await supabase.from('staff_profiles').select('updated_at').order('updated_at', { ascending: false }).limit(1)

        const reservationsTotal = await supabase.from('reservations').select('*', { count: 'exact', head: true })
        const reservationsPending = await supabase.from('reservations').select('*', { count: 'exact', head: true }).eq('status', 'pending')
        const reservationsLatest = await supabase.from('reservations').select('created_at').order('created_at', { ascending: false }).limit(1)

        const contactsTotal = await supabase.from('contact_messages').select('*', { count: 'exact', head: true })
        const contactsLatest = await supabase.from('contact_messages').select('created_at').order('created_at', { ascending: false }).limit(1)

        const settingsRow = await supabase.from('site_settings').select('updated_at').eq('id', 1).single()

        const toTime = (res: any, col: 'updated_at' | 'created_at' = 'updated_at') => {
          const t = res.data?.[0]?.[col]
          return t ? new Date(t).toLocaleString() : '-'
        }
        const maxTime = (a: string, b: string) => {
          if (a === '-') return b
          if (b === '-') return a
          return new Date(a) > new Date(b) ? a : b
        }

        if (!mounted) return
        setKpi({
          news: {
            total: newsTotal.count ?? 0,
            published: newsPub.count ?? 0,
            draft: newsDraft.count ?? 0,
            latest: toTime(newsLatest),
          },
          events: {
            total: eventsTotal.count ?? 0,
            published: eventsPub.count ?? 0,
            draft: eventsDraft.count ?? 0,
            latest: toTime(eventsLatest),
          },
          menu: {
            sections: menuSections.count ?? 0,
            items: menuItems.count ?? 0,
            latest: maxTime(toTime(menuLatestA), toTime(menuLatestB)),
          },
          gallery: {
            images: galleryImages.count ?? 0,
            latest: toTime(galleryLatest),
          },
          staff: {
            profiles: staffProfiles.count ?? 0,
            latest: toTime(staffLatest),
          },
          reservations: {
            total: reservationsTotal.count ?? 0,
            pending: reservationsPending.count ?? 0,
            latest: toTime(reservationsLatest, 'created_at'),
          },
          contacts: {
            total: contactsTotal.count ?? 0,
            latest: toTime(contactsLatest, 'created_at'),
          },
          settings: {
            exists: !!settingsRow.data,
            latest: settingsRow.data?.updated_at ? new Date(settingsRow.data.updated_at).toLocaleString() : '-',
          },
        })
      } catch (e: any) {
        setError(e.message ?? 'ダッシュボード情報の取得に失敗しました')
      } finally {
        setLoading(false)
      }
    }
    void load()
    return () => { mounted = false }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()} disabled={loading}>再読込</Button>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-zinc-500">読み込み中...</div>
      )}
      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader><CardTitle>ニュース</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>総数: {kpi.news.total}（公開 {kpi.news.published} / 下書き {kpi.news.draft}）</div>
            <div>最終更新: {kpi.news.latest}</div>
            <div className="pt-2 flex gap-2">
              <Link to="/admin/news" className="underline">管理へ</Link>
              <Link to="/admin/news" className="underline">新規作成</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>イベント</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>総数: {kpi.events.total}（公開 {kpi.events.published} / 下書き {kpi.events.draft}）</div>
            <div>最終更新: {kpi.events.latest}</div>
            <div className="pt-2 flex gap-2">
              <Link to="/admin/events" className="underline">管理へ</Link>
              <Link to="/admin/events" className="underline">新規作成</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>メニュー</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>セクション: {kpi.menu.sections} / アイテム: {kpi.menu.items}</div>
            <div>最終更新: {kpi.menu.latest}</div>
            <div className="pt-2 flex gap-2">
              <Link to="/admin/menu" className="underline">管理へ</Link>
              <Link to="/admin/menu" className="underline">新規アイテム</Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>ギャラリー</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>画像: {kpi.gallery.images}</div>
            <div>最終更新: {kpi.gallery.latest}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>スタッフ</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>プロフィール: {kpi.staff.profiles}</div>
            <div>最終更新: {kpi.staff.latest}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>予約</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>総数: {kpi.reservations.total}（未対応 {kpi.reservations.pending}）</div>
            <div>最終更新: {kpi.reservations.latest}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>お問い合わせ</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>総数: {kpi.contacts.total}</div>
            <div>最終更新: {kpi.contacts.latest}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>サイト設定</CardTitle></CardHeader>
          <CardContent className="text-sm space-y-1">
            <div>レコード: {kpi.settings.exists ? 'あり' : '未作成'}</div>
            <div>最終更新: {kpi.settings.latest}</div>
            <div className="pt-2 flex gap-2">
              <Link to="/admin/settings" className="underline">設定を開く</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}