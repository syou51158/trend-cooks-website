
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-trend-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-trend-text mb-4 font-noto">
            私たちのミッション
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="レストラン内装"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
            />
          </div>
          <div>
            <p className="text-lg text-trend-text mb-6 font-noto leading-relaxed">
              Trend Company株式会社は、「常にトレンドの先端」を追求する飲食ベンチャーです。屋台出店で培ったノウハウを活かし、本格店舗『Trend Cooks』をオープン。日々変化するトレンドを体験できる場を創り、地域と観光をつなぐ架け橋を目指します。
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-trend-text mb-8 text-center font-noto">
            こだわりの空間
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-trend-accent mb-3 font-noto">
                  ロケーション
                </h4>
                <p className="text-trend-text font-noto">
                  大津京駅から徒歩2分、ブランチ大津京の向かい側に位置する好立地。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-trend-accent mb-3 font-noto">
                  インテリア
                </h4>
                <p className="text-trend-text font-noto">
                  ホワイト×木目を基調とし、間接LED×ピンスポットでモダンに演出。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-trend-accent mb-3 font-noto">
                  ステージ演出
                </h4>
                <p className="text-trend-text font-noto">
                  可動式ステージ＆プロジェクターで、週末ライブや映像イベントも開催可能。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-trend-text mb-8 font-noto">
            スタッフ紹介
          </h3>
          <Card className="max-w-2xl mx-auto border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="代表 村岡翔"
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-semibold text-trend-accent mb-2 font-noto">
                    代表 村岡翔
                  </h4>
                  <p className="text-trend-text font-noto">
                    創業から３年、全国屋台出店を経て本格店舗を立ち上げ。外国人ガイド経験を活かした送迎サービスも実施中。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
