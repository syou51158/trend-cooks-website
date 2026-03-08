import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ja: {
    translation: {
      hero: {
        title: 'Trend Cooks',
        subtitle: '最新のトレンドと伝統の味が融合した、極上の食体験',
        description: '大津京駅徒歩2分。厳選された近江牛と革新的な創作料理で、忘れられない美食の時間をお約束します。',
        cta: '今すぐオンライン予約',
        ctaAria: 'お問い合わせセクションへ移動'
      },
      nav: {
        home: 'ホーム',
        about: 'About',
        menu: 'メニュー',
        events: 'イベント',
        news: 'ニュース',
        gallery: 'ギャラリー',
        contact: 'お問い合わせ',
        language: '言語切り替え',
        aria: {
          header: 'サイトヘッダー',
          main: 'メインナビゲーション',
          mobile: 'モバイルナビゲーション',
          goTo: '{{section}} セクションへ移動',
          openMenu: 'メニューを開く',
          closeMenu: 'メニューを閉じる'
        }
      },
      about: {
        missionTitle: '私たちのミッション',
        description:
          'Trend Company株式会社は、「常にトレンドの先端」を追求する飲食ベンチャーです。屋台出店で培ったノウハウを活かし、本格店舗『Trend Cooks』をオープン。日々変化するトレンドを体験できる場を創り、地域と観光をつなぐ架け橋を目指します。',
        spaceHeading: 'こだわりの空間',
        space: {
          location: {
            title: 'ロケーション',
            desc: '大津京駅から徒歩2分、ブランチ大津京の向かい側に位置する好立地。'
          },
          interior: {
            title: 'インテリア',
            desc: 'ホワイト×木目を基調とし、間接LED×ピンスポットでモダンに演出。'
          },
          stage: {
            title: 'ステージ演出',
            desc: '可動式ステージ＆プロジェクターで、週末ライブや映像イベントも開催可能。'
          }
        },
        staffHeading: 'スタッフ紹介',
        staff: {
          name: '代表 村岡翔',
          bio: '創業から３年、全国屋台出店を経て本格店舗を立ち上げ。外国人ガイド経験を活かした送迎サービスも実施中。'
        },
        // alt keys used by About.tsx
        alt: {
          interior: 'レストラン内装',
          ceo: '代表 村岡翔'
        }
      },
      features: {
        heading: '私たちの特徴',
        subheading: 'Trend Cooksが選ばれる理由',
        // 新キー（既存互換を保持）
        sectionTitle: '私たちの特徴',
        sectionSubtitle: 'Trend Cooksが選ばれる理由',
        items: {
          one: {
            title: '昼夜二毛作',
            description: '11:00–17:00は創作カフェ、17:00–23:30はスナック・バー営業。'
          },
          two: {
            title: '近江牛創作',
            description: 'A5ランク近江牛を使った炙り寿司／スキレットステーキなどプレミアムメニュー。'
          },
          three: {
            title: 'バーチャル琵琶湖ビュー',
            description: 'Nebulaレーザープロジェクターで湖畔の風景を店内に投影。'
          },
          four: {
            title: '地域交流',
            description: '通りがかりの子ども向け無料試食、柳崎公園でのアウトドアイベントも構想中。'
          },
          // 新しい命名の複製（desc付き）
          dayNight: { title: '昼夜二毛作', desc: '11:00–17:00は創作カフェ、17:00–23:30はスナック・バー営業。' },
          omiBeef: { title: '近江牛創作', desc: 'A5ランク近江牛を使った炙り寿司／スキレットステーキなどプレミアムメニュー。' },
          virtualBiwa: { title: 'バーチャル琵琶湖ビュー', desc: 'Nebulaレーザープロジェクターで湖畔の風景を店内に投影。' },
          community: { title: '地域交流', desc: '通りがかりの子ども向け無料試食、柳崎公園でのアウトドアイベントも構想中。' }
        }
      },
      // 共通情報
      common: {
        brand: 'Trend Cooks',
        skipToContent: 'メインコンテンツへスキップ',
        loading: '読み込み中…',
        address: {
          zip: '〒520-0022',
          line1: '滋賀県大津市柳が崎9-15',
          line2: 'ルシェル西大津102号室',
          accessNote: 'JR大津京駅より徒歩20分',
          parkingNote: 'Pなし（近隣コインパーキングをご利用ください）'
        },
        phone: '090-2115-6429',
        owner: '代表・村岡',
        hours: {
          title: '営業時間',
          day: '昼：11:00 - 17:00（創作カフェ）',
          night: '夜：17:00 - 23:30（スナック・バー）'
        }
      },
      // 追加: Eventsセクション
      events: {
        title: 'イベント',
        subtitle: '様々な交流イベントとエンターテイメント',
        items: {
          live: {
            title: '週末アコースティックライブ',
            description: '地元アーティストによる生演奏をステージでお届け（予約優先）。',
            status: '毎週開催'
          },
          cinema: {
            title: '映画上映会・スポーツ観戦会',
            description: 'プロジェクターで大画面視聴。貸切予約も可。',
            status: '随時開催'
          },
          outdoor: {
            title: '柳崎公園アウトドアイベント（構想中）',
            description: 'ドームテントやレジャーシート貸出で湖畔ピクニック体験。',
            status: '準備中'
          }
        },
        newsUpdateNotice: '各種イベント情報は「News」ページで随時更新中',
        viewNews: 'ニュースを見る'
      },
      // 追加: Newsセクション
      news: {
        title: 'ニュース',
        subtitle: 'Trend Cooksからのお知らせ、季節メニュー、プレオープン情報など最新情報をお届けします。',
        readMore: '詳細を見る',
        adminNote: '（管理画面からオーナー様が直接更新可能）',
        items: [
          {
            date: '2025/08/01',
            title: '【グランドオープン決定】9/1（月）正式営業スタート！',
            excerpt: 'いよいよTrend Cooksが正式オープンいたします。皆様のお越しをお待ちしております。',
            category: 'お知らせ'
          },
          {
            date: '2025/07/20',
            title: '予約フォーム公開／SNS特典キャンペーン実施中',
            excerpt: 'オンライン予約システムを公開しました。SNSフォローで特典もご用意しています。',
            category: 'キャンペーン'
          },
          {
            date: '2025/07/01',
            title: 'プレオープンレポート（インフルエンサー試食会）',
            excerpt: '地元インフルエンサーの皆様にお越しいただき、貴重なご意見をいただきました。',
            category: 'イベント'
          }
        ]
      },
      // 追加: Galleryセクション
      gallery: {
        title: 'ギャラリー',
        subtitle: '店内の雰囲気、創作メニュー、各種交流イベント、プロジェクター演出の様子など、フォトギャラリーでご覧ください。',
        openImageAria: '{{alt}} を拡大表示',
        previewAria: '画像プレビュー',
        close: '閉じる',
        enlargedAlt: '拡大画像',
        enlargedAlt2: '拡大表示',
        photoNote: '※写真は随時追加予定',
        images: [
          { alt: '店内バーチャル琵琶湖ビュー', category: '店内' },
          { alt: '近江牛炙り寿司', category: 'メニュー' },
          { alt: 'ライブステージ', category: 'イベント' },
          { alt: '近江牛スキレットステーキ', category: 'メニュー' },
          { alt: '柳崎公園アウトドアイメージ', category: 'アウトドア' },
          { alt: 'モダンな店内インテリア', category: '店内' },
          { alt: '地域交流イベント', category: 'イベント' },
          { alt: 'ビジネス交流会', category: 'イベント' },
          { alt: '料理教室イベント', category: 'イベント' },
          { alt: 'カルチャー交流会', category: 'イベント' },
          { alt: 'ワークショップイベント', category: 'イベント' },
          { alt: 'コミュニティ交流会', category: 'イベント' }
        ]
      },
      // 追加: Contactセクション
      contact: {
        title: 'ご予約・お問い合わせ',
        subtitle: 'お気軽にお問い合わせください。お待ちしております。',
        formTitle: 'オンライン予約フォーム',
        formAria: 'お問い合わせフォーム',
        labels: {
          name: 'お名前 *',
          email: 'メールアドレス *',
          phone: '電話番号',
          date: 'ご希望日 *',
          time: 'ご希望時間 *',
          guests: '人数 *',
          menu: 'ご希望メニュー',
          message: 'その他ご要望'
        },
        placeholders: {
          menu: '例：近江牛コース、飲み放題プラン',
        message: 'アレルギー、記念日、送迎サービスご希望など'
        },
        submit: '予約を送信',
        submitting: '送信中...',
        validationRequired: 'お名前とメールアドレスは必須です。',
        thanks: 'お問い合わせありがとうございます。24時間以内にご連絡いたします。',
        storeInfoTitle: '店舗情報',
        addressTitle: '住所',
        phoneReservationTitle: '電話予約',
        shuttleTitle: '無料送迎サービス',
        shuttleText: '大津京駅⇔店舗間',
        shuttleNote: '（要事前予約）',
        mapPlaceholder: 'Google Maps（実装予定）'
      },
      // 追加: Footer
      footer: {
        concept: '"流行のものを手軽に味わう"をコンセプトに、大津京エリアに誕生した創作料理店＆バー。',
        access: 'アクセス',
        hoursTitle: '営業時間',
        copyright: '© 2025 Trend Company株式会社. All rights reserved.'
      },
      // 追加: Menu セクション
      menu: {
        title: 'メニュー',
        subtitle: 'こだわりの創作料理と近江牛をお楽しみください',
        badges: {
          popular: '人気',
          special: '特選'
        },
        sections: {
          lunch: {
            title: '🍽️ 昼間営業（11:00〜17:00）',
            desc: 'SNS映えする創作ランチとスイーツ'
          },
          premium: {
            title: '🥩 プレミアム近江牛メニュー',
            desc: '国際的なお客様向け特別コース'
          },
          sweets: {
            title: '🍰 スイーツ・デザート'
          },
          dinner: {
            title: '🌙 夜間営業（17:00〜23:30）',
            desc: '小皿料理とプロジェクター演出でリラックスタイム'
          },
          drinks: {
            title: 'ドリンクメニュー'
          }
        },
        future: {
          title: '🚀 今後の展開予定（開店3〜6ヶ月後）',
          desc: 'さらに充実したメニューラインナップを準備中',
          lunchTitle: '追加検討中の創作ランチメニュー',
          premiumTitle: '将来検討中の高級近江牛メニュー'
        },
        disclaimer: '※上記メニューは将来的に段階的に導入を検討するメニュー案です。開店時点では実施しない可能性があります。'
      }
    }
  },
  en: {
    translation: {
      hero: {
        title: 'Trend Cooks',
        subtitle: 'A supreme culinary experience blending modern trends and timeless tradition',
        description:
          '2 minutes from Otsukyo Station. Savor carefully selected Omi beef and innovative dishes for an unforgettable dining experience.',
        cta: 'Book Online Now',
        ctaAria: 'Jump to contact section'
      },
      nav: {
        home: 'Home',
        about: 'About',
        menu: 'Menu',
        events: 'Events',
        news: 'News',
        gallery: 'Gallery',
        contact: 'Contact',
        language: 'Language switch',
        aria: {
          header: 'Site header',
          main: 'Main navigation',
          mobile: 'Mobile navigation',
          goTo: 'Jump to {{section}} section',
          openMenu: 'Open menu',
          closeMenu: 'Close menu'
        }
      },
      about: {
        missionTitle: 'Our Mission',
        description:
          "Trend Company Inc. is a food startup that constantly pursues what's next. Leveraging know-how from nationwide food-stall pop-ups, we opened our flagship restaurant 'Trend Cooks.' We create a place to experience ever‑evolving trends, connecting our local community with visitors.",
        spaceHeading: 'Our Space',
        space: {
          location: {
            title: 'Location',
            desc: '2 minutes from Otsukyo Station, right across from BRANCH Otsukyo — easy to find and access.'
          },
          interior: {
            title: 'Interior',
            desc: 'White tones and natural wood, accented with indirect LEDs and pin spots for a modern ambience.'
          },
          stage: {
            title: 'Stage Experience',
            desc: 'With a movable stage and projector, we host weekend live shows and video events.'
          }
        },
        staffHeading: 'Meet the Team',
        staff: {
          name: 'CEO Sho Muraoka',
          bio: 'In our third year since founding, we have grown from nationwide pop-ups to a full-scale restaurant. We also offer shuttle services leveraging experience as a guide for international visitors.'
        },
        alt: {
          interior: 'Restaurant interior',
          ceo: 'CEO Sho Muraoka'
        }
      },
      features: {
        heading: 'Our Features',
        subheading: 'Why guests choose Trend Cooks',
        sectionTitle: 'Our Features',
        sectionSubtitle: 'Why guests choose Trend Cooks',
        items: {
          one: {
            title: 'Day & Night Concept',
            description: 'Cafe with creative dishes 11:00–17:00, snack bar 17:00–23:30.'
          },
          two: {
            title: 'Omi Beef Creations',
            description: 'Premium menu featuring A5-grade Omi beef: aburi sushi, skillet steak, and more.'
          },
          three: {
            title: 'Virtual Lake Biwa View',
            description: 'Nebula laser projector brings lakeside scenery into the dining space.'
          },
          four: {
            title: 'Community Engagement',
            description: 'Free tastings for kids passing by and plans for outdoor events at Yanagasaki Park.'
          },
          dayNight: { title: 'Day & Night Concept', desc: 'Cafe with creative dishes 11:00–17:00, snack bar 17:00–23:30.' },
          omiBeef: { title: 'Omi Beef Creations', desc: 'Premium menu featuring A5-grade Omi beef: aburi sushi, skillet steak, and more.' },
          virtualBiwa: { title: 'Virtual Lake Biwa View', desc: 'Nebula laser projector brings lakeside scenery into the dining space.' },
          community: { title: 'Community Engagement', desc: 'Free tastings for kids passing by and plans for outdoor events at Yanagasaki Park.' }
        }
      },
      common: {
        brand: 'Trend Cooks',
        skipToContent: 'Skip to main content',
        loading: 'Loading…',
        address: {
          zip: '520-0022',
          line1: '9-15 Yanagasaki, Otsu, Shiga',
          line2: 'Le Ciel Nishi-Otsu Room 102',
          accessNote: '20-minute walk from JR Otsukyo Station',
          parkingNote: 'No on-site parking (please use nearby coin-operated lots)'
        },
        phone: '+81-90-2115-6429',
        owner: 'CEO Sho Muraoka',
        hours: {
          title: 'Business hours',
          day: 'Daytime: 11:00 - 17:00 (Creative Cafe)',
          night: 'Evening: 17:00 - 23:30 (Snack bar)'
        }
      },
      events: {
        title: 'Events',
        subtitle: 'Community gatherings and entertainment',
        items: {
          live: {
            title: 'Weekend Acoustic Live',
            description: 'Live performances by local artists on our stage (priority for reservations).',
            status: 'Weekly'
          },
          cinema: {
            title: 'Movie Nights & Sports Viewing',
            description: 'Enjoy big‑screen viewing with our projector. Private bookings available.',
            status: 'Occasional'
          },
          outdoor: {
            title: 'Yanagasaki Park Outdoor Event (Planned)',
            description: 'Lakeside picnic experience with dome tents and picnic blankets available for rent.',
            status: 'In preparation'
          }
        },
        newsUpdateNotice: 'Latest event details are updated on the News page.',
        viewNews: 'View News'
      },
      news: {
        title: 'News',
        subtitle: 'Stay up to date with announcements, seasonal menus, and pre‑opening updates from Trend Cooks.',
        readMore: 'Read more',
        adminNote: '(Owners can update directly from the admin panel)',
        items: [
          {
            date: '2025/08/01',
            title: 'Grand Opening Confirmed — Officially opening on 9/1 (Mon)!',
            excerpt: 'Trend Cooks is finally opening! We look forward to welcoming you.',
            category: 'Announcement'
          },
          {
            date: '2025/07/20',
            title: 'Reservation form released / Social media campaign now live',
            excerpt: 'Our online reservation system is now available. Follow us on social media for perks!',
            category: 'Campaign'
          },
          {
            date: '2025/07/01',
            title: 'Pre‑opening Report (Influencer Tasting)',
            excerpt: 'We hosted local influencers and received valuable feedback.',
            category: 'Event'
          }
        ]
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'Browse our photo gallery: interior atmosphere, creative dishes, community events, and projector scenes.',
        openImageAria: 'Enlarge: {{alt}}',
        previewAria: 'Image preview',
        close: 'Close',
        enlargedAlt: 'Enlarged image',
        enlargedAlt2: 'Enlarged view',
        photoNote: 'Photos will be added regularly.',
        images: [
          { alt: 'Virtual Lake Biwa view inside the restaurant', category: 'Interior' },
          { alt: 'Seared Omi beef sushi', category: 'Menu' },
          { alt: 'Live stage', category: 'Event' },
          { alt: 'Skillet steak with Omi beef', category: 'Menu' },
          { alt: 'Yanagasaki Park outdoor image', category: 'Outdoor' },
          { alt: 'Modern interior design', category: 'Interior' },
          { alt: 'Community event', category: 'Event' },
          { alt: 'Business networking event', category: 'Event' },
          { alt: 'Cooking class event', category: 'Event' },
          { alt: 'Cultural exchange meetup', category: 'Event' },
          { alt: 'Workshop event', category: 'Event' },
          { alt: 'Community meetup', category: 'Event' }
        ]
      },
      menu: {
        title: 'Menu',
        subtitle: 'Enjoy creative dishes and premium Omi beef',
        badges: {
          popular: 'Popular',
          special: 'Special'
        },
        sections: {
          lunch: {
            title: '🍽️ Daytime (11:00–17:00)',
            desc: 'Creative lunches and sweets that pop on social media'
          },
          premium: {
            title: '🥩 Premium Omi Beef Menu',
            desc: 'Special course for international guests'
          },
          sweets: {
            title: '🍰 Sweets & Desserts'
          },
          dinner: {
            title: '🌙 Evening (17:00–23:30)',
            desc: 'Relax with small plates and projector ambience'
          },
          drinks: {
            title: 'Drinks Menu'
          }
        },
        future: {
          title: '🚀 Coming Up (3–6 months after opening)',
          desc: "We're preparing an even richer lineup of menu items",
          lunchTitle: 'Additional creative lunch ideas under consideration',
          premiumTitle: 'Premium Omi beef menu under consideration'
        },
        disclaimer: 'Note: The above menus are proposals planned for phased introduction in the future and may not be available at opening time.'
      },
      contact: {
        title: 'Reservations & Inquiries',
        subtitle: 'Feel free to contact us. We look forward to hearing from you.',
        formTitle: 'Online Reservation Form',
        formAria: 'Contact form',
        labels: {
          name: 'Name *',
          email: 'Email *',
          phone: 'Phone',
          date: 'Preferred Date *',
          time: 'Preferred Time *',
          guests: 'Guests *',
          menu: 'Preferred Menu',
          message: 'Message'
        },
        placeholders: {
          menu: 'e.g., Omi Beef Course, All-you-can-drink plan',
          message: 'Allergies, celebrations, shuttle service request, etc.'
        },
        submit: 'Send Reservation',
        submitting: 'Sending... ',
        validationRequired: 'Name and email are required.',
        thanks: 'Thank you for your inquiry. We will get back to you within 24 hours.',
        storeInfoTitle: 'Store Information',
        addressTitle: 'Address',
        phoneReservationTitle: 'Reservation by Phone',
        shuttleTitle: 'Free Shuttle Service',
        shuttleText: 'Between Otsukyo Station and the restaurant',
        shuttleNote: '(Advance reservation required)',
        mapPlaceholder: 'Google Maps (to be implemented)'
      },
      footer: {
        concept: "A creative restaurant & bar in the Otsukyo area where you can easily enjoy what's in trend.",
        access: 'Access',
        hoursTitle: 'Business hours',
        copyright: '© 2025 Trend Company Inc. All rights reserved.'
      }
    }
  }
};

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ja',
    supportedLngs: ['ja', 'en'],
    defaultNS: 'translation',
    ns: ['translation'],
    detection: {
      order: ['querystring', 'localStorage', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  });

// Set html lang attribute when language changes (for accessibility)
if (typeof document !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    document.documentElement.setAttribute('lang', lng);
  });
}

export default i18n;