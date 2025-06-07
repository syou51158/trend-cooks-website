
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-trend-bg to-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-noto">
          Trend Cooks へようこそ
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-noto leading-relaxed">
          "流行のものを手軽に味わう"をコンセプトに、<br />
          大津京エリアに誕生した創作料理店＆バー
        </p>
        <p className="text-lg mb-12 max-w-3xl mx-auto font-noto">
          昼はSNS映えする創作ランチやスイーツ、夜は琵琶湖投影×バータイムで、<br />
          地元ファミリーからインバウンド観光客まで幅広くおもてなしします。
        </p>
        
        <Button 
          onClick={scrollToContact}
          size="lg" 
          className="bg-trend-accent hover:bg-trend-accent/90 text-white px-8 py-3 text-lg font-noto"
        >
          今すぐオンライン予約
          <ArrowRight className="ml-2" size={20} />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
