import { CheckCircle } from 'lucide-react';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { Card, CardContent } from '@/components/ui/card';
import { useParallax } from '@/hooks/useParallax';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const parallaxOffset = useParallax(0.15);
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 xl:py-24 2xl:py-32 bg-trend-surface/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div 
        className="absolute -top-10 left-0 w-72 h-72 bg-trend-accent/10 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
      />
      <div 
        className="absolute bottom-10 right-0 w-96 h-96 bg-trend-accent/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * -0.4}px)` }}
      />

      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              {t('features.sectionTitle')}
            </h2>
            <p className="text-xl xl:text-2xl 2xl:text-3xl text-trend-text/80 font-noto">
              {t('features.sectionSubtitle')}
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16">
          <AnimatedElement animation="fadeInLeft" delay={200}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 xl:p-10 2xl:p-12">
                <div className="flex items-start gap-4 xl:gap-6 2xl:gap-8">
                  <CheckCircle className="w-8 h-8 xl:w-10 xl:h-10 text-trend-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-trend-accent mb-2 xl:mb-3 2xl:mb-4 font-noto">
                      {t('features.items.dayNight.title')}
                    </h3>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto leading-relaxed">
                      {t('features.items.dayNight.desc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="fadeInRight" delay={300}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 xl:p-10 2xl:p-12">
                <div className="flex items-start gap-4 xl:gap-6 2xl:gap-8">
                  <CheckCircle className="w-8 h-8 xl:w-10 xl:h-10 text-trend-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-trend-accent mb-2 xl:mb-3 2xl:mb-4 font-noto">
                      {t('features.items.omiBeef.title')}
                    </h3>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto leading-relaxed">
                      {t('features.items.omiBeef.desc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="fadeInLeft" delay={400}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 xl:p-10 2xl:p-12">
                <div className="flex items-start gap-4 xl:gap-6 2xl:gap-8">
                  <CheckCircle className="w-8 h-8 xl:w-10 xl:h-10 text-trend-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-trend-accent mb-2 xl:mb-3 2xl:mb-4 font-noto">
                      {t('features.items.virtualBiwa.title')}
                    </h3>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto leading-relaxed">
                      {t('features.items.virtualBiwa.desc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>

          <AnimatedElement animation="fadeInRight" delay={500}>
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 xl:p-10 2xl:p-12">
                <div className="flex items-start gap-4 xl:gap-6 2xl:gap-8">
                  <CheckCircle className="w-8 h-8 xl:w-10 xl:h-10 text-trend-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-trend-accent mb-2 xl:mb-3 2xl:mb-4 font-noto">
                      {t('features.items.community.title')}
                    </h3>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto leading-relaxed">
                      {t('features.items.community.desc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default Features;
