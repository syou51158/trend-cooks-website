import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

type NewsItem = {
  id: string
  title: string
  body: string | null
  status: 'draft' | 'published'
  published_at: string | null
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [item, setItem] = useState<NewsItem | null>(null)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      if (!id) return
      setLoading(true)
      setError(null)
      const nowIso = new Date().toISOString()
      const { data, error } = await supabase
        .from('news')
        .select('id,title,body,status,published_at')
        .eq('id', id)
        .eq('status', 'published')
        .lte('published_at', nowIso)
        .maybeSingle()
      if (!mounted) return
      if (error) {
        setError(error.message)
        setItem(null)
      } else {
        setItem(data as NewsItem | null)
      }
      setLoading(false)
    }
    void run()
    return () => { mounted = false }
  }, [id])

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return new Intl.DateTimeFormat('ja', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 text-sm">
        <Link to="/" className="text-trend-accent hover:underline">← トップへ戻る</Link>
      </div>

      {loading && <div className="text-sm text-zinc-500">読み込み中...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && !error && !item && (
        <div className="text-sm text-zinc-500">記事が見つかりませんでした。</div>
      )}

      {item && (
        <article>
          <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
          <div className="text-sm text-gray-500 mb-6">{formatDate(item.published_at)}</div>
          {item.body ? (
            <div className="prose max-w-none whitespace-pre-wrap leading-7">{item.body}</div>
          ) : (
            <p className="text-gray-600">本文はありません。</p>
          )}
        </article>
      )}
    </div>
  )
}