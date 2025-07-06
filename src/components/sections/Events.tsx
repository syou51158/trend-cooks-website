import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, Film, TreePine, ArrowRight } from 'lucide-react';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';

const Events = () => {
  const parallaxOffset = useParallax(0.1);

  const events = [
    {
      icon: <Music className="w-8 h-8 text-trend-accent" />,
      title: '週末アコースティックライブ',
      description: '地元アーティストによる生演奏をステージでお届け（予約優先）。',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      status: '毎週開催'
    },
    {
      icon: <Film className="w-8 h-8 text-trend-accent" />,
      title: '映画上映会・スポーツ観戦会',
      description: 'プロジェクターで大画面視聴。貸切予約も可。',
      image: 'https://images.unsplash.com/photo-1489599904472-84978f312f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      status: '随時開催'
    },
    {
      icon: <TreePine className="w-8 h-8 text-trend-accent" />,
      title: '柳崎公園アウトドアイベント（構想中）',
      description: 'ドームテントやレジャーシート貸出で湖畔ピクニック体験。',
      image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      status: '準備中'
    }
  ];

  const scrollToNews = () => {
    const element = document.querySelector('#news');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="events" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg relative overflow-hidden">
      {/* Floating background elements */}
      <div 
        className="absolute top-10 right-16 w-48 h-48 bg-trend-accent/4 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
      />
      <div 
        className="absolute bottom-20 left-16 w-32 h-32 bg-trend-accent/6 rounded-full blur-2xl"
        style={{ transform: `translateY(${parallaxOffset * -0.5}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/3 w-20 h-20 bg-trend-accent/5 rounded-full blur-xl"
        style={{ transform: `translateY(${parallaxOffset * 0.9}px)` }}
      />

      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              イベント
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
              様々な交流イベントとエンターテイメント
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-8 xl:gap-12 2xl:gap-16 mb-12 xl:mb-16 2xl:mb-20">
          {events.map((event, index) => (
            <AnimatedElement key={index} animation="scaleIn" delay={200 + index * 50}>
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-3">
                <div className="relative h-48 xl:h-56 2xl:h-64 overflow-hidden">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/png';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4 xl:top-6 xl:right-6 2xl:top-8 2xl:right-8">
                    <span className="bg-trend-accent text-white px-3 py-1 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2 rounded-full text-xs xl:text-sm 2xl:text-base font-noto shadow-lg">
                      {event.status}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 left-4 xl:top-6 xl:left-6 2xl:top-8 2xl:left-8">
                    <div className="bg-white/95 p-2 xl:p-3 2xl:p-4 rounded-full shadow-lg group-hover:bg-white transition-colors duration-300 group-hover:scale-110 transform duration-300">
                      {event.icon}
                    </div>
                  </div>

                  {/* Floating elements on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-trend-accent rounded-full animate-bounce"></div>
                  </div>
                </div>
                
                <CardHeader className="group-hover:bg-gradient-to-r group-hover:from-trend-bg group-hover:to-white transition-all duration-300">
                  <CardTitle className="text-xl xl:text-2xl 2xl:text-3xl font-noto text-trend-text group-hover:text-trend-accent transition-colors duration-300">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="group-hover:bg-gradient-to-r group-hover:from-trend-bg group-hover:to-white transition-all duration-300">
                  <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto group-hover:text-gray-700 transition-colors duration-300">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement animation="fadeInUp" delay={450}>
          <div className="text-center relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-trend-accent to-transparent"></div>
            
            <p className="text-lg xl:text-xl 2xl:text-2xl text-trend-text mb-6 xl:mb-8 2xl:mb-10 font-noto">
              各種イベント情報は「News」ページで随時更新中
            </p>
            
            <Button 
              onClick={scrollToNews}
              className="bg-trend-accent hover:bg-trend-accent/90 text-white xl:text-lg 2xl:text-xl xl:px-8 xl:py-3 2xl:px-10 2xl:py-4 font-noto transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              ニュースを見る
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
            </Button>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-trend-accent to-transparent"></div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Events;
