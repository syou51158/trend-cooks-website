
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      date: '2025/08/01',
      title: '【グランドオープン決定】9/1（月）正式営業スタート！',
      excerpt: 'いよいよTrend Cooksが正式オープンいたします。皆様のお越しをお待ちしております。',
      category: 'お知らせ'
    },
    {
      date: '2025/07/20',
      title: '予約フォーム公開／SNS特典キャンペーン実施中',
      excerpt: 'オンライン予約システムを公開しました。SNSフォローで特典もご用意しています。',
      category: 'キャンペーン'
    },
    {
      date: '2025/07/01',
      title: 'プレオープンレポート（インフルエンサー試食会）',
      excerpt: '地元インフルエンサーの皆様にお越しいただき、貴重なご意見をいただきました。',
      category: 'イベント'
    }
  ];

  return (
    <section id="news" className="py-20 xl:py-24 2xl:py-32 bg-white">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            ニュース
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
            Trend Cooksからのお知らせ、季節メニュー、プレオープン情報など最新情報をお届けします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8 xl:gap-12 2xl:gap-16 mb-12 xl:mb-16 2xl:mb-20">
          {newsItems.map((item, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
              <CardHeader className="xl:p-6 2xl:p-8">
                <div className="flex items-center justify-between mb-2 xl:mb-3 2xl:mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-trend-accent" />
                    <span className="text-sm xl:text-base 2xl:text-lg text-gray-500 font-noto">{item.date}</span>
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
                  詳細を見る
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
            （管理画面からオーナー様が直接更新可能）
          </p>
        </div>
      </div>
    </section>
  );
};

export default News;
