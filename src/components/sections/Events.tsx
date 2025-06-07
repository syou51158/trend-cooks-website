
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
    <section id="events" className="py-20 bg-trend-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-trend-text mb-4 font-noto">
            イベント
          </h2>
          <p className="text-lg text-gray-600 font-noto">
            Trend Cooksでは、店内外で多彩なイベントを定期開催。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400/png';
                  }}
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 p-2 rounded-full">
                    {event.icon}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-noto text-trend-text">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-noto">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-trend-text mb-6 font-noto">
            各種イベント情報は「News」ページで随時更新中
          </p>
          <Button 
            onClick={scrollToNews}
            className="bg-trend-accent hover:bg-trend-accent/90 text-white font-noto"
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
