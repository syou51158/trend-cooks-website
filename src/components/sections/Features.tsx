import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, Video, Users } from 'lucide-react';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';

const Features = () => {
  const parallaxOffset = useParallax(0.1);

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-trend-accent" />,
      title: '昼夜二毛作',
      description: '11:00–17:00は創作カフェ、17:00–23:30はスナック・バー営業。',
      color: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      icon: <Star className="w-8 h-8 text-trend-accent" />,
      title: '近江牛創作',
      description: 'A5ランク近江牛を使った炙り寿司／スキレットステーキなどプレミアムメニュー。',
      color: 'from-amber-500/10 to-orange-500/10'
    },
    {
      icon: <Video className="w-8 h-8 text-trend-accent" />,
      title: 'バーチャル琵琶湖ビュー',
      description: 'Nebulaレーザープロジェクターで湖畔の風景を店内に投影。',
      color: 'from-emerald-500/10 to-teal-500/10'
    },
    {
      icon: <Users className="w-8 h-8 text-trend-accent" />,
      title: '地域交流',
      description: '通りがかりの子ども向け無料試食、柳崎公園でのアウトドアイベントも構想中。',
      color: 'from-purple-500/10 to-pink-500/10'
    }
  ];

  return (
    <section className="py-20 xl:py-24 2xl:py-32 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div 
        className="absolute top-16 left-16 w-40 h-40 bg-trend-accent/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
      />
      <div 
        className="absolute bottom-20 right-20 w-56 h-56 bg-trend-accent/3 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * -0.4}px)` }}
      />
      <div 
        className="absolute top-1/3 right-1/4 w-24 h-24 bg-trend-accent/8 rounded-full blur-2xl"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
      />

      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              私たちの特徴
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
              Trend Cooksが選ばれる理由
            </p>
          </div>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8 xl:gap-12 2xl:gap-16">
          {features.map((feature, index) => (
            <AnimatedElement key={index} animation="scaleIn" delay={200 + index * 50}>
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group h-full relative overflow-hidden">
                {/* Gradient background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <CardContent className="p-6 xl:p-8 2xl:p-10 text-center h-full flex flex-col relative z-10">
                  <div className="flex justify-center mb-4 xl:mb-6 2xl:mb-8">
                    <div className="relative">
                      <div className="absolute inset-0 bg-trend-accent/20 rounded-full blur-lg group-hover:bg-trend-accent/30 transition-colors duration-300 scale-150"></div>
                      <div className="relative bg-white rounded-full p-4 xl:p-5 2xl:p-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-text mb-3 xl:mb-4 2xl:mb-6 font-noto group-hover:text-trend-accent transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Floating dots animation */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-trend-accent rounded-full animate-bounce"></div>
                  </div>
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-1 h-1 bg-trend-accent/60 rounded-full animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
