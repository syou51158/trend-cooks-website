import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import { trendOrderSupabase, fixMenuName } from './lib/trendOrderClient';
import './App.css';

const CACHE_BUSTER = Date.now();

// 現在の営業状態を取得する関数（自動判定ロジック）
const getAutoBusinessStatus = () => {
  const now = new Date();
  const jstFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  });
  
  const parts = jstFormatter.formatToParts(now);
  const getPart = (type: string) => parseInt(parts.find(p => p.type === type)?.value || '0', 10);
  
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hours = getPart('hour');
  const minutes = getPart('minute');
  const time = hours + minutes / 60;
  const dayOfWeek = now.getDay(); // 0: Sunday, 1: Monday, ...

  // --- 【定休日（月曜日）の対応】 ---
  if (dayOfWeek === 1) {
    return {
      badge: "REGULAR HOLIDAY",
      badgeColor: "bg-zinc-600 text-white",
      message: "本日は定休日となっております。ご不便をおかけしますが、明日のご来店を心よりお待ちしております。",
      overlay: "CLOSED",
      overlayColor: "bg-zinc-800/90 text-white",
      overlayDot: "bg-red-500",
      isPulse: false
    };
  }
  // -------------------------------------------------------------------------

  // --- 【特別対応】5月15日までの17:00オープン（プレオープン/調整期間）メッセージ ---
  // （期間終了につき削除）
  // -------------------------------------------------------------------------

  // 土日祝日判定（簡易的に土曜(6)と日曜(0)を休日とする。祝日は手動で `isWeekend` 扱いにするか、今後の拡張とする）
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const openTime = isWeekend ? 11 : 17;

  // 開店準備中 (06:00 - openTime)
  if (time >= 6 && time < openTime) {
    return {
      badge: "PREPARING",
      badgeColor: "bg-zinc-200 text-black",
      message: `ただいま開店準備中です。本日は${openTime}:00よりオープンいたします。準備中ですが内装の見学は可能ですので、お気軽にお声がけください！`,
      overlay: "PREPARING",
      overlayColor: "bg-zinc-800/90 text-white",
      overlayDot: "bg-yellow-500",
      isPulse: true
    };
  } 
  // 営業時間中 (openTime - 22:00)
  else if (time >= openTime && time < 22) {
    // 昼の時間帯 (11:00 - 17:00) ※土日のみ
    if (time < 17) {
      return {
        badge: "NOW OPEN",
        badgeColor: "bg-[#d4af37] text-black",
        message: "本日は営業中です！細かいこだわりを追求し、準備・調整をしながらの営業となります。お気軽にお入りください。",
        overlay: "WELCOME",
        overlayColor: "bg-[#d4af37]/90 text-black",
        overlayDot: "bg-black",
        isPulse: true
      };
    } 
    // 夜の時間帯 (17:00 - 22:00) ※全日共通
    else {
      return {
        badge: "NOW OPEN",
        badgeColor: "bg-[#00e5ff] text-black",
        message: "本日は営業中です！夜も引き続き、店内の調整を行いながら営業しております。お気軽にお入りください。",
        overlay: "WELCOME",
        overlayColor: "bg-[#00e5ff]/90 text-black",
        overlayDot: "bg-black",
        isPulse: true
      };
    }
  } 
  // 営業時間外 (22:00 - 06:00)
  else {
    return {
      badge: "CLOSED",
      badgeColor: "bg-zinc-600 text-white",
      message: "本日の営業は終了いたしました。明日の進化をお楽しみに。またのお越しをお待ちしております。",
      overlay: "CLOSED",
      overlayColor: "bg-zinc-800/90 text-white",
      overlayDot: "bg-red-500",
      isPulse: false
    };
  }
};

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

// Slide 2: Today's Special Images (Static Highlight)
const SlideMenu = () => (
  <div className="absolute inset-0 flex bg-black">
    <div className="w-1/2 relative bg-black flex flex-col justify-center items-center overflow-hidden">
      <img src="/images/menu/premium-chicken-box-l.jpg" alt="プレミアム韓国チキンボックス" className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
      
      <div className="absolute top-32 left-12 z-20">
        <p className="text-cyan-400 font-bold tracking-[0.3em] text-2xl mb-2 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">TREND SIGNATURE</p>
        <h3 className="text-white font-noto font-black text-7xl tracking-wider leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">PREMIUM<br/>CHICKEN BOX</h3>
      </div>
    </div>
    <div className="w-1/2 relative bg-black flex flex-col justify-center items-center">
      <img src="/images/menu/beer_menu.jpg" alt="アサヒスーパードライ" className="absolute inset-0 w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
    </div>
    <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-20">
      <p className="text-3xl text-cyan-400 font-medium bg-black/80 px-10 py-4 rounded-full border border-cyan-400/50 backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.3)]">
        ※メニューは日々進化します。本日の味をお楽しみください。
      </p>
    </div>
  </div>
);

// Slide 3: Shoe-free / Hidden Retreat Concept
const SlideShoeFree = () => (
  <div className="absolute inset-0 flex bg-black">
    <div className="absolute inset-0 z-0">
      <img src="/images/signage/bg_luxury_dark.svg" alt="Luxury Background" className="w-full h-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
    </div>
    <div className="relative z-10 w-full flex flex-col items-center justify-center p-16 text-center">
      <div className="max-w-5xl bg-black/50 backdrop-blur-xl border border-[#d4af37]/40 rounded-[3rem] p-20 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
        <h3 className="text-[#d4af37] text-3xl font-bold tracking-widest mb-8 uppercase">NO SHOES, NO SLIPPERS.</h3>
        <h2 className="text-6xl md:text-7xl font-bold font-noto mb-12 text-white leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          靴を脱ぐ、<br/><span className="text-[#d4af37]">非日常のカフェ＆バー。</span>
        </h2>
        <div className="space-y-8 text-3xl font-noto text-gray-200 leading-relaxed" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          <p>
            入り口で靴を脱ぎ、素足でくつろぐ。<br/>
            ここは、日常を忘れる大人の隠れ家です。
          </p>
          <p className="text-2xl text-gray-300">
            他のお客様と共有するスリッパは、あえてご用意しておりません。<br/>
            完全土足禁止だからこそ実現できる、<br/>
            圧倒的な<span className="text-white font-bold">「清潔感」</span>と<span className="text-white font-bold">「安心感」</span>。
          </p>
        </div>
        <div className="mt-12 inline-block border border-[#d4af37]/50 bg-black/60 px-10 py-5 rounded-full text-2xl font-bold text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]">
          ※小さなお子様連れのお客様にも、大変ご好評いただいております。
        </div>
      </div>
    </div>
  </div>
);

// Slide 4: Day & Night Atmosphere
const SlideDayNight = () => (
  <div className="absolute inset-0 flex">
    <div className="w-1/2 relative bg-[#fdfbf7] flex flex-col justify-center p-16 text-left">
      <div className="absolute inset-0 z-0">
        <img src="/images/signage/bg_luxury_day.svg" alt="Luxury Day Background" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <h2 className="text-7xl font-bold font-noto text-zinc-800 mb-4">DAY</h2>
        <p className="text-3xl text-[#d4af37] font-bold tracking-widest mb-8">11:00 - 17:00 <span className="text-xl">（土日祝のみ）</span></p>
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
        <p className="text-3xl text-cyan-400 font-bold tracking-widest mb-8">17:00 - 22:00 <span className="text-xl">（全日）</span></p>
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

// Slide 5: DIY & Future Tech
const SlideFutureTech = () => (
  <div className="absolute inset-0 flex bg-black">
    <div className="absolute inset-0 z-0">
      <img src="/images/signage/bg_luxury_dark.svg" alt="Luxury Background" className="w-full h-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/90"></div>
    </div>
    <div className="relative z-10 w-full flex flex-col items-center justify-center p-16 text-center">
      <div className="max-w-6xl bg-black/60 backdrop-blur-xl border border-cyan-400/40 rounded-[3rem] p-16 shadow-[0_0_60px_rgba(0,229,255,0.15)]">
        <h3 className="text-cyan-400 text-3xl font-bold tracking-widest mb-6 uppercase">CO-CREATION & SMART EXPERIENCE</h3>
        <h2 className="text-5xl md:text-6xl font-bold font-noto mb-10 text-white leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>
          お客様と創る「未完成」から、<br/><span className="text-cyan-400">近未来のオーダー体験へ。</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left mt-8">
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
            <h4 className="text-2xl text-[#d4af37] font-bold mb-4 flex items-center">
              <span className="text-3xl mr-3">🛠️</span> DIYで進化する空間
            </h4>
            <p className="text-xl text-gray-300 leading-relaxed font-noto">
              これまでの内装もDIYで作り上げてきました。<br/>
              完成されたお店ではなく、地域の皆様やお客様のご意見をいただきながら、<br/>
              日々アップデートを続ける「みんなのお店」です。
            </p>
          </div>
          
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-colors">
            <h4 className="text-2xl text-cyan-400 font-bold mb-4 flex items-center">
              <span className="text-3xl mr-3">📱</span> スマート・モバイルオーダー
            </h4>
            <p className="text-xl text-gray-300 leading-relaxed font-noto">
              ただいま、新しい注文システムを自作(DIY)で開発中。<br/>
              近隣マンションからのデリバリー注文や、<br/>
              公園の砂浜でくつろぎながらスマホでオーダーできる、<br/>
              シームレスな近未来体験を準備しています。
            </p>
          </div>
        </div>
        
        <div className="mt-12 inline-block border border-cyan-400/50 bg-black/60 px-10 py-5 rounded-full text-2xl font-bold text-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
          ※テクノロジーと手作りの温かさが融合する、新しい飲食店を目指して。
        </div>
      </div>
    </div>
  </div>
);

const slides = [
  SlideConcept,
  SlideFutureTech,
  SlideMenu,
  SlideShoeFree,
  SlideDayNight,
  SlideCTA
];

const SignageApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bizStatus, setBizStatus] = useState(getAutoBusinessStatus());
  const [menus, setMenus] = useState<any[]>([]);

  useEffect(() => {
    // スライドを8秒ごとに自動切り替え
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Trend Orderからメニューを取得
    const fetchMenus = async () => {
      const { data, error } = await trendOrderSupabase
        .from('menus')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (!error && data) {
        setMenus(data);
      }
    };
    fetchMenus();
    
    // 30秒ごとにメニューを更新（リアルタイム性を向上）
    const menuTimer = setInterval(fetchMenus, 30000);
    return () => clearInterval(menuTimer);
  }, []);

  const resolveImageUrl = (url: string | null) => {
    if (!url) return null;
    let finalUrl = url;
    if (!(url.startsWith('http') || url.startsWith('data:') || url.startsWith('/'))) {
      finalUrl = `/images/menu/${url}`;
    }
    const separator = finalUrl.includes('?') ? '&' : '?';
    return `${finalUrl}${separator}cb=${CACHE_BUSTER}`;
  };

  useEffect(() => {
    // Supabaseから設定を取得してステータスを更新する関数
    const fetchStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('signage_settings')
          .select('override_status, custom_message')
          .limit(1)
          .single();

        let newStatus = getAutoBusinessStatus(); // 基本は自動判定

        if (!error && data) {
          const override = data.override_status;
          const msg = data.custom_message;

          // 手動上書きが設定されている場合
          if (override !== 'auto') {
            if (override === 'preparing') {
              newStatus = {
                badge: "PREPARING", badgeColor: "bg-zinc-200 text-black",
                message: msg || "ただいま開店準備中です。もうしばらくお待ちください。",
                overlay: "CLOSED", overlayColor: "bg-zinc-800/90 text-white", overlayDot: "bg-red-500", isPulse: false
              };
            } else if (override === 'open_day') {
              newStatus = {
                badge: "NOW OPEN", badgeColor: "bg-[#d4af37] text-black",
                message: msg || "本日は営業中です［DAY］カフェタイムをお楽しみください。",
                overlay: "OPEN", overlayColor: "bg-[#d4af37]/90 text-black", overlayDot: "bg-black", isPulse: true
              };
            } else if (override === 'open_night') {
              newStatus = {
                badge: "NOW OPEN", badgeColor: "bg-[#00e5ff] text-black",
                message: msg || "本日は営業中です［NIGHT］バータイムをお楽しみください。",
                overlay: "OPEN", overlayColor: "bg-[#00e5ff]/90 text-black", overlayDot: "bg-black", isPulse: true
              };
            } else if (override === 'closed') {
              newStatus = {
                badge: "CLOSED", badgeColor: "bg-zinc-600 text-white",
                message: msg || "本日の営業は終了いたしました。またのお越しをお待ちしております。",
                overlay: "CLOSED", overlayColor: "bg-zinc-800/90 text-white", overlayDot: "bg-red-500", isPulse: false
              };
            }
          } else if (msg) {
            // auto設定でもカスタムメッセージだけ設定されている場合
            newStatus.message = msg;
          }
        }

        setBizStatus(newStatus);
      } catch (err) {
        console.error('Error fetching signage status:', err);
        setBizStatus(getAutoBusinessStatus()); // エラー時は自動判定にフォールバック
      }
    };

    // 初回取得
    fetchStatus();

    // 1分ごとに最新ステータスを確認
    const timer = setInterval(fetchStatus, 60000);

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
          <span className={`${bizStatus.badgeColor} px-6 py-2 rounded-full text-lg font-bold tracking-widest ${bizStatus.isPulse ? 'animate-pulse' : ''}`}>{bizStatus.badge}</span>
          <p className="text-xl text-white font-medium tracking-wide" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{bizStatus.message}</p>
        </div>
        <div className="flex items-center">
          <span className="text-gray-300 text-lg mr-3">Status:</span>
          <span className="text-white text-xl font-bold tracking-widest">EVOLVING <span className="text-[#d4af37]">●</span></span>
        </div>
      </div>

      {/* Global Overlay */}
      <div className={`absolute bottom-[104px] right-8 z-50 flex items-center space-x-3 ${bizStatus.overlayColor} backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-2xl transition-colors duration-1000`}>
        <div className={`w-4 h-4 rounded-full ${bizStatus.overlayDot} ${bizStatus.isPulse ? 'animate-pulse' : ''}`}></div>
        <span className="text-xl font-bold tracking-widest font-noto">{bizStatus.overlay}</span>
      </div>

      {/* Global Bottom Ticker (Menu Marquee) */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/95 to-transparent z-40 flex flex-col justify-end pb-4 overflow-hidden pointer-events-none">
        {menus.length > 0 && (
          <div className="flex w-max animate-[marquee_300s_linear_infinite]">
            {[...menus, ...menus, ...menus, ...menus].map((menu, idx) => (
              <div key={`${menu.id}-${idx}`} className="w-[500px] h-[120px] mx-6 bg-black/80 backdrop-blur-xl rounded-3xl border border-white/20 flex flex-row items-center overflow-hidden shadow-2xl">
                {/* Image */}
                <div className="w-40 h-full relative flex-shrink-0 bg-zinc-900">
                  {menu.status === 'sold_out' && (
                    <div className="absolute inset-0 bg-black/80 z-20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-red-500 font-black text-sm border-2 border-red-500 px-2 py-1 rounded bg-black/50 transform -rotate-12">SOLD OUT</span>
                    </div>
                  )}
                  {menu.status === 'preparing' && (
                    <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-yellow-500 font-black text-sm border-2 border-yellow-500 px-2 py-1 rounded bg-black/40 transform -rotate-12">PREPARING</span>
                    </div>
                  )}
                  {resolveImageUrl(menu.image_url) ? (
                    <img 
                      src={resolveImageUrl(menu.image_url)!} 
                      alt={menu.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent && !parent.querySelector('.fallback-icon')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-icon text-5xl flex items-center justify-center w-full h-full';
                          fallback.innerText = '🍽️';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🍽️</div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 p-5 flex flex-col justify-center">
                  <h4 className="text-white font-bold text-xl line-clamp-1 leading-tight">{fixMenuName(menu.name)}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#d4af37] font-black text-2xl">¥{menu.price.toLocaleString()}</span>
                    {menu.status === 'available' && <span className="text-green-400 text-sm font-bold border border-green-500/30 px-3 py-1 rounded-full bg-green-500/10">AVAILABLE</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default SignageApp;