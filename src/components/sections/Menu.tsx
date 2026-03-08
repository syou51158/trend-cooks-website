import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';
import { Wine, Star, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const parallaxOffset = useParallax(0.1);
  const { t, i18n } = useTranslation();
  const isJa = i18n.language?.startsWith('ja');

  // 昼間営業 - 創作ランチプレート（基本メニュー）
  const lunchMenu = [
    {
      name: '韓国ヤンニョムチキンプレート',
      nameEn: 'Korean Yangnyeom Chicken Plate',
      price: '1,300円',
      description: '定番のピリ辛ヤンニョムチキンを骨なしで仕上げ、自家製チキンム（チキン大根＝大根のピクルス）を添えた一皿。SNS映え抜群の赤いソースが特徴',
      descriptionEn: 'Boneless spicy yangnyeom chicken with house-made chicken-mu (pickled radish). Eye-catching red sauce.',
      popular: true,
      category: 'korean'
    },
    {
      name: 'サーモン＆アボカド丼風ボウル',
      nameEn: 'Salmon & Avocado Rice Bowl',
      price: '1,000円',
      description: '新鮮なサーモンとアボカドをジャスミンライスの上に盛り付けた、ハワイアン風ポケボウル。胡麻醤油ドレッシングでヘルシー志向にも対応',
      descriptionEn: 'Fresh salmon and avocado over jasmine rice, Hawaiian poke style with sesame-soy dressing.',
      popular: true,
      category: 'healthy'
    },
    {
      name: 'バスクチーズケーキ風クロワッサンワッフル',
      nameEn: 'Basque Cheesecake-style Croissant Waffle',
      price: '650円',
      description: '話題のバスクチーズケーキ風味のクリームをサンドしたクロワッサン生地ワッフル。外はサクサク、中はとろり食感',
      descriptionEn: 'Crispy croissant waffle filled with creamy Basque cheesecake flavor.',
      popular: false,
      category: 'dessert'
    },
    {
      name: 'プルコギ風和牛プレート',
      nameEn: 'Bulgogi-style Wagyu Plate',
      price: '1,480円',
      description: '韓国プルコギ風に味付けした近江牛を使用。ナムル3種、キムチ、温泉卵を添えたボリューム満点プレート',
      descriptionEn: 'Omi wagyu seasoned bulgogi-style with 3 namul, kimchi, and a soft-boiled egg.',
      popular: false,
      category: 'premium'
    }
  ];

  // 近江牛プレミアムメニュー（インバウンド向け基本コース）
  const premiumMenu = [
    {
      name: '近江牛特選炙り寿司３貫セット',
      nameEn: 'Omi Wagyu Seared Sushi (3 pieces)',
      price: '2,800円',
      description: 'A5ランク近江牛の希少部位を使用した炙り寿司。わさび醤油と柚子胡椒で',
      descriptionEn: 'A5 Omi wagyu rare cuts lightly seared. Served with wasabi soy and yuzu kosho.',
      popular: true
    },
    {
      name: '近江牛プレミアムステーキ（150g）',
      nameEn: 'Omi Wagyu Premium Steak (150g)',
      price: '7,780円',
      description: 'A5等級近江牛サーロインのステーキ。特製和風ソースと京野菜のグリルを添えて',
      descriptionEn: 'A5 sirloin steak with house Japanese sauce and grilled Kyoto vegetables.',
      popular: true
    },
    {
      name: '近江牛炙り丼〜特上〜',
      nameEn: 'Deluxe Omi Wagyu Seared Beef Bowl',
      price: '3,900円',
      description: 'A5近江牛を炙って近江米の上に盛り付け。温泉卵・海苔・わさびを添えて',
      descriptionEn: 'A5 wagyu seared over Omi rice with soft-boiled egg, nori, and wasabi.',
      popular: false
    }
  ];

  // スイーツ・デザート
  const sweets = [
    {
      name: 'イチゴ飴',
      nameEn: 'Candied Strawberries',
      price: '800円',
      description: '宝石のように美しく仕上げたイチゴ飴。SNS映え間違いなしの逸品',
      descriptionEn: 'Beautiful jewel-like candied strawberries. Perfect for social posts.'
    },
    {
      name: '焼き立てクロワッサン生地ワッフル',
      nameEn: 'Fresh-baked Croissant Waffle',
      price: '300円',
      description: 'サクサクのクロワッサン生地で焼き上げたワッフル',
      descriptionEn: 'Crispy croissant dough waffle, baked to order.'
    },
    {
      name: '季節フルーツトッピング',
      nameEn: 'Seasonal Fruit Topping',
      price: '+200円〜',
      description: 'ワッフルに季節のフルーツをたっぷりトッピング',
      descriptionEn: 'Add plenty of seasonal fruits to your waffle.'
    }
  ];

  // 夜間営業メニュー
  const dinnerMenu = [
    {
      name: 'おつまみ小皿メニュー',
      nameEn: 'Small Plates for Drinks',
      price: '500〜800円',
      description: '和牛ジャーキー、チーズ盛合せ、地元野菜のピクルスなど多彩なおつまみをご用意',
      descriptionEn: 'Wagyu jerky, cheese selection, local vegetable pickles, and more.',
      popular: true
    },
    {
      name: 'プロジェクター演出',
      nameEn: 'Projector Experience',
      price: '—',
      description: 'スポーツ観戦、YouTube映像、琵琶湖景色などを投影してムード演出',
      descriptionEn: 'Sports viewing, YouTube videos, or Lake Biwa scenery projected to set the mood.',
      popular: false
    }
  ];

  // ドリンクメニュー
  const drinks = [
    { name: 'クラフトビール各種', nameEn: 'Craft Beers', price: '650〜800円', category: 'beer' },
    { name: '地酒（グラス）', nameEn: 'Local Sake (glass)', price: '750〜1,200円', category: 'sake' },
    { name: 'スムージー・ジュース各種', nameEn: 'Smoothies & Juices', price: '400〜600円', category: 'juice' },
    { name: 'コーヒー（ホット／アイス）', nameEn: 'Coffee (hot/iced)', price: '350〜450円', category: 'coffee' },
    { name: '手引きコーヒー', nameEn: 'Hand-drip Coffee', price: '650円', category: 'coffee' }
  ];

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
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              {t('menu.title')}
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
              {t('menu.subtitle')}
            </p>
          </div>
        </AnimatedElement>

        {/* 昼間営業 */}
        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInLeft" delay={200}>
            <div className="text-center mb-12 xl:mb-16 2xl:mb-20">
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto">
                {t('menu.sections.lunch.title')}
              </h3>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
                {t('menu.sections.lunch.desc')}
              </p>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {lunchMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={250 + index * 30}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                          {isJa ? item.name : (item.nameEn || item.name)}
                          {item.nameEn && item.name && (
                            <span className="block text-xs xl:text-sm 2xl:text-base text-gray-500 font-normal leading-snug">
                              {isJa ? item.nameEn : item.name}
                            </span>
                          )}
                        </h4>
                        {item.popular && (
                          <Badge className="bg-trend-accent text-white">
                            <Star size={12} className="mr-1" />
                            {t('menu.badges.popular')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm xl:text-base 2xl:text-lg font-noto mb-4 flex-grow leading-relaxed">
                      {isJa ? item.description : (item.descriptionEn || item.description)}
                      {item.descriptionEn && item.description && (
                        <span className="block text-[11px] xl:text-sm 2xl:text-base text-gray-400 mt-1 leading-snug">
                          {isJa ? item.descriptionEn : item.description}
                        </span>
                      )}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-trend-accent xl:text-lg 2xl:text-xl font-bold font-noto">
                        {item.price}
                      </span>
                      <div className="w-8 h-8 bg-trend-accent/10 rounded-full flex items-center justify-center group-hover:bg-trend-accent/20 transition-colors duration-300">
                        <span className="text-trend-accent text-sm">+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* プレミアム近江牛メニュー */}
        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInRight" delay={350}>
            <div className="text-center mb-12 xl:mb-16 2xl:mb-20">
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto">
                {t('menu.sections.premium.title')}
              </h3>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
                {t('menu.sections.premium.desc')}
              </p>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16">
            {premiumMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={400 + index * 30}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full bg-gradient-to-br from-amber-50 to-orange-50">
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                          {isJa ? item.name : (item.nameEn || item.name)}
                          {item.nameEn && item.name && (
                            <span className="block text-xs xl:text-sm 2xl:text-base text-gray-500 font-normal leading-snug">
                              {isJa ? item.nameEn : item.name}
                            </span>
                          )}
                        </h4>
                        {item.popular && (
                          <Badge className="bg-amber-500 text-white">
                            <Crown size={12} className="mr-1" />
                            {t('menu.badges.special')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm xl:text-base 2xl:text-lg font-noto mb-4 flex-grow leading-relaxed">
                      {isJa ? item.description : (item.descriptionEn || item.description)}
                      {item.descriptionEn && item.description && (
                        <span className="block text-[11px] xl:text-sm 2xl:text-base text-gray-400 mt-1 leading-snug">
                          {isJa ? item.descriptionEn : item.description}
                        </span>
                      )}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-amber-600 xl:text-lg 2xl:text-xl font-bold font-noto">
                        {item.price}
                      </span>
                      <div className="w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                        <Crown className="text-amber-600 text-sm" size={16} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* スイーツ・デザート */}
        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInUp" delay={500}>
            <div className="text-center mb-12 xl:mb-16 2xl:mb-20">
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto">
                {t('menu.sections.sweets.title')}
              </h3>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10">
            {sweets.map((item, index) => (
              <AnimatedElement key={index} animation="fadeInUp" delay={550 + index * 30}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <CardContent className="p-4 xl:p-6 2xl:p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-base xl:text-lg 2xl:text-xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                        {isJa ? item.name : (item.nameEn || item.name)}
                        {item.nameEn && item.name && (
                          <span className="block text-xs xl:text-sm 2xl:text-base text-gray-500 font-normal leading-snug">
                            {isJa ? item.nameEn : item.name}
                          </span>
                        )}
                      </h5>
                    </div>
                    <p className="text-gray-600 text-xs xl:text-sm 2xl:text-base font-noto mb-3 leading-relaxed">
                      {isJa ? item.description : (item.descriptionEn || item.description)}
                      {item.descriptionEn && item.description && (
                        <span className="block text-[11px] xl:text-sm 2xl:text-base text-gray-400 mt-1 leading-snug">
                          {isJa ? item.descriptionEn : item.description}
                        </span>
                      )}
                    </p>
                    <span className="text-trend-accent font-bold font-noto">
                      {item.price}
                    </span>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* 夜間営業 */}
        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInLeft" delay={650}>
            <div className="text-center mb-12 xl:mb-16 2xl:mb-20">
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto">
                {t('menu.sections.dinner.title')}
              </h3>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
                {t('menu.sections.dinner.desc')}
              </p>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-6 xl:gap-8 2xl:gap-10">
            {dinnerMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={700 + index * 30}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                          {isJa ? item.name : (item.nameEn || item.name)}
                          {item.nameEn && item.name && (
                            <span className="block text-xs xl:text-sm 2xl:text-base text-gray-500 font-normal leading-snug">
                              {isJa ? item.nameEn : item.name}
                            </span>
                          )}
                        </h4>
                        {item.popular && (
                          <Badge className="bg-trend-accent text-white">
                            <Star size={12} className="mr-1" />
                            {t('menu.badges.popular')}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm xl:text-base 2xl:text-lg font-noto mb-4 flex-grow leading-relaxed">
                      {isJa ? item.description : (item.descriptionEn || item.description)}
                      {item.descriptionEn && item.description && (
                        <span className="block text-[11px] xl:text-sm 2xl:text-base text-gray-400 mt-1 leading-snug">
                          {isJa ? item.descriptionEn : item.description}
                        </span>
                      )}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-trend-accent xl:text-lg 2xl:text-xl font-bold font-noto">
                        {item.price}
                      </span>
                      <div className="w-8 h-8 bg-trend-accent/10 rounded-full flex items-center justify-center group-hover:bg-trend-accent/20 transition-colors duration-300">
                        <span className="text-trend-accent text-sm">+</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* ドリンクメニュー */}
        <AnimatedElement animation="fadeInUp" delay={850}>
          <Card className="border-none shadow-lg mb-12 xl:mb-16 2xl:mb-20">
            <CardHeader className="bg-gradient-to-r from-trend-accent to-trend-text text-white">
              <CardTitle className="text-2xl xl:text-3xl 2xl:text-4xl font-noto flex items-center">
                <Wine className="mr-3" size={32} />
                {t('menu.sections.drinks.title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 xl:p-8 2xl:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 2xl:gap-8">
                {drinks.map((drink, index) => (
                  <div key={index} className="flex justify-between items-center p-3 xl:p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-trend-accent/5 transition-colors duration-300 group">
                    <span className="text-trend-text xl:text-lg 2xl:text-xl font-noto group-hover:text-trend-accent transition-colors duration-300">{isJa ? drink.name : (drink.nameEn || drink.name)}
                      {drink.nameEn && drink.name && (
                        <span className="block text-xs xl:text-sm 2xl:text-base text-gray-500 font-normal leading-snug">
                          {isJa ? drink.nameEn : drink.name}
                        </span>
                      )}
                    </span>
                    <span className="text-trend-accent xl:text-lg 2xl:text-xl font-bold font-noto">{drink.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* 将来展開 */}
        <AnimatedElement animation="fadeInUp" delay={900}>
          <div className="bg-gradient-to-r from-trend-accent/5 to-trend-accent/10 rounded-lg p-8 xl:p-12 2xl:p-16 text-center">
            <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-6 xl:mb-8 2xl:mb-10 font-noto">
              {t('menu.future.title')}
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
