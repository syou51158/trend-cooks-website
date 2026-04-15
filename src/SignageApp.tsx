import { useState, useEffect } from 'react';
import './App.css';

// Slide 1: Concept & Atmosphere
const SlideConcept = () => (
  <div className="absolute inset-0 bg-black flex flex-col justify-center items-center text-white p-12 text-center"
       style={{
         backgroundImage: 'url(/images/restaurant_accurate_night_1772976044672.png)',
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.6)'
       }}>
    <h1 className="text-8xl md:text-9xl font-bold font-noto mb-8 uppercase tracking-widest text-[#d4af37]" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.5)' }}>Trend Cooks</h1>
    <h2 className="text-5xl md:text-6xl font-noto font-light mb-6 text-white" style={{ textShadow: '2px 4px 10px rgba(0,0,0,0.8)' }}>最新のトレンド × 伝統の味</h2>
    <p className="text-3xl md:text-4xl font-noto leading-relaxed mt-6">大津京駅徒歩2分。洗練された癒やしの空間で<br/>最高の食体験をお楽しみください。</p>
  </div>
);

// Slide 2: Premium Menu
const SlidePremium = () => (
  <div className="absolute inset-0 bg-black flex text-white font-noto">
    <div className="absolute inset-0 z-0">
      <img src="/images/menu/omi_wagyu_premium_steak_1772802896944.png" alt="Omi Wagyu Steak" className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
    </div>
    <div className="w-1/2 flex flex-col justify-center p-16 md:p-24 relative z-10 backdrop-blur-sm">
      <div className="inline-block bg-gradient-to-r from-[#d4af37] to-yellow-600 text-black text-2xl font-bold px-8 py-3 rounded-full mb-8 self-start shadow-[0_0_20px_rgba(212,175,55,0.4)]">プレミアムメニュー</div>
      <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">最高級 A5ランク<br/>近江牛の饗宴</h2>
      <p className="text-3xl md:text-4xl text-gray-200 leading-relaxed font-light">
        厳選された黒毛和牛の最高峰「近江牛」。<br/>
        口の中でとろける旨味と極上の香りを<br/>
        当店自慢のスキレットステーキ等で存分に。
      </p>
    </div>
  </div>
);

// Slide 3: Viral Trending Menus
const SlideViral = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#f8f5f2] to-[#e8e0d5] flex flex-col items-center justify-center text-trend-text p-12">
    <div className="text-center mb-12">
      <div className="inline-block bg-trend-text text-white text-2xl font-bold px-8 py-3 rounded-full mb-6 font-noto shadow-[0_10px_30px_rgba(0,0,0,0.15)] tracking-widest">話題沸騰・SNSトレンド</div>
      <h2 className="text-6xl md:text-7xl font-extrabold font-noto text-zinc-800 tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>最新トレンドを大津京で味わう！</h2>
    </div>
    <div className="grid grid-cols-3 gap-10 w-full max-w-[90%] flex-1 mb-8">
      <div className="flex flex-col relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white transform transition duration-500 scale-95 border-b-8 border-gray-200">
        <img src="/images/menu/viral_shokupan_cream_sandwich_1772805621246.png" className="h-2/3 w-full object-cover" alt="Cream Sandwich" />
        <div className="h-1/3 flex items-center justify-center p-6 bg-white"><h3 className="text-3xl font-bold font-noto text-center text-zinc-800 tracking-wide leading-snug">極厚純生クリーム<br/>食パンサンド</h3></div>
      </div>
      <div className="flex flex-col relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(212,175,55,0.3)] bg-white transform transition duration-500 scale-105 z-10 border-4 border-[#d4af37]">
        <img src="/images/menu/premium_carbo_buldak_1772887774573.png" className="h-2/3 w-full object-cover" alt="Cheese Buldak" />
        <div className="h-1/3 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
          <span className="text-[#d4af37] font-extrabold text-2xl mb-2 tracking-widest">🏆 人気No.1</span>
          <h3 className="text-4xl font-bold font-noto text-center text-zinc-800 tracking-wide leading-snug">極みチーズ<br/>ブルダックチキン</h3>
        </div>
      </div>
      <div className="flex flex-col relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-white transform transition duration-500 scale-95 border-b-8 border-gray-200">
        <img src="/images/menu/mochi_mochi_potato_fries_1772892139730.png" className="h-2/3 w-full object-cover" alt="Mochi Potato" />
        <div className="h-1/3 flex items-center justify-center p-6 bg-white"><h3 className="text-3xl font-bold font-noto text-center text-zinc-800 tracking-wide leading-snug">サクもち極みポテト<br/>濃厚チーズディップ</h3></div>
      </div>
    </div>
  </div>
);

// Slide 4: Day & Night Atmosphere
const SlideDayNight = () => (
  <div className="absolute inset-0 flex">
    <div className="w-1/2 relative bg-black flex flex-col justify-center p-16"
         style={{ backgroundImage: 'url(/images/restaurant_day_final_1772974803590.png)', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: 'inset 0 0 0 2000px rgba(255,255,255,0.7)' }}>
      <h2 className="text-6xl font-bold font-noto text-trend-accent mb-4">11:00 - 17:00</h2>
      <h3 className="text-4xl font-noto font-bold text-zinc-800 mb-6">創作カフェタイム</h3>
      <p className="text-2xl font-noto text-zinc-700 leading-relaxed font-medium">SNS映えする最新スイーツや<br/>本格的なスペシャルティコーヒーを満喫する<br/>あたたかな日差しのリラックス空間。</p>
    </div>
    <div className="w-1/2 relative bg-black flex flex-col justify-center p-16 text-white text-right"
         style={{ backgroundImage: 'url(/images/restaurant_interior_night_1772973514967.png)', backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.8)' }}>
      <h2 className="text-6xl font-bold font-noto text-[#d4af37] mb-4">17:00 - 23:30</h2>
      <h3 className="text-4xl font-noto font-bold text-white mb-6">ダイニング＆バータイム</h3>
      <p className="text-2xl font-noto text-gray-300 leading-relaxed font-medium">間接照明が織りなす大人の隠れ家へ。<br/>厳選された肉料理とお酒、<br/>そしてプロジェクターが彩る非日常の夜を。</p>
    </div>
    {/* Center Divider/Logo Overlay */}
    <div className="absolute inset-y-0 left-1/2 w-1 bg-white/20 transform -translate-x-1/2 z-10"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black rounded-full p-8 shadow-2xl border-4 border-[#d4af37]">
      <h2 className="text-4xl font-bold text-white uppercase tracking-widest font-noto">Day &<br/><span className="text-[#d4af37]">Night</span></h2>
    </div>
  </div>
);

// Slide 5: CTA & QR
const SlideCTA = () => (
  <div className="absolute inset-0 bg-[#121212] flex flex-col items-center justify-center text-white p-12">
    <div className="max-w-[70%] w-full bg-white text-black rounded-[3rem] p-16 shadow-2xl flex items-center justify-between">
      <div className="flex-1 pr-16 border-r-2 border-gray-100">
        <h2 className="text-5xl md:text-6xl font-bold font-noto mb-8 text-trend-text leading-tight">オンライン予約・<br/>メニューはこちら</h2>
        <p className="text-2xl md:text-3xl font-noto text-gray-600 mb-8 leading-snug">
          スマートフォンから簡単に<br/>ご予約やテイクアウトの注文が可能です。
        </p>
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold px-6 py-3 rounded-xl text-2xl shadow-md">Instagarm</div>
          <span className="text-2xl font-noto text-zinc-600 font-bold">フォローでお得な特典！</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col items-center justify-center pl-16">
        <div className="bg-white p-4 rounded-3xl shadow-xl mb-6">
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent('https://google.com')}`} alt="QR Code" className="w-[300px] h-[300px]" />
        </div>
        <p className="text-2xl font-bold text-gray-400">スマホで読み取る ▶</p>
      </div>
    </div>
    <div className="mt-12 text-center">
      <p className="text-3xl text-gray-400 tracking-widest font-noto">TREND COOKS OTSUKYO</p>
    </div>
  </div>
);

const slides = [
  SlideConcept,
  SlidePremium,
  SlideViral,
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
          {/* Only render current and previous slides occasionally for performance, but keeping it simple for now */}
          {(index === currentSlide || index === (currentSlide - 1 + slides.length) % slides.length || index === (currentSlide + 1) % slides.length) && (
             <SlideComponent />
          )}
        </div>
      ))}
      
      {/* Refined Modular Test Mode Banner */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-[96%] bg-black/60 backdrop-blur-2xl text-white py-4 px-8 rounded-full border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-row items-center justify-between font-noto">
        
        {/* Notice Section */}
        <div className="flex items-center space-x-6 w-1/3">
          <span className="bg-red-600 px-6 py-2 rounded-full text-lg font-bold tracking-widest animate-pulse shadow-md">TEST MODE</span>
          <p className="text-lg font-medium text-gray-200 leading-tight">
            ※現在表示中の写真は<span className="text-red-400 font-bold">開発用の仮画像</span>です。<br/>実物とは異なりますのでご注意ください。
          </p>
        </div>
        
        {/* Center Title */}
        <div className="text-4xl text-[#d4af37] font-extrabold tracking-[0.2em] w-1/3 text-center" style={{ textShadow: '0 0 20px rgba(212,175,55,0.5)' }}>
          サイネージ表示テスト中
        </div>

        {/* Schedule Display */}
        <div className="flex space-x-4 w-1/3 justify-end">
          <div className="flex flex-col justify-center bg-white/10 px-6 py-1 rounded-2xl border border-white/20 shadow-inner">
            <span className="text-sm text-gray-300 font-medium tracking-wider">プレオープン</span>
            <span className="text-2xl font-bold text-white tracking-widest">4.18<span className="text-lg ml-1">(土)</span></span>
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-br from-[#d4af37]/30 to-[#b38b22]/30 px-6 py-1 rounded-2xl border border-[#d4af37]/60 shadow-inner">
            <span className="text-sm text-[#e8d28a] font-medium tracking-wider">グランドオープン</span>
            <span className="text-2xl font-bold text-[#d4af37] tracking-widest">4.30<span className="text-lg ml-1">(木)</span></span>
          </div>
        </div>
        
      </div>

      {/* Global Overlay (Optional) */}
      <div className="absolute bottom-8 right-8 z-50 flex items-center space-x-3 bg-red-600/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl">
        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
        <span className="text-white text-xl font-bold tracking-widest font-noto">PREPARING</span>
      </div>
    </div>
  );
};

export default SignageApp;
