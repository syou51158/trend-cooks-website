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
      category: 'korean',
      image: '/images/menu/korean_yangnyeom_chicken_plate_1772802765993.png'
    },
    {
      name: 'レバノン風 丸ごと肉詰めポテト（バタタ・マフシー）',
      nameEn: 'Lebanese Stuffed Potato (Batata Mahshi)',
      price: '1,280円',
      description: '世界中の美食家が注目！くり抜いて素揚げしたポテトに、スパイスと松の実が香るお肉を詰め込みトマトソースで煮込んだ中東の絶品郷土料理',
      descriptionEn: 'A globally trending Middle Eastern delicacy. Fried hollowed potatoes stuffed with spiced minced meat and pine nuts, simmered in rich tomato sauce.',
      popular: true,
      category: 'exotic',
      image: '/images/menu/batata_mahshi_concept_1772891119336.png'
    },

    {
      name: 'プルコギ風和牛プレート',
      nameEn: 'Bulgogi-style Wagyu Plate',
      price: '1,480円',
      description: '韓国プルコギ風に味付けした近江牛を使用。ナムル3種、キムチ、温泉卵を添えたボリューム満点プレート',
      descriptionEn: 'Omi wagyu seasoned bulgogi-style with 3 namul, kimchi, and a soft-boiled egg.',
      popular: false,
      category: 'premium',
      image: '/images/menu/bulgogi_wagyu_plate_1772802866558.png'
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
      popular: true,
      image: '/images/menu/omi_wagyu_seared_sushi_1772802851621.png'
    },
    {
      name: '近江牛プレミアムステーキ（150g）',
      nameEn: 'Omi Wagyu Premium Steak (150g)',
      price: '7,780円',
      description: 'A5等級近江牛サーロインのステーキ。特製和風ソースと京野菜のグリルを添えて',
      descriptionEn: 'A5 sirloin steak with house Japanese sauce and grilled Kyoto vegetables.',
      popular: true,
      image: '/images/menu/omi_wagyu_premium_steak_1772802896944.png'
    },
    {
      name: '近江牛の特選炙り牛丼',
      nameEn: 'Deluxe Omi Wagyu Seared Beef Bowl',
      price: '2,980円',
      description: '自家製タレで香ばしく炙った近江牛を、特Aランクの炊きたてご飯に乗せた至福の一杯。',
      descriptionEn: 'Premium Omi beef seared with house-made sauce on top of A-rank rice.',
      image: '/images/menu/omi_wagyu_bowl_1772803387863.webp'
    },
    {
      name: 'ホグワーツ大広間のシェパーズパイ',
      nameEn: 'Hogwarts Great Hall Shepherd\'s Pie',
      price: '1,480円',
      description: 'ハリー・ポッターの世界から飛び出した伝統的イギリス料理。近江牛のひき肉と野菜をじっくり煮込み、黄金色のマッシュポテトで熱々に焼き上げました',
      descriptionEn: 'A magical traditional British dish. A rich Omi Wagyu minced meat base topped with a thick, beautifully golden-brown crust of piped mashed potatoes.',
      popular: true,
      image: '/images/menu/harry_potter_shepherds_pie_1772890556947.png'
    }
  ];

  // スイーツ・デザート
  const sweets = [
    {
      name: 'イチゴ飴',
      nameEn: 'Candied Strawberries',
      price: '800円',
      description: '宝石のように美しく仕上げたイチゴ飴。SNS映え間違いなしの逸品',
      descriptionEn: 'Beautiful jewel-like candied strawberries. Perfect for social posts.',
      image: '/images/menu/candied_strawberries_1772802931894.png'
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
  const viralMenu = [
    {
      name: 'ナッシュビル・ホット・モッツァレラスティック',
      nameEn: 'Nashville Hot Mozzarella Sticks',
      price: '1,200円',
      description: '特製スパイスで赤く染まったサクサクの衣から、とろ〜り伸びる濃厚チーズ。特製ランチソースにたっぷりディップして',
      descriptionEn: 'Spicy crispy crust with gooey melted cheese inside. Served with creamy ranch dip.',
      popular: true,
      image: '/images/menu/no_hands_mozzarella_1772806435282.png'
    },
    {
      name: '極厚！禁断の純生クリーム食パンサンド',
      nameEn: 'Viral Pure Cream Shokupan Sandwich',
      price: '980円',
      description: 'フルーツは一切なし！ふんわり柔らかな厚切り食パンに、特製純生ホイップクリームだけを限界まで挟み込んだ究極の背徳スイーツ',
      descriptionEn: 'No fruit, just pure cream. Fluffy white milk bread overstuffed with an impossible amount of lightly sweetened whipped cream.',
      image: '/images/menu/no_hands_cream_sandwich_1772806454423.png'
    },
    {
      name: 'ニューオーリンズ風 ふわふわベニエ',
      nameEn: 'New Orleans-style Beignets',
      price: '850円',
      description: '粉砂糖を雪のようにたっぷりかけた四角いドーナツ。外はサクッと、中はふんわりもっちり',
      descriptionEn: 'Fresh-fried square doughnuts heavily dusted with powdered sugar. Crispy outside, fluffy inside.',
      image: '/images/menu/no_hands_beignets_1772806471380.png'
    },
    {
      name: 'サクサク旨辛！クリスピーチキンテンダー',
      nameEn: 'Crispy Spicy Chicken Tenders',
      price: '1,100円',
      description: 'ASMR動画でおなじみ！ザクザク食感の骨なしスパイシーチキンを、さっぱりとした特製ランチソースと共に',
      descriptionEn: 'Extra crispy, spicy boneless chicken tenders perfect for dipping in ranch sauce.',
      popular: true,
      image: '/images/menu/crispy_spicy_chicken_tender_1772804983906.png'
    },
    {
      name: '悪魔のサクとろ揚げバター',
      nameEn: 'Devil\'s Deep-Fried Butter',
      price: '780円',
      description: 'サクッとした甘い衣の中から、熱々でとろけるバターが溢れ出す！粉砂糖とメープルシロップをかけた究極の背徳スイーツ',
      descriptionEn: 'Crispy sweet pastry giving way to a core of hot, melted butter. Dusted with powdered sugar and drizzled with maple syrup.',
      image: '/images/menu/viral_fried_butter_1772886664456.png'
    },
    {
      name: 'ASMR級！極太丸焼きカリカリホルモン',
      nameEn: 'Crispy Jumbo Grilled Daechang',
      price: '1,480円',
      description: '外はカリカリ、噛むと脂が爆発する韓国風の大人気「丸焼きテッチャン」。自家製ピリ辛ダレで召し上がれ',
      descriptionEn: 'Extra thick, crispy grilled beef large intestine. Explodes with rich flavor. Served with a spicy Korean dipping sauce.',
      popular: true,
      image: '/images/menu/viral_horumon_1772886678210.png'
    },
    {
      name: '悪魔的クリーミー！極みクリームカルボ麺',
      nameEn: 'Ultimate Cream Carbo Buldak',
      price: '1,380円',
      description: '大流行の「カルボブルダック」をベースに、プロの技で限界までリッチに進化した汁なし麺。たっぷりの濃厚純生クリームと、とろける特製チーズソースで仕上げた禁断の一皿',
      descriptionEn: 'The viral Korean soupless noodles elevated to restaurant quality with heavy cream and a rich, melting layer of premium cheese.',
      popular: true,
      image: '/images/menu/authentic_cream_carbo_buldak_1772889282403.png'
    },
    {
      name: '禁断のチーズディップ！サクもちポテトフライ',
      nameEn: 'Chewy Mochi-Potato Fries with Cheese Dip',
      price: '680円',
      description: '軽くトリュフ塩を振った、外サクサク・中モッチモチのやみつきポテト。自家製の「特製濃厚ガーリックチーズソース」にたっぷりディップして食べる、ワンランク上の背徳おつまみです！',
      descriptionEn: 'Ultra-crispy outside, mochi-like chewy inside, dusted with truffle salt. Served with a rich house-made garlic cheese dipping sauce.',
      popular: true,
      image: '/images/menu/mochi_mochi_potato_fries_1772892139730.png'
    }
  ];

  // スペシャルティコーヒー (深煎り・コク重視)
  const coffeeMenu = [
    {
      name: 'Trend Cooks プレミアムブレンド',
      nameEn: 'Trend Cooks Premium Blend',
      price: '580円',
      description: '酸味を極限まで抑え、ビターチョコレートのような甘い苦味を引き出した当店のシグネチャー。',
      descriptionEn: 'Signature blend. Extremely low acidity with deep richness and chocolate-like sweet bitterness.',
      balance: 85, // 0 = Acid, 100 = Bitter
      strengthCustomizable: true,
      temp: 'both', // 'both' | 'hot' | 'iced'
      syrup: true,
    },
    {
      name: '極・深煎り水出しアイスコーヒー',
      nameEn: 'Deep Roast Cold Brew',
      price: '620円',
      description: '丸一日かけて抽出。酸味ゼロでスッキリとした力強い苦味が特徴。',
      descriptionEn: 'Extracted over 24 hours. Zero acidity with a clean, powerful bitterness.',
      balance: 95,
      strengthCustomizable: false,
      temp: 'iced',
      syrup: true,
    },
    {
      name: 'コク深アメリカーノ',
      nameEn: 'Rich Americano',
      price: '550円',
      description: 'エスプレッソのお湯割り。フルーティーさを消し、ガツンとしたロースト感とコクを楽しめます。',
      descriptionEn: 'Espresso diluted with water. Bold roasted flavor and depth, with no fruity notes.',
      balance: 80,
      strengthCustomizable: true,
      temp: 'both',
      syrup: true,
    },
    {
      name: '濃厚ミルクのカフェラテ',
      nameEn: 'Rich Milk Cafe Latte',
      price: '650円',
      description: 'エスプレッソの強い苦味と、濃厚なミルクの甘みがベストマッチ。',
      descriptionEn: 'Perfect harmony of strong espresso bitterness and rich milk sweetness.',
      balance: 75,
      strengthCustomizable: true,
      temp: 'both',
      syrup: true,
    },
    {
      name: 'キリマンジャロ（深煎り仕立て）',
      nameEn: 'Kilimanjaro (Deep Roast)',
      price: '680円',
      description: '特有の酸味を深煎りで極限まで抑え込み、野性味あふれる強いコクと苦味に変換した特別な一杯。',
      descriptionEn: 'Deep roasted to suppress acidity, transforming it into a wild, rich bitterness.',
      balance: 88,
      strengthCustomizable: true,
      temp: 'both',
      syrup: true,
    },
    {
      name: 'クラシック・ウィンナーコーヒー',
      nameEn: 'Classic Wiener Coffee',
      price: '700円',
      description: '深煎りコーヒーの上に、たっぷりの冷たいホイップクリームを浮かべた贅沢な一杯。',
      descriptionEn: 'Deep roasted coffee topped with a generous layer of cold whipped cream.',
      balance: 82,
      strengthCustomizable: true,
      temp: 'both',
      syrup: true,
    },
    {
      name: 'エスプレッソ・フラペチーノ',
      nameEn: 'Espresso Frappuccino',
      price: '750円',
      description: '氷とエスプレッソをブレンドしたフローズンドリンク。ガツンとしたコーヒー感とミルクの甘み。',
      descriptionEn: 'Frozen blended espresso drink with a strong coffee kick and milky sweetness.',
      balance: 70,
      strengthCustomizable: true,
      temp: 'iced',
      syrup: true,
      isFrappuccino: true,
    }
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

  // ドリンク
  type DrinkItem = {
    name: string;
    nameEn: string;
    price: string;
    description?: string;
    descriptionEn?: string;
    image?: string;
    temp?: 'hot' | 'iced' | 'both';
  };

  const drinks: DrinkItem[] = [
    {
      name: 'シグネチャーカクテル「琵琶湖ブルー」',
      nameEn: 'Signature Cocktail "Lake Biwa Blue"',
      price: '850円',
      description: '大津の美しい琵琶湖を表現した、深いサファイアブルーの特製カクテル。爽やかなシトラスの香りでどんな料理にも合います。(※ノンアルコールへの変更可)',
      descriptionEn: 'A deep sapphire blue cocktail representing beautiful Lake Biwa. Refreshing citrus notes that pair well with any dish. (Non-alcoholic version available)',
      image: '/images/menu/lake_biwa_blue_tall_glass_1772934790500.png'
    },
    {
      name: 'クラシカル・アールグレイティー',
      nameEn: 'Classical Earl Grey Tea',
      price: '500円',
      description: 'ベルガモットの華やかな香りが広がる、英国風の定番ブラックティー。',
      descriptionEn: 'Classic British black tea with an elegant blooming bergamot aroma.',
      image: '/images/menu/earl_grey_tea_1772934809046.png',
      temp: 'both'
    },
    {
      name: 'ダージリンティー（プレミアム茶葉）',
      nameEn: 'Premium Darjeeling Tea',
      price: '550円',
      description: '「紅茶のシャンパン」と呼ばれる最高級茶葉を使用。マスカットのような爽やかな風味。',
      descriptionEn: 'Made with premium "Champagne of Teas" leaves. A refreshing muscat-like flavor.',
      image: '/images/menu/darjeeling_tea_1772934829466.png',
      temp: 'hot'
    },
    {
      name: '濃厚ロイヤルミルクティー',
      nameEn: 'Rich Royal Milk Tea',
      price: '600円',
      description: 'たっぷりのスチームミルクと濃縮した茶葉のコクを味わう、ご褒美ティー。',
      descriptionEn: 'A reward tea to enjoy the rich combination of plentiful steamed milk and concentrated tea leaves.',
      image: '/images/menu/royal_milk_tea_1772934851098.png',
      temp: 'both'
    },
    {
      name: '究極の生搾りオレンジジュース',
      nameEn: 'Ultimate Fresh Squeezed Orange Juice',
      price: '650円',
      description: '新鮮なオレンジをその場で搾った、果実感あふれる100%ピュアジュース。自然な甘みと酸味が広がります。',
      descriptionEn: '100% pure fresh-squeezed orange juice full of natural sweetness and acidity.',
      image: '/images/menu/fresh_orange_juice_1772935774769.png',
      temp: 'iced'
    },
    {
      name: 'まるごと生搾りアップルジュース',
      nameEn: 'Whole Fresh Squeezed Apple Juice',
      price: '650円',
      description: '上質なリンゴを丸ごと搾った、濃厚でクリアな甘さが特徴的なプレミアムジュース。',
      descriptionEn: 'Premium clear apple juice squeezed from whole, high-quality apples.',
      image: '/images/menu/fresh_apple_juice_1772935797718.png',
      temp: 'iced'
    },
    {
      name: '自家製ハニーレモネード',
      nameEn: 'Homemade Honey Lemonade',
      price: '600円',
      description: 'はちみつの優しい甘さとフレッシュレモンの酸味が絶妙にマッチした、爽快感抜群のカフェ定番ドリンク。',
      descriptionEn: 'A cafe classic matching the gentle sweetness of honey with the refreshing sourness of fresh lemon.',
      image: '/images/menu/honey_lemonade_1772935814079.png',
      temp: 'iced'
    },
    {
      name: '季節のご褒美ミックスフルーツジュース',
      nameEn: 'Seasonal Premium Mixed Fruit Juice',
      price: '850円',
      description: '旬のフルーツを贅沢にミックスした、彩り豊かでビタミンたっぷりの濃厚スムージー風ドリンク。',
      descriptionEn: 'A colorful, luxury smoothie-style mixed drink made with abundant seasonal fruits.',
      image: '/images/menu/mixed_fruit_juice_v2_1772939540904.png',
      temp: 'iced'
    },
    { name: 'クラフトビール各種', nameEn: 'Craft Beers', price: '650〜800円' },
    { name: '地酒（グラス）', nameEn: 'Local Sake (glass)', price: '750〜1,200円' },
    { name: 'スムージー・ジュース各種', nameEn: 'Smoothies & Juices', price: '400〜600円' }
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
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full overflow-hidden flex flex-col">
                  {item.image && (
                    <div className="relative h-48 xl:h-56 2xl:h-64 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={isJa ? item.name : (item.nameEn || item.name)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col flex-grow">
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
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden flex flex-col">
                  {item.image && (
                    <div className="relative h-56 xl:h-64 2xl:h-72 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={isJa ? item.name : (item.nameEn || item.name)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col flex-grow">
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

        {/* SNS話題のトレンドメニュー */}
        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInLeft" delay={450}>
            <div className="text-center mb-12 xl:mb-16 2xl:mb-20">
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto">
                {t('menu.sections.viral.title')}
              </h3>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
                {t('menu.sections.viral.desc')}
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6 xl:gap-8 2xl:gap-10">
            {viralMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={500 + index * 30}>
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group h-full overflow-hidden flex flex-col bg-red-50/30">
                  {item.image && (
                    <div className="relative h-48 xl:h-56 2xl:h-64 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={isJa ? item.name : (item.nameEn || item.name)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-6 xl:p-8 2xl:p-10 h-full flex flex-col flex-grow">
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
                          <Badge className="bg-red-500 text-white">
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
                    <div className="flex justify-between items-center mt-auto pt-4">
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
                <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group overflow-hidden flex flex-col">
                  {item.image && (
                    <div className="relative h-48 xl:h-56 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={isJa ? item.name : (item.nameEn || item.name)}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-4 xl:p-6 2xl:p-8 flex flex-col flex-grow">
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

        {/* スペシャルティコーヒー */}
        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <AnimatedElement animation="fadeInUp" delay={800}>
            <div className="text-center mb-10 xl:mb-12 2xl:mb-16">
              <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-amber-900 mb-4 xl:mb-6 2xl:mb-8 font-noto">
                {t('menu.sections.coffee.title')}
              </h3>
              <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
                {t('menu.sections.coffee.desc')}
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10">
            {coffeeMenu.map((item, index) => (
              <AnimatedElement key={index} animation="scaleIn" delay={850 + index * 50}>
                <Card className="border-2 border-amber-900/10 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-[#faf8f5]">
                  <CardContent className="p-6 h-full flex flex-col">
                    <h4 className="text-lg xl:text-xl font-bold text-amber-900 font-noto mb-1">
                      {isJa ? item.name : item.nameEn}
                    </h4>
                    <p className="text-xs text-amber-900/60 font-noto mb-4">
                      {isJa ? item.nameEn : item.name}
                    </p>
                    <p className="text-gray-600 text-sm font-noto mb-6 flex-grow">
                      {isJa ? item.description : item.descriptionEn}
                    </p>

                    {/* Taste Gauge */}
                    <div className="mb-4 bg-white p-3 rounded-lg shadow-sm border border-amber-900/5">
                      <div className="flex justify-between text-[11px] xl:text-xs text-amber-900/80 mb-2 font-bold font-noto">
                        <span>◀︎ {t('menu.sections.coffee.acidity')}</span>
                        <span>{t('menu.sections.coffee.bitterness')} ▶︎</span>
                      </div>
                      <div className="h-1.5 w-full bg-gradient-to-r from-orange-300 via-amber-200 to-amber-900 rounded-full relative">
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-amber-900 rounded-full shadow-md transition-all duration-1000"
                          style={{ left: `calc(${item.balance}% - 7px)` }}
                        />
                      </div>
                    </div>

                    {/* Customization Selectors */}
                    <div className="space-y-3 mb-6 bg-white p-3 rounded-lg border border-amber-900/10">

                      {/* Temperature */}
                      {item.temp === 'both' && (
                        <div>
                          <span className="text-[10px] xl:text-xs text-amber-900/80 font-bold font-noto block mb-1.5">{t('menu.sections.coffee.temperature')}:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.hot')}</Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.iced')}</Badge>
                          </div>
                        </div>
                      )}
                      {item.temp === 'iced' && !item.isFrappuccino && (
                        <div>
                          <span className="text-[10px] xl:text-xs text-blue-700 font-bold font-noto block mb-1.5">Cold Drink (Iced)</span>
                        </div>
                      )}

                      {/* Ice Amount */}
                      {item.temp !== 'hot' && !item.isFrappuccino && (
                        <div>
                          <span className="text-[10px] xl:text-xs text-amber-900/80 font-bold font-noto block mb-1.5">{t('menu.sections.coffee.iceAmount')}:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            <Badge className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.iceNormal')}</Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.iceLess')}</Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.iceMore')}</Badge>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.iceNone')}</Badge>
                          </div>
                        </div>
                      )}

                      {/* Syrup */}
                      {item.syrup && (
                        <div>
                          <span className="text-[10px] xl:text-xs text-amber-900/80 font-bold font-noto block mb-1.5">{t('menu.sections.coffee.syrup')}:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.syrupYes')}</Badge>
                            <Badge className="bg-amber-600 text-white hover:bg-amber-700 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.syrupNo')}</Badge>
                          </div>
                        </div>
                      )}

                      {/* Strength Selector */}
                      {item.strengthCustomizable && (
                        <div>
                          <span className="text-[10px] xl:text-xs text-amber-900/80 font-bold font-noto block mb-1.5">{t('menu.sections.coffee.strength')}:</span>
                          <div className="flex gap-1.5 flex-wrap">
                            <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-900/20 hover:bg-amber-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.light')}</Badge>
                            <Badge className="bg-amber-900 text-white hover:bg-amber-800 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.regular')}</Badge>
                            <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-900/20 hover:bg-amber-100 cursor-pointer font-noto py-0.5 px-2 text-[10px] xl:text-xs">{t('menu.sections.coffee.strong')}</Badge>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-right mt-auto">
                      <span className="text-amber-900 text-xl font-bold font-noto">
                        {item.price}
                      </span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 2xl:gap-10">
                {drinks.map((drink, index) => (
                  <div key={index} className="flex flex-col bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300 group">
                    {drink.image && (
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={drink.image}
                          alt={isJa ? drink.name : (drink.nameEn || drink.name)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col">
                          <span className="text-trend-text xl:text-lg 2xl:text-xl font-bold font-noto group-hover:text-trend-accent transition-colors duration-300">
                            {isJa ? drink.name : (drink.nameEn || drink.name)}
                          </span>
                          {drink.nameEn && drink.name && (
                            <span className="text-[11px] xl:text-sm text-gray-500 font-normal leading-snug">
                              {isJa ? drink.nameEn : drink.name}
                            </span>
                          )}
                        </div>
                        <span className="text-trend-accent xl:text-lg 2xl:text-xl font-bold font-noto ml-2 whitespace-nowrap">
                          {drink.price}
                        </span>
                      </div>

                      {drink.description && (
                        <p className="text-gray-600 text-xs xl:text-sm font-noto mt-2 flex-grow">
                          {isJa ? drink.description : (drink.descriptionEn || drink.description)}
                          {drink.descriptionEn && drink.description && (
                            <span className="block text-[10px] xl:text-xs text-gray-400 mt-1">
                              {isJa ? drink.descriptionEn : drink.description}
                            </span>
                          )}
                        </p>
                      )}

                      {/* Display Customization tags for tea/cocktails if any */}
                      {drink.temp && (
                        <div className="mt-3 flex gap-2">
                          {drink.temp === 'both' && (
                            <>
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 py-0.5 px-2 text-[10px] xl:text-xs">Hot</Badge>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-0.5 px-2 text-[10px] xl:text-xs">Iced</Badge>
                            </>
                          )}
                          {drink.temp === 'iced' && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 py-0.5 px-2 text-[10px] xl:text-xs">Iced</Badge>
                          )}
                          {drink.temp === 'hot' && (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 py-0.5 px-2 text-[10px] xl:text-xs">Hot</Badge>
                          )}
                        </div>
                      )}
                    </div>
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
