import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';
import { Utensils, Coffee, Wine, Star } from 'lucide-react';

const Menu = () => {
  const parallaxOffset = useParallax(0.1);

  const lunchMenu = [
    {
      name: '韓国ヤンニョムチキンプレート',
      price: '1,300円',
      description: '骨なし鶏もも肉を特製ヤンニョムソースで絡め、自家製キムチ＆大根ナムルを添えた人気プレート。',
      popular: true,
      category: 'korean'
    },
    {
      name: 'サーモン＆アボカドボウル',
      price: '1,200円',
      description: 'ノルウェー産サーモンと完熟アボカドを柚子醤油ドレッシングで和えたヘルシーボウル。',
      popular: false,
      category: 'healthy'
    },
    {
      name: '近江牛炙り寿司３貫',
      price: '2,200円',
      description: 'A5ランク近江牛を軽く炙り、わさび醤油＆柚子胡椒で味付けした贅沢握り寿司。',
      popular: true,
      category: 'premium'
    },
    {
      name: 'トリュフカルボナーラ',
      price: '1,680円',
      description: '本格イタリア産トリュフと濃厚卵黄、パルミジャーノが織りなす究極のパスタ。',
      popular: false,
      category: 'italian'
    },
    {
      name: 'エビとアボカドのタコス（3個）',
      price: '1,450円',
      description: 'プリプリのエビとクリーミーなアボカド、サルサソースが絶妙にマッチ。',
      popular: false,
      category: 'mexican'
    },
    {
      name: 'ガパオライス',
      price: '1,250円',
      description: 'タイの定番料理を日本人好みにアレンジ。目玉焼きとジャスミンライス付き。',
      popular: true,
      category: 'thai'
    }
  ];

  const sweets = [
    {
      name: 'バブルワッフル',
      price: '750円',
      description: 'クロワッサン生地ワッフルに季節フルーツとアイスをトッピングしたSNS映えスイーツ。',
      popular: true
    },
    {
      name: 'ティラミス',
      price: '680円',
      description: 'マスカルポーネチーズとエスプレッソの本格イタリアンデザート。'
    },
    {
      name: '抹茶チーズケーキ',
      price: '720円',
      description: '京都産抹茶を使用したなめらかベイクドチーズケーキ。'
    },
    {
      name: 'フルーツパフェ',
      price: '980円',
      description: '季節のフルーツとバニラアイス、生クリームの贅沢パフェ。'
    }
  ];

  const dinnerMenu = [
    {
      name: '近江牛スキレットステーキ（100g）',
      price: '2,500円',
      description: '熱々スキレットで供する近江牛サーロイン。ガーリックバターソース＆ロースト野菜添え。',
      popular: true,
      category: 'premium'
    },
    {
      name: '和牛タタキカルパッチョ',
      price: '1,500円',
      description: '特製ポン酢ジュレとガーリックチップで仕上げた、さっぱりおつまみ。',
      popular: false,
      category: 'premium'
    },
    {
      name: 'スモークサーモンピザ',
      price: '1,800円',
      description: 'クリスピー生地にスモークサーモン、ケイパー、クリームチーズをトッピング。',
      popular: false,
      category: 'pizza'
    },
    {
      name: 'アヒージョ盛り合わせ',
      price: '1,680円',
      description: 'エビ、マッシュルーム、砂肝をガーリックオイルで煮込んだスペイン料理。',
      popular: true,
      category: 'spanish'
    },
    {
      name: 'チーズフォンデュ',
      price: '2,200円',
      description: '3種チーズブレンドのとろ〜りフォンデュ。野菜とパンでお楽しみください。',
      popular: false,
      category: 'cheese'
    },
    {
      name: 'おつまみ盛り合わせ',
      price: '2,200円',
      description: 'ヤンニョムチキンミニ・チーズボール・ソーセージ・オリーブなど6種盛り。',
      popular: true,
      category: 'mixed'
    }
  ];

  const drinks = [
    { name: 'IPAクラフトビール', price: '850円', category: 'beer' },
    { name: 'ピンクいちごクリームラッシー', price: '650円', category: 'specialty' },
    { name: '抹茶エスプレッソトニック', price: '780円', category: 'specialty' },
    { name: 'ノンアル柚子ソーダ', price: '600円', category: 'non-alcohol' },
    { name: '地酒「浪乃音 純米吟醸」（グラス）', price: '900円', category: 'sake' },
    { name: 'レモンサワー', price: '550円', category: 'sour' },
    { name: 'ハイボール', price: '500円', category: 'whiskey' },
    { name: 'カシスオレンジ', price: '650円', category: 'cocktail' },
    { name: 'モヒート', price: '750円', category: 'cocktail' },
    { name: 'ワイン（赤/白）グラス', price: '700円', category: 'wine' }
  ];

  const drinkPlans = [
    {
      name: '飲み放題プラン（90分）',
      price: '2,500円',
      description: 'ビール・ハイボール・カクテル・日本酒など30種類以上が飲み放題！'
    },
    {
      name: 'プレミアム飲み放題（90分）',
      price: '3,500円',
      description: 'クラフトビール・プレミアム焼酎・ワインも含む豪華プラン！'
    }
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
        <AnimatedElement animation="fadeInUp" delay={200}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              メニュー
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
              トレンドを取り入れた創作料理とこだわりのドリンクをお楽しみください
            </p>
          </div>
        </AnimatedElement>

        {/* Lunch Section */}
        <div className="mb-20 xl:mb-24 2xl:mb-28">
          <AnimatedElement animation="fadeInLeft" delay={300}>
            <div className="flex items-center justify-center mb-12 xl:mb-16 2xl:mb-20">
              <Utensils className="mr-3 text-trend-accent" size={32} />
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-text font-noto">
                昼の創作ランチ（11:00–17:00）
              </h3>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12 mb-12">
            {lunchMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={400 + index * 100}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                          {item.name}
                        </h4>
                        {item.popular && (
                          <Badge className="bg-trend-accent text-white">
                            <Star size={12} className="mr-1" />
                            人気
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm xl:text-base 2xl:text-lg font-noto mb-4 flex-grow">
                      {item.description}
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

          {/* Sweets Section */}
          <AnimatedElement animation="fadeInUp" delay={800}>
            <div className="flex items-center justify-center mb-8 xl:mb-10 2xl:mb-12">
              <Coffee className="mr-3 text-trend-accent" size={28} />
              <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-trend-text font-noto">
                スイーツ＆デザート
              </h4>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {sweets.map((item, index) => (
              <AnimatedElement key={index} animation="fadeInUp" delay={900 + index * 100}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                  <CardContent className="p-4 xl:p-6 2xl:p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-base xl:text-lg 2xl:text-xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                        {item.name}
                      </h5>
                      {item.popular && (
                        <Badge className="bg-trend-accent text-white text-xs">
                          人気
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs xl:text-sm 2xl:text-base font-noto mb-3">
                      {item.description}
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

        {/* Dinner Section */}
        <div className="mb-20 xl:mb-24 2xl:mb-28">
          <AnimatedElement animation="fadeInRight" delay={1200}>
            <div className="flex items-center justify-center mb-12 xl:mb-16 2xl:mb-20">
              <Wine className="mr-3 text-trend-accent" size={32} />
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-text font-noto">
                夜のバー・おつまみ（17:00–23:30）
              </h3>
            </div>
          </AnimatedElement>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12">
            {dinnerMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={1300 + index * 100}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold text-trend-text font-noto group-hover:text-trend-accent transition-colors duration-300">
                          {item.name}
                        </h4>
                        {item.popular && (
                          <Badge className="bg-trend-accent text-white">
                            <Star size={12} className="mr-1" />
                            人気
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm xl:text-base 2xl:text-lg font-noto mb-4 flex-grow">
                      {item.description}
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

        {/* Drinks Section */}
        <AnimatedElement animation="fadeInUp" delay={1800}>
          <Card className="border-none shadow-lg mb-12 xl:mb-16 2xl:mb-20">
            <CardHeader className="bg-gradient-to-r from-trend-accent to-trend-text text-white">
              <CardTitle className="text-2xl xl:text-3xl 2xl:text-4xl font-noto flex items-center">
                <Wine className="mr-3" size={32} />
                ドリンクメニュー
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 xl:p-8 2xl:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-6 2xl:gap-8">
                {drinks.map((drink, index) => (
                  <div key={index} className="flex justify-between items-center p-3 xl:p-4 2xl:p-5 bg-gray-50 rounded-lg hover:bg-trend-accent/5 transition-colors duration-300 group">
                    <span className="text-trend-text xl:text-lg 2xl:text-xl font-noto group-hover:text-trend-accent transition-colors duration-300">{drink.name}</span>
                    <span className="text-trend-accent xl:text-lg 2xl:text-xl font-bold font-noto">{drink.price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </AnimatedElement>

        {/* Drink Plans */}
        <AnimatedElement animation="scaleIn" delay={2000}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 2xl:gap-16">
            {drinkPlans.map((plan, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <CardHeader className={`${index === 0 ? 'bg-trend-accent' : 'bg-gradient-to-r from-trend-accent to-trend-text'} text-white`}>
                  <CardTitle className="text-xl xl:text-2xl 2xl:text-3xl font-noto flex items-center justify-between">
                    {plan.name}
                    {index === 1 && <Badge className="bg-white text-trend-accent">おすすめ</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 xl:p-8 2xl:p-10 text-center">
                  <div className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-trend-accent mb-4 font-noto">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                    {plan.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Menu;
