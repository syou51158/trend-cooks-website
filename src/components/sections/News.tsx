
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const News = () => {
  const { t, i18n } = useTranslation();
  const newsItems = t('news.items', { returnObjects: true }) as Array<{
    date: string;
    title: string;
    excerpt: string;
    category: string;
  }>;

  // Format a date like 'YYYY/MM/DD' according to the current locale
  const formatNewsDate = (dateStr: string) => {
    // Expecting format 'YYYY/MM/DD'. Fallback to raw string if parsing fails.
    const m = dateStr.match(/^(\d{4})[\/.-](\d{1,2})[\/.-](\d{1,2})$/);
    if (!m) return dateStr;
    const [_, y, mo, d] = m;
    const date = new Date(Number(y), Number(mo) - 1, Number(d));
    try {
      return new Intl.DateTimeFormat(i18n.language || 'ja', {
        year: 'numeric',
        month: i18n.language.startsWith('en') ? 'short' : '2-digit',
        day: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="news" className="py-20 xl:py-24 2xl:py-32 bg-white">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            {t('news.title')}
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
            {t('news.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 xl:gap-12 2xl:gap-16 mb-12 xl:mb-16 2xl:mb-20">
          {newsItems.map((item, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <CardHeader className="xl:p-6 2xl:p-8">
                <div className="flex items-center justify-between mb-2 xl:mb-3 2xl:mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-trend-accent" />
                    <span className="text-sm xl:text-base 2xl:text-lg text-gray-500 font-noto">{formatNewsDate(item.date)}</span>
                  </div>
                  <span className="text-xs xl:text-sm 2xl:text-base bg-trend-accent text-white px-2 py-1 xl:px-3 xl:py-2 2xl:px-4 2xl:py-2 rounded-full font-noto">
                    {item.category}
                  </span>
                </div>
                <CardTitle className="text-lg xl:text-xl 2xl:text-2xl font-noto text-trend-text group-hover:text-trend-accent transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="xl:p-6 2xl:p-8">
                <p className="text-gray-600 text-sm xl:text-base 2xl:text-lg font-noto mb-4 xl:mb-6 2xl:mb-8">
                  {item.excerpt}
                </p>
                <div className="flex items-center text-trend-accent text-sm xl:text-base 2xl:text-lg font-noto group-hover:translate-x-1 transition-transform">
                  {t('news.readMore')}
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
            {t('news.adminNote')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default News;
