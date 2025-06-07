
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Menu = () => {
  const lunchMenu = [
    {
      name: '韓国ヤンニョムチキンプレート',
      price: '1,300円',
      description: '骨なし鶏もも肉を特製ヤンニョムソースで絡め、自家製キムチ＆大根ナムルを添えた人気プレート。'
    },
    {
      name: 'サーモン＆アボカドボウル',
      price: '1,200円',
      description: 'ノルウェー産サーモンと完熟アボカドを柚子醤油ドレッシングで和えたヘルシーボウル。'
    },
    {
      name: '近江牛炙り寿司３貫',
      price: '2,200円',
      description: 'A5ランク近江牛を軽く炙り、わさび醤油＆柚子胡椒で味付けした贅沢握り寿司。'
    },
    {
      name: 'バブルワッフル',
      price: '750円',
      description: 'クロワッサン生地ワッフルに季節フルーツとアイスをトッピングしたSNS映えスイーツ。'
    }
  ];

  const dinnerMenu = [
    {
      name: '近江牛スキレットステーキ（100g）',
      price: '2,500円',
      description: '熱々スキレットで供する近江牛サーロイン。ガーリックバターソース＆ロースト野菜添え。'
    },
    {
      name: '和牛タタキカルパッチョ',
      price: '1,500円',
      description: '特製ポン酢ジュレとガーリックチップで仕上げた、さっぱりおつまみ。'
    },
    {
      name: 'おつまみ盛り合わせ',
      price: '2,200円',
      description: 'ヤンニョムチキンミニ・チーズボール・ソーセージ'
    },
    {
      name: '飲み放題プラン（90分）',
      price: '2,500円〜',
      description: 'ビール・ハイボール・カクテル・日本酒など多彩に楽しめるプラン。'
    }
  ];

  const drinks = [
    { name: 'IPAクラフトビール', price: '850円' },
    { name: 'ピンクいちごクリームラッシー', price: '650円' },
    { name: '抹茶エスプレッソトニック', price: '780円' },
    { name: 'ノンアル柚子ソーダ', price: '600円' },
    { name: '地酒「浪乃音 純米吟醸」（グラス）', price: '900円' }
  ];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-trend-text mb-4 font-noto">
            メニュー
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-trend-accent text-white">
              <CardTitle className="text-2xl font-noto">
                昼の創作ランチ・スイーツ（11:00–17:00）
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {lunchMenu.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-trend-text font-noto">
                        {item.name}
                      </h3>
                      <span className="text-trend-accent font-bold font-noto">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm font-noto">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="bg-trend-text text-white">
              <CardTitle className="text-2xl font-noto">
                夜のバー・おつまみ（17:00–23:30）
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {dinnerMenu.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-trend-text font-noto">
                        {item.name}
                      </h3>
                      <span className="text-trend-accent font-bold font-noto">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm font-noto">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-trend-accent to-trend-text text-white">
            <CardTitle className="text-2xl font-noto">
              ドリンク
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drinks.map((drink, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-trend-text font-noto">{drink.name}</span>
                  <span className="text-trend-accent font-bold font-noto">{drink.price}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Menu;
