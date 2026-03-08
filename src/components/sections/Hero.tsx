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
        overlayOpacity={0.5}
      >
        <div className="flex items-center justify-center min-h-screen w-full">
          <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center text-white">
            <AnimatedElement animation="fadeInUp" delay={100}>
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
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-trend-accent hover:bg-trend-accent/90 text-white px-8 py-3 xl:px-12 xl:py-4 2xl:px-16 2xl:py-6 text-lg xl:text-xl 2xl:text-2xl font-noto transform hover:scale-105 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl"
                aria-label={t('hero.ctaAria')}
                type="button"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </AnimatedElement>
          </div>
        </div>
      </ParallaxBackground>
    </section>
  );
};

export default Hero;
