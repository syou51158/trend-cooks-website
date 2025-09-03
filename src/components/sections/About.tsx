import { Card, CardContent } from '@/components/ui/card';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';
import { useTranslation } from 'react-i18next';

const About = () => {
  const parallaxOffset = useParallax(0.2);
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg relative overflow-hidden">
      {/* Floating background elements */}
      <div 
        className="absolute top-20 right-10 w-64 h-64 bg-trend-accent/5 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      />
      <div 
        className="absolute bottom-40 left-20 w-96 h-96 bg-trend-accent/3 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * -0.3}px)` }}
      />
      
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              {t('about.missionTitle')}
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20 items-center mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInLeft" delay={200}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-trend-accent/20 to-transparent rounded-lg transform group-hover:scale-105 transition-transform duration-300 blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt={t('about.alt.interior')}
                loading="lazy"
                width={1000}
                height={640}
                className="rounded-lg shadow-lg w-full h-80 xl:h-96 2xl:h-[28rem] object-cover transform group-hover:scale-105 transition-transform duration-500 relative z-10"
                style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
              />
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="fadeInRight" delay={300}>
            <div>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-trend-text mb-6 xl:mb-8 2xl:mb-10 font-noto leading-relaxed">
                {t('about.description')}
              </p>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="fadeInUp" delay={400}>
          <div className="mb-16 xl:mb-20 2xl:mb-24">
            <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-text mb-8 xl:mb-12 2xl:mb-16 text-center font-noto">
              {t('about.spaceHeading')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16">
              <AnimatedElement animation="fadeInUp" delay={450}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardContent className="p-6 xl:p-8 2xl:p-10">
                    <div className="w-12 h-12 bg-trend-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-trend-accent/20 transition-colors duration-300">
                      <span className="text-trend-accent text-2xl">🏢</span>
                    </div>
                    <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-3 xl:mb-4 2xl:mb-6 font-noto">
                      {t('about.space.location.title')}
                    </h4>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                      {t('about.space.location.desc')}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              
              <AnimatedElement animation="fadeInUp" delay={500}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardContent className="p-6 xl:p-8 2xl:p-10">
                    <div className="w-12 h-12 bg-trend-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-trend-accent/20 transition-colors duration-300">
                      <span className="text-trend-accent text-2xl">✨</span>
                    </div>
                    <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-3 xl:mb-4 2xl:mb-6 font-noto">
                      {t('about.space.interior.title')}
                    </h4>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                      {t('about.space.interior.desc')}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
              
              <AnimatedElement animation="fadeInUp" delay={550}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                  <CardContent className="p-6 xl:p-8 2xl:p-10">
                    <div className="w-12 h-12 bg-trend-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-trend-accent/20 transition-colors duration-300">
                      <span className="text-trend-accent text-2xl">🎭</span>
                    </div>
                    <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-3 xl:mb-4 2xl:mb-6 font-noto">
                      {t('about.space.stage.title')}
                    </h4>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                      {t('about.space.stage.desc')}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={600}>
          <div className="text-center">
            <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-text mb-8 xl:mb-12 2xl:mb-16 font-noto">
              {t('about.staffHeading')}
            </h3>
            <Card className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 xl:p-12 2xl:p-16">
                <div className="flex flex-col md:flex-row items-center gap-6 xl:gap-8 2xl:gap-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-trend-accent/20 rounded-full blur-lg group-hover:bg-trend-accent/30 transition-colors duration-300"></div>
                    <img 
                      src="/images/staff/代表_村岡翔.jpg"
                      alt={t('about.alt.ceo')}
                      loading="lazy"
                      width={192}
                      height={192}
                      className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 rounded-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80';
                      }}
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-2 xl:mb-4 2xl:mb-6 font-noto">
                      {t('about.staff.name')}
                    </h4>
                    <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                      {t('about.staff.bio')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default About;
