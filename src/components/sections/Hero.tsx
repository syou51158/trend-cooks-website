import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ParallaxBackground from '@/components/ui/ParallaxBackground';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  // デプロイテスト実行中 - 2025-01-06 21:50
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center w-full">
      <ParallaxBackground
        imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        className="min-h-screen w-full"
        parallaxFactor={0.3}
        overlayOpacity={0.7}
      >
        <div className="flex flex-col items-center justify-center min-h-screen w-full pt-20">
          
          {/* Evolving Alert Banner */}
          <AnimatedElement animation="fadeInUp" delay={50} className="w-full max-w-4xl mx-auto px-4 mb-8">
            <div className="bg-black/60 backdrop-blur-md border border-[#d4af37]/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <span className="inline-block bg-[#d4af37] text-black text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-3 animate-pulse">
                NOW EVOLVING
              </span>
              <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed font-noto">
                当店は現在<span className="text-[#d4af37] font-bold">「プレオープン（準備・調整中）」</span>の段階です。<br className="hidden sm:block"/>
                お客様と一緒にメニューやお店の形を作っていくため、見学やアドバイスも大歓迎です！
              </p>
            </div>
          </AnimatedElement>

          <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center text-white">
            <AnimatedElement animation="fadeInUp" delay={100}>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-sm font-medium">大津京の韓国チキン・ローストビーフ・バー</span>
                <span className="bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-sm font-medium">水槽のある小さなレストラン</span>
                <span className="bg-black/50 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full text-sm font-medium">店内飲食・テイクアウト対応</span>
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-6 xl:mb-8 2xl:mb-12 leading-tight font-noto drop-shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {t('hero.title')}
              </h1>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={200}>
              <p className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-white/90 mb-8 xl:mb-12 2xl:mb-16 font-noto drop-shadow-lg">
                {t('hero.subtitle')}
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="fadeInUp" delay={300}>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-white/80 mb-10 xl:mb-16 2xl:mb-20 max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed font-noto drop-shadow-md">
                {t('hero.description')}
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="scaleIn" delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="bg-trend-accent hover:bg-trend-accent/90 text-white px-8 py-3 xl:px-12 xl:py-4 2xl:px-16 2xl:py-6 text-lg xl:text-xl 2xl:text-2xl font-noto transform hover:scale-105 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl w-full sm:w-auto"
                  aria-label={t('hero.ctaAria')}
                  type="button"
                >
                  {t('hero.cta')}
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                
                <a href="/order" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="bg-white hover:bg-gray-100 text-black px-8 py-3 xl:px-12 xl:py-4 2xl:px-16 2xl:py-6 text-lg xl:text-xl 2xl:text-2xl font-noto transform hover:scale-105 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl w-full"
                    type="button"
                  >
                    テイクアウト注文
                  </Button>
                </a>
              </div>
              
              <div className="flex justify-center gap-6 mt-6">
                <a href="https://www.google.com/maps/search/?api=1&query=滋賀県大津市柳が崎9-15" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#d4af37] transition-colors flex flex-col items-center">
                  <span className="text-3xl mb-1">📍</span>
                  <span className="text-xs font-bold">Google Maps</span>
                </a>
                <a href="https://instagram.com/trendcooks" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#d4af37] transition-colors flex flex-col items-center">
                  <span className="text-3xl mb-1">📸</span>
                  <span className="text-xs font-bold">Instagram</span>
                </a>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </ParallaxBackground>
    </section>
  );
};

export default Hero;
