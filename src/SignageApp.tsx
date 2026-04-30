import { useState, useEffect } from 'react';
import './App.css';

// Slide 1: Concept & Atmosphere
const SlideConcept = () => (
  <div className="absolute inset-0 bg-black flex flex-col justify-center items-center text-white p-12 text-center">
    <div className="absolute inset-0 z-0">
      {/* エレガントな抽象SVG背景 */}
      <img src="/images/signage/bg_luxury_dark.svg" alt="Luxury Dark Background" className="w-full h-full object-cover" />
    </div>
    <div className="relative z-10">
      <h1 className="text-7xl md:text-8xl font-bold font-noto mb-8 tracking-widest text-white leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
        未完成という、<br/><span className="text-[#d4af37]">最高のスパイス。</span>
      </h1>
      <p className="text-3xl md:text-4xl font-noto leading-relaxed mb-10 text-gray-200" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
        ここは完成されたレストランではありません。<br/>
        最新トレンドと伝統を掛け合わせ、お客様の声と共に<br/>
        毎日「進化」を続ける実験的ダイニングです。
      </p>
      <div className="border border-[#d4af37]/50 bg-black/60 backdrop-blur-md px-10 py-5 rounded-full text-2xl font-bold text-[#d4af37] mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
        ※あなたの「これ美味しい！」が、明日の看板メニューになるかもしれません。
      </div>
      <p className="text-3xl font-bold text-white animate-bounce mt-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
        「今日」だけの空間を、ぜひ体験していきませんか？ ▼
      </p>
    </div>
  </div>
);

// Slide 2: Premium vs Viral (Menu evolution)
const SlideMenu = () => (
  <div className="absolute inset-0 flex bg-black">
    <div className="w-1/2 relative bg-black flex flex-col justify-center items-center p-16">
      <img src="/images/menu/omi_wagyu_premium_steak_1772802896944.png" alt="Omi Wagyu Steak" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div className="relative z-10 text-center mt-auto pb-24">
        <h3 className="text-[#d4af37] text-3xl font-bold tracking-widest mb-4">TRADITION</h3>
        <h2 className="text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>最高級・近江牛</h2>
        <p className="text-2xl text-gray-200 font-medium">変わらない、本物の価値。</p>
      </div>
    </div>
    <div className="w-1/2 relative bg-black flex flex-col justify-center items-center p-16">
      <img src="/images/menu/premium_carbo_buldak_1772887774573.png" alt="Trend Menu" className="absolute inset-0 w-full h-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div className="relative z-10 text-center mt-auto pb-24">
        <h3 className="text-cyan-400 text-3xl font-bold tracking-widest mb-4">TREND</h3>
        <h2 className="text-6xl font-bold text-white mb-6" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>最新SNSグルメ</h2>
        <p className="text-2xl text-gray-200 font-medium">常に変化する、新しい刺激。</p>
      </div>
    </div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black text-white rounded-full w-32 h-32 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] border-2 border-[#d4af37]">
      <h2 className="text-4xl font-bold uppercase tracking-widest">X</h2>
    </div>
  </div>
);

// Slide 3: Day & Night Atmosphere
const SlideDayNight = () => (
  <div className="absolute inset-0 flex">
    <div className="w-1/2 relative bg-[#fdfbf7] flex flex-col justify-center p-16 text-left">
      <div className="absolute inset-0 z-0">
        <img src="/images/signage/bg_luxury_day.svg" alt="Luxury Day Background" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <h2 className="text-7xl font-bold font-noto text-zinc-800 mb-4">DAY</h2>
        <p className="text-3xl text-[#d4af37] font-bold tracking-widest mb-8">11:00 - 17:00</p>
        <h3 className="text-4xl font-noto font-bold text-zinc-800 mb-6">カフェ＆リラックス</h3>
        <p className="text-2xl font-noto text-zinc-700 leading-relaxed font-medium">明るい日差しと最新スイーツ。<br/>誰もが気軽に立ち寄れる、オープンな時間。</p>
      </div>
    </div>
    <div className="w-1/2 relative bg-[#020305] flex flex-col justify-center p-16 text-right">
      <div className="absolute inset-0 z-0">
        <img src="/images/signage/bg_luxury_night.svg" alt="Luxury Night Background" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <h2 className="text-7xl font-bold font-noto text-white mb-4">NIGHT</h2>
        <p className="text-3xl text-cyan-400 font-bold tracking-widest mb-8">17:00 - 23:30</p>
        <h3 className="text-4xl font-noto font-bold text-white mb-6">ダイニング＆バー</h3>
        <p className="text-2xl font-noto text-gray-300 leading-relaxed font-medium">ネオンとプロジェクターが彩る非日常。<br/>極上のお肉とお酒で、大人の遊び場へ。</p>
      </div>
    </div>
    <div className="absolute inset-y-0 left-1/2 w-px bg-white/20 transform -translate-x-1/2 z-10"></div>
  </div>
);

// Slide 4: CTA & QR
const SlideCTA = () => (
  <div className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white p-12">
    <div className="absolute inset-0 z-0">
      <img src="/images/signage/bg_luxury_dark.svg" alt="Luxury Background" className="w-full h-full object-cover opacity-80" />
    </div>
    <div className="relative z-10 text-center max-w-4xl bg-black/40 backdrop-blur-xl p-16 rounded-[3rem] border border-[#d4af37]/40 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
      <h2 className="text-6xl font-bold font-noto mb-8 text-white leading-tight">
        さあ、一緒に<br/><span className="text-[#d4af37]">お店をアップデート</span>しよう。
      </h2>
      <p className="text-3xl font-noto text-gray-200 mb-12 leading-snug">
        ご予約なしでも大歓迎です。<br/>
        ふらっと立ち寄って、今日の進化を味わってください。
      </p>
      
      <div className="flex justify-center items-center space-x-12">
        <div className="bg-white p-4 rounded-3xl shadow-xl">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://www.instagram.com/trend.cooks?igsh=MXg2bG01eGl6M2t4cg%3D%3D&utm_source=qr')}`} alt="Instagram QR Code" className="w-40 h-40" />
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold text-white mb-2">Instagramで最新情報を発信中！</p>
          <p className="text-xl text-gray-300">フォローして「進化」の過程をチェック。</p>
        </div>
      </div>
    </div>
  </div>
);

const slides = [
  SlideConcept,
  SlideMenu,
  SlideDayNight,
  SlideCTA
];

const SignageApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // スライドを8秒ごとに自動切り替え
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black font-noto">
      {/* ProgressBar for visual feedback */}
      <div className="absolute top-0 left-0 h-2 bg-[#d4af37] z-50 transition-all duration-[8000ms] ease-linear"
        key={currentSlide}
        style={{ width: '100%', animation: 'progress 8s linear normal forwards' }}
      ></div>
      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>

      {slides.map((SlideComponent, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ transitionDuration: '1.5s' }}
        >
          {/* Only render current and previous slides occasionally for performance */}
          {(index === currentSlide || index === (currentSlide - 1 + slides.length) % slides.length || index === (currentSlide + 1) % slides.length) && (
             <SlideComponent />
          )}
        </div>
      ))}
      
      {/* Sleek Header Banner */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-[96%] bg-black/70 backdrop-blur-xl text-white px-8 py-4 rounded-full border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-between font-noto">
        <div className="flex items-center space-x-6">
          <span className="bg-[#d4af37] text-black px-6 py-2 rounded-full text-lg font-bold tracking-widest animate-pulse">NOW OPEN</span>
          <p className="text-xl text-white font-medium tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>本日は営業中です。お気軽にお入りください。</p>
        </div>
        <div className="flex items-center">
          <span className="text-gray-300 text-lg mr-3">Status:</span>
          <span className="text-white text-xl font-bold tracking-widest">EVOLVING <span className="text-[#d4af37]">●</span></span>
        </div>
      </div>

      {/* Global Overlay */}
      <div className="absolute bottom-8 right-8 z-50 flex items-center space-x-3 bg-[#d4af37]/90 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl">
        <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
        <span className="text-black text-xl font-bold tracking-widest font-noto">OPEN</span>
      </div>
    </div>
  );
};

export default SignageApp;