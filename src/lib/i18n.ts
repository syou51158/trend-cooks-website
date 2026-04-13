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
        safety: '安心・安全',
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
      safety: {
        title: '安心・安全への取り組み',
        subtitle: '当店舗では、HACCPの考え方を取り入れた衛生管理計画を厳守し、お客様に安全な食事を提供しています。',
        tabs: {
          general: '一般的衛生管理',
          critical: '重要管理のポイント'
        },
        general: {
          title: '一般的衛生管理のポイント',
          items: [
            {
              title: '① 原材料の受入の徹底確認',
              timing: '原材料の納入時および開封時',
              method: '外観、におい、包装の破損有無、消費期限・賞味期限、および指定された保存温度帯での納品がなされているかを厳密に確認する。',
              problem: '基準に満たない場合は直ちに受入を拒否し、納入業者へ返品・交換を要求する。'
            },
            {
              title: '② 庫内温度の確認（冷蔵・冷凍庫）',
              timing: '営業開始前、アイドルタイム、および営業終了後の1日3回',
              method: 'デジタル温度計により定期的に庫内温度を確認する（冷蔵庫：10℃以下、冷凍庫：-15℃以下）。',
              problem: '異常が認められた場合は直ちに原因を特定・再調整を行う。食材の劣化が疑われる場合は一切使用せず廃棄する。'
            },
            {
              title: '③-1 交差汚染・二次汚染の確実な防止',
              timing: '営業中の全ての調理・保管プロセスにおいて',
              method: '食材ごとに専用のまな板・包丁を色分けして使用。冷蔵庫内は加熱・非加熱食材を明確に分離し、必ず密閉容器で保管する。',
              problem: '万が一、生肉等が他の食材と接触した可能性がある場合は直ちに廃棄、または十分な中心加熱を実施し、使用器具は再洗浄・殺菌する。'
            },
            {
              title: '③-2 器具等の洗浄・消毒・殺菌',
              timing: '各調理作業の終了後および営業終了時',
              method: '使用済みの器具類（まな板、包丁、ボウル等）は中性洗剤で洗浄後、熱湯または認可された殺菌剤で速やかに消毒し、完全に乾燥させて保管する。',
              problem: '洗剤の残留や洗い残しが確認された場合は、初めから洗浄・消毒工程をやり直す。'
            },
            {
              title: '③-3 トイレの洗浄・消毒',
              timing: '営業開始前、営業中の定期時間、および営業終了時',
              method: 'トイレ専用の洗浄用具を使用し、便器・手すり・水洗レバー・ドアノブなどの接触頻度が高い箇所をアルコールまたは塩素系殺菌剤で入念に消毒する。',
              problem: '著しい汚れや吐瀉物等が発生した場合は、速やかに専用の感染症対策キット（ノロウイルス対応等）を用いて清掃・徹底消毒を実施する。'
            },
            {
              title: '④-1 従業員の健康管理および衛生的着衣',
              timing: '出勤時および業務開始前',
              method: '全従業員の検温、健康状態（下痢・嘔吐等の有無）、手指の傷の有無、および指定された清潔なユニフォーム・帽子の正しい着用をチェックする。',
              problem: '消化器症状や発熱がある従業員は直ちに帰宅させ療養させる。手指に傷がある場合は、専用の耐水性絆創膏と使い捨て手袋の着用を義務付ける。'
            },
            {
              title: '④-2 手洗いの厳格な実施',
              timing: 'トイレ使用後、厨房入室時、盛り付け前、生肉・生魚・アレルゲン食材・金銭を扱った後',
              method: '手洗いマニュアルに従い、手洗い用洗剤を用いて指の間・手首まで十分に洗浄・すすぎを行い、ペーパータオルで乾燥させた後にアルコール消毒を行う。',
              problem: '指定されたタイミングの手洗いを怠った、あるいは不十分な手洗いを発見した場合は、直ちに作業を中断させ正しい手順での再手洗いを指導・実施させる。'
            }
          ]
        },
        critical: {
          title: '重要管理のポイント（調理グループ別）',
          group1: {
            title: '第1グループ（非加熱メニュー）',
            targets: 'サラダ、ナムル、刺身、寿司ネタ等の生鮮・非加熱メニュー',
            checks: [
              '盛り付けは注文直前に行い、冷蔵庫から取り出したら提供まで常温放置を厳禁とする。',
              '品質表示や独自規定に基づく専用温度帯での保管を徹底する。',
              '生鮮品を扱う際は必ず使い捨ての衛生手袋を着用し、素手での食品への直接接触を一切禁止する。',
              '清潔な器具での扱いを徹底し、盛りつけ前に必ず手洗い・消毒を行う。'
            ]
          },
          group2: {
            title: '第2グループ（加熱後直ち／高温保管して提供）',
            targets: '近江牛のステーキ、ハンバーグ、クリスピーチキン、特製スープ等の加熱メニュー',
            checks: [
              '厚みのある肉類（ハンバーグ等）は、中心部が十分（例：75℃で1分間以上相当）に加熱されているかを中心温度計等を用いて都度確認する。',
              '肉汁の透明度や衣のキツネ色など、火の通り具合を目視・触感で多角的に判断する。',
              'スープやソース等を提供するまでの間、高温保管庫やウォーマーが適切な温度帯を維持しているか定期的に目視確認する。'
            ]
          },
          group3: {
            title: '第3グループ（加熱後急速冷却／さらに再加熱して提供）',
            targets: 'カレー、シチュー、ポテトサラダ用食材等の仕込み・作り置きメニュー',
            checks: [
              '加熱調理後は、菌が繁殖しやすい危険温度帯（10℃〜60℃）を速やかに通過させるため、小分けにして氷水等で急冷し直ちに冷蔵・冷凍保存する。',
              '保存後の再加熱時には、中心部まで完全に火が通っていること（沸騰、気泡の発生など）を徹底して確認する。',
              '再加熱から盛り付けへの移行時にも二次汚染を防ぐため、専用の清潔なトングやレードルを必ず使用する。'
            ]
          }
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
            status: '近日開催予定'
          },
          cinema: {
            title: '映画上映会・スポーツ観戦会',
            description: 'プロジェクターで大画面視聴。貸切予約も可。',
            status: '近日開催予定'
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
        adminNote: '',
        items: [
          {
            date: '2026/04/30',
            title: '【グランドオープン決定】正式営業スタート！',
            excerpt: '皆様お待たせいたしました！準備が整い、いよいよTrend Cooksがグランドオープンいたします。最新トレンド空間でお待ちしております。',
            category: 'お知らせ'
          },
          {
            date: '2026/04/16',
            title: 'プレオープンのお知らせ',
            excerpt: '飲食営業許可を取得に伴いプレオープンを実施いたします！一部内装の最終仕上げを残しつつ、皆様に一足先にお料理をお届けいたします。',
            category: 'お知らせ'
          },
          {
            date: '2026/04/13',
            title: '公式サイト公開および予約受付開始',
            excerpt: 'Trend Cooksの公式ウェブサイトを公開いたしました。オンラインでのご予約は現在こちらから承っております。',
            category: 'お知らせ'
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
            desc: '国際的なお客様向け特別コース',
            items: {
              omiWagyuBowl: {
                name: '近江牛の特選炙り牛丼',
                description: '自家製タレで香ばしく炙った近江牛を、特Aランクの炊きたてご飯に乗せた至福の一杯。'
              },
              hogwartsShepherdsPie: {
                name: 'ホグワーツ大広間のシェパーズパイ',
                description: 'ハリー・ポッターの世界から飛び出した伝統的イギリス料理。近江牛のひき肉と野菜をじっくり煮込み、黄金色のマッシュポテトで熱々に焼き上げました'
              }
            }
          },
          viral: {
            title: '🔥 SNSトレンド＆話題のメニュー',
            description: '最新のバズりグルメをTrend Cooks流にアレンジ',
            items: {
              nashvilleHotMozzarellaSticks: {
                name: 'ナッシュビル・ホット・モッツァレラスティック',
                description: '特製スパイスで赤く染まったサクサクの衣から、とろ〜り伸びる濃厚チーズ。特製ランチソースにたっぷりディップして'
              },
              yangnyeomChicken: {
                name: '韓国ヤンニョムチキンプレート',
                description: '定番のピリ辛ヤンニョムチキンを骨なしで仕上げ、自家製チキンム（チキン大根＝大根のピクルス）を添えた一皿。SNS映え抜群の赤いソースが特徴'
              },
              batataMahshi: {
                name: 'レバノン風 丸ごと肉詰めポテト（バタタ・マフシー）',
                description: '世界中の美食家が注目！くり抜いて素揚げしたポテトに、スパイスと松の実が香るお肉を詰め込みトマトソースで煮込んだ中東の絶品郷土料理'
              },
              bulgogiPlate: {
                name: 'プルコギ風和牛プレート',
                description: '韓国プルコギ風に味付けした近江牛を使用。ナムル3種、キムチ、温泉卵を添えたボリューム満点プレート'
              },
              newOrleansStyleBeignets: {
                name: 'ニューオーリンズ風 ふわふわベニエ',
                description: '粉砂糖を雪のようにたっぷりかけた四角いドーナツ。外はサクッと、中はふんわりもっちり'
              },
              crispySpicyChickenTenders: {
                name: 'サクサク旨辛！クリスピーチキンテンダー',
                description: 'ASMR動画でおなじみ！ザクザク食感の骨なしスパイシーチキンを、さっぱりとした特製ランチソースと共に'
              },
              devilsDeepFriedButter: {
                name: '悪魔のサクとろ揚げバター',
                description: 'サクッとした甘い衣の中から、熱々でとろけるバターが溢れ出す！粉砂糖とメープルシロップをかけた究極の背徳スイーツ'
              },
              crispyJumboGrilledDaechang: {
                name: 'ASMR級！極太丸焼きカリカリホルモン',
                description: '外はカリカリ、噛むと脂が爆発する韓国風の大人気「丸焼きテッチャン」。自家製ピリ辛ダレで召し上がれ'
              },
              premiumChickenCheeseBuldak: {
                name: 'サクサクチキン限界乗せ！極みチーズブルダック麺',
                description: 'SNSを席巻中の最強コンビ！大流行の激辛チーズブルダック麺の上に、揚げたての大きなサクサクチキンを豪快にトッピング。とろけるチーズとチキンの相性は悪魔的です'
              },
              mochiPotato: {
                name: '禁断のチーズディップ！サクもちポテトフライ',
                description: '軽くトリュフ塩を振った、外サクサク・中モッチモチのやみつきポテト。自家製の「特製濃厚ガーリックチーズソース」にたっぷりディップして食べる、ワンランク上の背徳おつまみです！'
              }
            }
          },
          sweets: {
            title: '🍰 スイーツ・デザート'
          },
          dinner: {
            title: '🌙 夜間営業（17:00〜23:30）',
            desc: '小皿料理とプロジェクター演出でリラックスタイム'
          },
          coffee: {
            title: '☕ スペシャルティコーヒー',
            desc: 'お好みの「温度・濃さ・甘さ」が選べる、こだわりの一杯',
            acidity: '酸味',
            bitterness: '苦味・コク',
            strength: 'コーヒーの濃さ',
            light: '軽め',
            regular: '普通',
            strong: '濃いめ',
            temperature: 'ホット / アイス',
            hot: 'ホット',
            iced: 'アイス',
            iceAmount: '氷の量（アイスのみ）',
            iceNormal: '普通',
            iceLess: '少なめ',
            iceMore: '多め',
            iceNone: '氷なし',
            syrup: 'シロップ（甘さ）',
            syrupYes: 'あり',
            syrupNo: 'なし'
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
        safety: 'Safety',
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
      safety: {
        title: 'Safety & Hygiene Initiatives',
        subtitle: 'We strictly adhere to a hygiene management plan based on HACCP principles to provide you with safe and secure meals.',
        tabs: {
          general: 'General Hygiene',
          critical: 'Critical Control Points'
        },
        general: {
          title: 'General Hygiene Management Points',
          items: [
            {
              title: '① Strict Inspection of Raw Materials',
              timing: 'Upon delivery and when opening packaging',
              method: 'Strictly verify appearance, odor, packaging integrity, expiration dates, and adherence to specified storage temperatures upon delivery.',
              problem: 'If standards are not met, immediately refuse reception and demand return or exchange from the supplier.'
            },
            {
              title: '② Monitoring Refrigerator/Freezer Temperatures',
              timing: 'Before opening, during idle times, and after closing (3 times/day)',
              method: 'Verify internal temperatures using digital thermometers at regular intervals (Fridge: under 10°C, Freezer: under -15°C).',
              problem: 'If an abnormality is detected, immediately identify the cause and adjust. Any ingredients suspected of degradation will be strictly discarded.'
            },
            {
              title: '③-1 Absolute Prevention of Cross/Secondary Contamination',
              timing: 'During all cooking and storage processes',
              method: 'Use color-coded designated cutting boards and knives for different ingredients. Strictly separate heated/non-heated ingredients in refrigerators and use sealed containers.',
              problem: 'If raw meat possibly contacts other ingredients, discard contaminated materials or perform thorough core heating. Re-wash and sanitize the used utensils thoroughly.'
            },
            {
              title: '③-2 Equipment Washing, Disinfecting, Sanitizing',
              timing: 'After each cooking task and at the end of business hours',
              method: 'Wash used utensils (cutting boards, knives, bowls) with neutral detergent, disinfect completely with approved sanitizers or boiling water, and store dry.',
              problem: 'If detergent residue or incomplete washing is found, restart the washing and disinfection process entirely.'
            },
            {
              title: '③-3 Cleaning & Disinfecting Restrooms',
              timing: 'Before opening, at regular operational intervals, and after closing',
              method: 'Use designated cleaning tools for restrooms. Meticulously disinfect high-touch areas like toilet bowls, handrails, flush levers, and doorknobs with alcohol or chlorine sanitizers.',
              problem: 'In case of significant soiling or vomit, promptly clean and thoroughly disinfect using a dedicated infectious disease control kit.'
            },
            {
              title: '④-1 Comprehensive Employee Health Management',
              timing: 'Upon reporting to work and before starting duties',
              method: 'Check temperatures, confirm health status (no digestive issues), inspect for hand wounds, and ensure correct wearing of designated clean uniforms/hats for all employees.',
              problem: 'Employees with digestive symptoms or fever will be sent home locally. Hand wounds mandate the use of waterproof bandages and disposable gloves.'
            },
            {
              title: '④-2 Strict Handwashing Protocols',
              timing: 'After restroom use, upon kitchen entry, before plating, and after handling raw meat/fish/allergens/money',
              method: 'Follow the official handwashing manual strictly: repeatedly wash with designated detergent, rinse, dry with paper towels, and finish with an alcohol spray.',
              problem: 'If an employee neglects handwashing at designated times or performs it inadequately, halt their work immediately and instruct them to re-wash correctly.'
            }
          ]
        },
        critical: {
          title: 'Critical Control Points by Culinary Group',
          group1: {
            title: 'Group 1 (Non-Heated & Fresh Menus)',
            targets: 'Salads, namuls, prep for raw meat, sashimi, and other fresh non-heated preparations',
            checks: [
              'Plate immediately before serving; never leave at room temperature after removing from the refrigerator.',
              'Strictly adhere to designated temperature storage based on quality labels and our internal regulations.',
              'Always wear disposable sanitary gloves when handling fresh goods; direct bare-hand contact with food is absolutely prohibited.',
              'Ensure all prep is done with sterilized tools and that hands are thoroughly washed before plating.'
            ]
          },
          group2: {
            title: 'Group 2 (Properly Heated & Served / Hot-Holding)',
            targets: 'Omi beef steaks, hamburg steaks, crispy fried chicken, specialty soups, etc.',
            checks: [
              'For thick meats (e.g., hamburg), verify that the core is sufficiently heated (e.g., reaching 75°C for at least 1 min) using a core thermometer.',
              'Judge cooking completeness holistically by visually verifying clear meat juices or golden crusts and appropriate texture.',
              'Ensure hot-holding equipment or warmers maintain safe, elevated temperatures (above 65°C) before serving soups or sauces.'
            ]
          },
          group3: {
            title: 'Group 3 (Rapidly Cooled after Heating / Reheated)',
            targets: 'Curries, stews, boiled ingredients for potato salads, pre-prepared roast beef, etc.',
            checks: [
              'After cooking, cool batches rapidly using ice baths to quickly pass the dangerous temperature zone (10°C–60°C), storing immediately in fridges/freezers.',
              'When reheating stored items, thoroughly confirm complete, core-deep heating (e.g., active boiling/bubbling throughout).',
              'Always use specifically designated clean tongs or ladles when transferring from the reheating pot to plating to completely avoid secondary contamination.'
            ]
          }
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
            status: 'Coming Soon'
          },
          cinema: {
            title: 'Movie Nights & Sports Viewing',
            description: 'Enjoy big‑screen viewing with our projector. Private bookings available.',
            status: 'Coming Soon'
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
        adminNote: '',
        items: [
          {
            date: '2026/04/30',
            title: 'Grand Opening - Officially starting Operations!',
            excerpt: 'We are finally ready! Trend Cooks will officially open its doors. We look forward to welcoming you in our trendy space.',
            category: 'Announcement'
          },
          {
            date: '2026/04/16',
            title: 'Pre-Opening Announcement',
            excerpt: 'Having received our food service permit, we are starting with a Pre-Opening! Experience our menu ahead of time while we finish the final touches.',
            category: 'Announcement'
          },
          {
            date: '2026/04/13',
            title: 'Official Website Launch & Reservations Open',
            excerpt: 'The Trend Cooks official website is now live. We are currently accepting online reservations.',
            category: 'Announcement'
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
          viral: {
            title: '🔥 SNS Trending & Viral Menu',
            desc: 'The latest viral hits with a Trend Cooks twist'
          },
          sweets: {
            title: '🍰 Sweets & Desserts'
          },
          dinner: {
            title: '🌙 Evening (17:00–23:30)',
            desc: 'Relax with small plates and projector ambience'
          },
          coffee: {
            title: '☕ Specialty Coffee',
            desc: 'Carefully crafted cups tailored to your preferred temperature, strength and sweetness',
            acidity: 'Acidity',
            bitterness: 'Bitterness/Richness',
            strength: 'Coffee Strength',
            light: 'Light',
            regular: 'Regular',
            strong: 'Strong',
            temperature: 'Temperature',
            hot: 'Hot',
            iced: 'Iced',
            iceAmount: 'Ice Amount (Iced only)',
            iceNormal: 'Normal',
            iceLess: 'Less Ice',
            iceMore: 'Extra Ice',
            iceNone: 'No Ice',
            syrup: 'Syrup (Sweetness)',
            syrupYes: 'Yes',
            syrupNo: 'None'
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