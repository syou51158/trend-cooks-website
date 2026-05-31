import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';
import { useTranslation } from 'react-i18next';
import { trendOrderSupabase, fixMenuName } from '@/lib/trendOrderClient';
import { SafeImage } from '../ui/SafeImage';


const CACHE_BUSTER = Date.now();

const Menu = () => {
  const parallaxOffset = useParallax(0.1);
  const { t, i18n } = useTranslation();
  const isJa = i18n.language?.startsWith('ja');

  // Trend Orderからのリアルタイムメニュー
  const [menusByCategory, setMenusByCategory] = useState<{category: any, menus: any[]}[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      // メニューを取得
      const { data: menuData, error: menuError } = await trendOrderSupabase
        .from('menus')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      // カテゴリを取得
      const { data: categoryData, error: categoryError } = await trendOrderSupabase
        .from('menu_categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      
      if (!menuError && !categoryError && menuData && categoryData) {
        // カテゴリごとにメニューをグループ化
        const grouped = categoryData.map(category => {
          return {
            category,
            menus: menuData.filter(menu => menu.category_id === category.id)
          };
        }).filter(group => group.menus.length > 0);

        // カテゴリに属さないメニュー（その他）
        const uncategorizedMenus = menuData.filter(menu => !menu.category_id || !categoryData.some(c => c.id === menu.category_id));
        if (uncategorizedMenus.length > 0) {
          grouped.push({
            category: { id: 'uncategorized', name: 'その他' },
            menus: uncategorizedMenus
          });
        }

        setMenusByCategory(grouped);
      }
    };
    fetchMenus();
  }, []);

  const getBaseSegment = () => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/trendcooks')) {
      return '/trendcooks';
    }
    return '';
  };

  const resolveImageUrl = (url: string | null) => {
    if (!url) return null;
    let finalUrl = url;
    
    if (url.startsWith('http') || url.startsWith('data:')) {
      // 既存の絶対URLやData URIはそのまま
    } else if (url.startsWith('/menu-images/') || url.startsWith('/drink-images/') || url.startsWith('/beer-images/')) {
      // Trend Orderのサーバーから直接取得する
      finalUrl = `https://trend-order-508416724601.asia-northeast1.run.app${url}`;
    } else if (!url.startsWith('/')) {
      finalUrl = `/images/menu/${url}`;
    }

    if (!finalUrl.startsWith('http') && !finalUrl.startsWith('data:')) {
      // 本番環境のサブディレクトリ (/trendcooks) 配下で動いている場合、先頭がスラッシュから始まる絶対パスであれば自動補正
      const base = getBaseSegment();
      if (base && finalUrl.startsWith('/') && !finalUrl.startsWith(base)) {
        finalUrl = `${base}${finalUrl}`;
      }
    }

    const separator = finalUrl.includes('?') ? '&' : '?';
    return `${finalUrl}${separator}cb=${CACHE_BUSTER}`;
  };



  // 昼間営業 - 創作ランチプレート（基本メニュー）
  // 削除済

  // 将来検討中の創作ランチメニュー
  const futureMenu = [
    { name: 'タピオカミルクティー風パンケーキ', nameEn: 'Bubble Milk Tea-style Pancakes', price: '880円' },
    { name: 'チーズタッカルビ風グリルチキンプレート', nameEn: 'Cheese Dak-galbi-style Grilled Chicken Plate', price: '1,280円' },
    { name: '雲ドラ（雲みたいなドラ焼き）', nameEn: 'Cloud Dora-yaki (fluffy like a cloud)', price: '480円' },
    { name: 'マリトッツォ風フレンチトースト', nameEn: 'Maritozzo-style French Toast', price: '750円' },
    { name: '台湾カステラ風スフレパンケーキ', nameEn: 'Taiwan Castella-style Soufflé Pancakes', price: '680円' },
    { name: 'TikTokバイラル・レインボーサンド', nameEn: 'TikTok Viral Rainbow Sandwich', price: '980円' },
    { name: 'ダルゴナコーヒーパンケーキ', nameEn: 'Dalgona Coffee Pancakes', price: '720円' },
    { name: 'インスタ映え♪ユニコーンパスタ', nameEn: 'Instagrammable Unicorn Pasta', price: '1,180円' }
  ];

  // SNS話題のトレンドメニュー
  // 削除済

  // 将来検討中の高級近江牛メニュー
  const futurePremiumMenu = [
    { name: '近江牛特選炙り寿司５貫セット', nameEn: 'Omi Wagyu Seared Sushi (5 pieces)', price: '3,800円' },
    { name: '近江牛プレミアムステーキ200g', nameEn: 'Omi Wagyu Premium Steak 200g', price: '9,800円' },
    { name: '近江牛ユッケ風カルパッチョ', nameEn: 'Omi Wagyu Yukhoe-style Carpaccio', price: '3,200円' },
    { name: '近江牛すき焼き風ミニ鍋', nameEn: 'Omi Wagyu Sukiyaki-style Mini Hotpot', price: '3,600円' },
    { name: '近江牛しゃぶしゃぶ御膳', nameEn: 'Omi Wagyu Shabu-shabu Set', price: '4,200円' },
    { name: '近江牛ミニバーガー〜WAGYU PREMIUM〜', nameEn: 'Omi Wagyu Mini Burgers — WAGYU PREMIUM', price: '2,400円' },
    { name: '近江牛石板焼き〜目の前調理〜', nameEn: 'Omi Wagyu Hot Stone Grill — Cooked at Your Table', price: '4,800円' },
    { name: '近江牛懐石風コース〜雅〜', nameEn: 'Omi Wagyu Kaiseki-style Course — Miyabi', price: '12,500円' },
    { name: '近江牛サーロイン特厚切り300g', nameEn: 'Omi Wagyu Extra-thick Sirloin 300g', price: '17,200円' },
    { name: '近江牛オマカセ盛り合わせ（２〜３人前 300g）', nameEn: "Chef's Selection Omi Wagyu (2–3 servings, 300g)", price: '18,800円' }
  ];

  // ドリンク
  // 削除済

  return (
    <section id="menu" className="py-20 xl:py-24 2xl:py-32 bg-white relative overflow-hidden">
      {/* Floating background elements */}
      <div
        className="absolute top-20 right-10 w-32 h-32 bg-trend-accent/5 rounded-full blur-2xl"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
      />
      <div
        className="absolute bottom-40 left-20 w-48 h-48 bg-trend-accent/3 rounded-full blur-3xl"
        style={{ transform: `translateY(${parallaxOffset * -0.6}px)` }}
      />

      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <div className="inline-block bg-amber-100 border border-amber-300 text-amber-800 px-6 py-3 rounded-full mb-6 font-bold shadow-sm">
              🚀 現在、メニューはプロトタイプも含め日々進化中です！
            </div>
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              {t('menu.title')}
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto max-w-3xl mx-auto">
              リアルタイムで提供中のメニューと、今後の進化をお楽しみください。
            </p>
          </div>
        </AnimatedElement>

        {/* リアルタイム提供中メニュー（Trend Order連携） */}
        <div className="mb-24 xl:mb-32 2xl:mb-40">
          <AnimatedElement animation="fadeInUp" delay={200}>
            <div className="text-center mb-12 xl:mb-16 2xl:mb-20 relative">
              <h3 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto inline-block relative">
                現在提供中のメニュー
                <span className="absolute -top-6 -right-12 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">LIVE!</span>
              </h3>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
                厨房とリアルタイムで連動しています。（※売り切れ・準備中の場合があります）
              </p>
            </div>
          </AnimatedElement>

          {menusByCategory.length > 0 ? (
            <div className="space-y-16 xl:space-y-20">
              {menusByCategory.map((group) => (
                <div key={group.category.id} className="menu-category-group">
                  <AnimatedElement animation="fadeInUp" delay={100}>
                    <h4 className="text-2xl xl:text-3xl font-bold text-trend-text mb-8 border-b-2 border-trend-accent/20 pb-4 inline-block font-noto">
                      {group.category.name}
                    </h4>
                  </AnimatedElement>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
                    {group.menus.map((item, index) => (
                      <AnimatedElement key={item.id || index} animation="scaleIn" delay={150 + index * 50}>
                        <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group h-full overflow-hidden flex flex-col bg-white">
                          <div className="relative h-56 xl:h-64 2xl:h-72 w-full overflow-hidden bg-zinc-100 flex items-center justify-center">
                            {item.status === 'sold_out' && (
                              <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center backdrop-blur-[2px]">
                                <span className="text-red-500 font-black text-2xl border-4 border-red-500 px-4 py-1 rounded bg-white/90 transform -rotate-12 shadow-lg">SOLD OUT</span>
                              </div>
                            )}
                            {item.status === 'preparing' && (
                              <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center backdrop-blur-[2px]">
                                <span className="text-yellow-500 font-black text-2xl border-4 border-yellow-500 px-4 py-1 rounded bg-white/90 transform -rotate-12 shadow-lg">PREPARING</span>
                              </div>
                            )}
                            <SafeImage
                              src={resolveImageUrl(item.image_url)}
                              alt={item.name}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                          <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-xl xl:text-2xl font-bold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300 leading-tight">
                                {fixMenuName(item.name)}
                              </h4>
                            </div>
                            {item.description && (
                              <p className="text-gray-600 text-sm xl:text-base font-noto mb-6 flex-grow leading-relaxed">
                                {item.description}
                              </p>
                            )}
                            <div className="flex justify-between items-end mt-auto pt-4 border-t border-gray-100">
                              <span className="text-trend-accent text-2xl xl:text-3xl font-black font-noto">
                                ¥{item.price.toLocaleString()}
                              </span>
                              {item.status === 'available' && (
                                <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200">
                                  提供可能
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedElement>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-200">
              <p className="text-2xl text-gray-400 font-noto animate-pulse">メニュー情報を取得中...</p>
            </div>
          )}
        </div>


        {/* 将来展開 */}
        <AnimatedElement animation="fadeInUp" delay={900}>
          <div className="bg-gradient-to-r from-trend-accent/5 to-trend-accent/10 rounded-lg p-8 xl:p-12 2xl:p-16 text-center mt-16">
            <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-6 xl:mb-8 2xl:mb-10 font-noto">
              その他のアイデア・構想
            </h3>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-700 font-noto mb-8 xl:mb-12 2xl:mb-16">
              {t('menu.future.desc')}
            </p>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="scaleIn" delay={950}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16">
            {/* 追加検討中の創作ランチメニュー */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="text-xl xl:text-2xl 2xl:text-3xl font-noto">
                  {t('menu.future.lunchTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 xl:p-6 2xl:p-8">
                <div className="space-y-3">
                  {futureMenu.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 hover:bg-blue-50 rounded transition-colors duration-200">
                      <span className="text-gray-700 font-noto text-sm xl:text-base">
                        {isJa ? item.name : (item.nameEn || item.name)}
                        {item.nameEn && item.name && (
                          <span className="ml-2 text-xs xl:text-sm text-gray-500">({isJa ? item.nameEn : item.name})</span>
                        )}
                      </span>
                      <span className="text-blue-600 font-bold font-noto text-sm xl:text-base">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 将来検討中の高級近江牛メニュー */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-amber-500 text-white">
                <CardTitle className="text-xl xl:text-2xl 2xl:text-3xl font-noto">
                  {t('menu.future.premiumTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 xl:p-6 2xl:p-8">
                <div className="space-y-3">
                  {futurePremiumMenu.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 hover:bg-amber-50 rounded transition-colors duration-200">
                      <span className="text-gray-700 font-noto text-sm xl:text-base">
                        {isJa ? item.name : (item.nameEn || item.name)}
                        {item.nameEn && item.name && (
                          <span className="ml-2 text-xs xl:text-sm text-gray-500">({isJa ? item.nameEn : item.name})</span>
                        )}
                      </span>
                      <span className="text-amber-600 font-bold font-noto text-sm xl:text-base">{item.price}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedElement>

        <div className="text-center mt-8 xl:mt-12 2xl:mt-16">
          <p className="text-gray-500 font-noto text-sm xl:text-base">
            {t('menu.disclaimer')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
