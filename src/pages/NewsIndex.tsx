import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ArrowRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination'

const PAGE_SIZE = 10

type Item = { id: string; title: string; body: string | null; published_at: string | null }

export default function NewsIndex() {
  const { t, i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Item[]>([])
  const [total, setTotal] = useState<number>(0)

  const page = useMemo(() => {
    const p = Number(searchParams.get('page') || '1')
    return Number.isFinite(p) && p > 0 ? Math.floor(p) : 1
  }, [searchParams])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total])

  const formatNewsDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    try {
      return new Intl.DateTimeFormat(i18n.language || 'ja', {
        year: 'numeric',
        month: i18n.language?.startsWith('en') ? 'short' : '2-digit',
        day: 'numeric',
      }).format(date)
    } catch {
      return dateStr
    }
  }

  useEffect(() => {
    let mounted = true
    const run = async () => {
      setLoading(true)
      setError(null)
      const from = (page - 1) * PAGE_SIZE
      const to = from + PAGE_SIZE - 1
      const nowIso = new Date().toISOString()
      const { data, error, count } = await supabase
        .from('news')
        .select('id,title,body,published_at', { count: 'exact' })
        .eq('status', 'published')
        .lte('published_at', nowIso)
        .order('published_at', { ascending: false })
        .range(from, to)

      if (!mounted) return
      if (error) {
        setError(error.message)
        setItems([])
        setTotal(0)
      } else {
        setItems((data ?? []) as Item[])
        setTotal(count ?? 0)
      }
      setLoading(false)
    }
    void run()
    return () => {
      mounted = false
    }
  }, [page, i18n.language])


  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-trend-text font-noto">{t('news.title', { defaultValue: 'お知らせ' })}</h1>
          <p className="text-gray-600 mt-2 font-noto">{t('news.subtitle', { defaultValue: '最新のお知らせを一覧でご覧いただけます' })}</p>
        </div>

        {error && <div className="text-center text-red-600 mb-6 text-sm">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))
          ) : items.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 font-noto">
              {t('news.empty', { defaultValue: '現在お知らせはありません。' })}
            </div>
          ) : (
            items.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="block group">
                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-trend-accent" />
                        <span className="text-sm text-gray-500 font-noto">{formatNewsDate(item.published_at || '')}</span>
                      </div>
                      <span className="text-xs bg-trend-accent text-white px-2 py-1 rounded-full font-noto">News</span>
                    </div>
                    <CardTitle className="text-xl font-noto text-trend-text group-hover:text-trend-accent transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm font-noto mb-3 line-clamp-3">
                      {(item.body || '').replace(/\s+/g, ' ').trim()}
                    </p>
                    <div className="flex items-center text-trend-accent text-sm font-noto group-hover:translate-x-1 transition-transform">
                      {t('news.readMore', { defaultValue: '詳しく読む' })}
                      <ArrowRight size={14} className="ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${Math.max(1, page - 1)}`}
                  onClick={(e) => {
                    if (page <= 1) e.preventDefault()
                  }}
                >
                  {t('pagination.previous', { defaultValue: '前へ' })}
                </PaginationPrevious>
              </PaginationItem>

              {totalPages > 8 ? (
                <>
                  <PaginationItem>
                    <PaginationLink href={`?page=1`} isActive={page === 1}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {page > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {[-1, 0, 1]
                    .map((d) => page + d)
                    .filter((p) => p > 1 && p < totalPages)
                    .map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink href={`?page=${p}`} isActive={p === page}>
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  {page < totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink href={`?page=${totalPages}`} isActive={page === totalPages}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              ) : (
                Array.from({ length: totalPages }).map((_, i) => {
                  const p = i + 1
                  return (
                    <PaginationItem key={p}>
                      <PaginationLink href={`?page=${p}`} isActive={p === page}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })
              )}

              <PaginationItem>
                <PaginationNext
                  href={`?page=${Math.min(totalPages, page + 1)}`}
                  onClick={(e) => {
                    if (page >= totalPages) e.preventDefault()
                  }}
                >
                  {t('pagination.next', { defaultValue: '次へ' })}
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  )
}