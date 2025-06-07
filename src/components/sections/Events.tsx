
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Film, TreePine, ArrowRight } from 'lucide-react';

const Events = () => {
  const events = [
    {
      icon: <Music className="w-8 h-8 text-trend-accent" />,
      title: '週末アコースティックライブ',
      description: '地元アーティストによる生演奏をステージでお届け（予約優先）。',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <Film className="w-8 h-8 text-trend-accent" />,
      title: '映画上映会・スポーツ観戦会',
      description: 'プロジェクターで大画面視聴。貸切予約も可。',
      image: 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      icon: <TreePine className="w-8 h-8 text-trend-accent" />,
      title: '柳崎公園アウトドアイベント（構想中）',
      description: 'ドームテントやレジャーシート貸出で湖畔ピクニック体験。',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const scrollToNews = () => {
    const element = document.querySelector('#news');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="events" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            イベント
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
            Trend Cooksでは、店内外で多彩なイベントを定期開催。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16 mb-12 xl:mb-16 2xl:mb-20">
          {events.map((event, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 xl:h-56 2xl:h-64">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400/png';
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4 xl:top-6 xl:left-6 2xl:top-8 2xl:left-8">
                  <div className="bg-white/90 p-2 xl:p-3 2xl:p-4 rounded-full">
                    {event.icon}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl xl:text-2xl 2xl:text-3xl font-noto text-trend-text">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg xl:text-xl 2xl:text-2xl text-trend-text mb-6 xl:mb-8 2xl:mb-10 font-noto">
            各種イベント情報は「News」ページで随時更新中
          </p>
          <Button 
            onClick={scrollToNews}
            className="bg-trend-accent hover:bg-trend-accent/90 text-white xl:text-lg 2xl:text-xl xl:px-8 xl:py-3 2xl:px-10 2xl:py-4 font-noto"
          >
            ニュースを見る
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Events;
