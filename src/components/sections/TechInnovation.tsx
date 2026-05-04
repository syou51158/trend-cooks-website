import AnimatedElement from '@/components/ui/AnimatedElement';
import { useTranslation } from 'react-i18next';
import { Cpu, MapPin } from 'lucide-react';

const TechInnovation = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 xl:py-24 2xl:py-32 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20">
            <h3 className="text-cyan-400 text-lg md:text-xl font-bold tracking-widest mb-4 uppercase">
              {t('tech.title')}
            </h3>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-6 font-noto leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
              {t('tech.subtitle').split('、').map((part, i, arr) => (
                <span key={i}>
                  {part}{i < arr.length - 1 && '、'}
                  {i === 0 && <br className="hidden sm:block" />}
                </span>
              ))}
            </h2>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          <AnimatedElement animation="fadeInLeft" delay={200}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 p-8 xl:p-12 rounded-3xl transition-all duration-300 h-full group">
              <div className="bg-cyan-400/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="text-cyan-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-noto text-[#d4af37]">
                {t('tech.diy.title')}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-noto">
                {t('tech.diy.desc')}
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fadeInRight" delay={300}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/30 p-8 xl:p-12 rounded-3xl transition-all duration-300 h-full group">
              <div className="bg-blue-400/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="text-blue-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-noto text-blue-400">
                {t('tech.delivery.title')}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed font-noto">
                {t('tech.delivery.desc')}
              </p>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="fadeInUp" delay={400}>
          <div className="mt-16 text-center">
            <div className="inline-block border border-cyan-400/30 bg-cyan-400/5 px-8 py-4 rounded-full text-cyan-400 font-medium shadow-[0_0_30px_rgba(0,229,255,0.1)]">
              {t('tech.footer')}
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default TechInnovation;