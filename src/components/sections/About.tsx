
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            私たちのミッション
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20 items-center mb-16 xl:mb-20 2xl:mb-24">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="レストラン内装"
              className="rounded-lg shadow-lg w-full h-80 xl:h-96 2xl:h-[28rem] object-cover"
            />
          </div>
          <div>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-trend-text mb-6 xl:mb-8 2xl:mb-10 font-noto leading-relaxed">
              Trend Company株式会社は、「常にトレンドの先端」を追求する飲食ベンチャーです。屋台出店で培ったノウハウを活かし、本格店舗『Trend Cooks』をオープン。日々変化するトレンドを体験できる場を創り、地域と観光をつなぐ架け橋を目指します。
            </p>
          </div>
        </div>

        <div className="mb-16 xl:mb-20 2xl:mb-24">
          <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-text mb-8 xl:mb-12 2xl:mb-16 text-center font-noto">
            こだわりの空間
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 xl:p-8 2xl:p-10">
                <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-3 xl:mb-4 2xl:mb-6 font-noto">
                  ロケーション
                </h4>
                <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                  大津京駅から徒歩2分、ブランチ大津京の向かい側に位置する好立地。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 xl:p-8 2xl:p-10">
                <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-3 xl:mb-4 2xl:mb-6 font-noto">
                  インテリア
                </h4>
                <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                  ホワイト×木目を基調とし、間接LED×ピンスポットでモダンに演出。
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 xl:p-8 2xl:p-10">
                <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-3 xl:mb-4 2xl:mb-6 font-noto">
                  ステージ演出
                </h4>
                <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
                  可動式ステージ＆プロジェクターで、週末ライブや映像イベントも開催可能。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-trend-text mb-8 xl:mb-12 2xl:mb-16 font-noto">
            スタッフ紹介
          </h3>
          <Card className="max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto border-none shadow-lg">
            <CardContent className="p-8 xl:p-12 2xl:p-16">
              <div className="flex flex-col md:flex-row items-center gap-6 xl:gap-8 2xl:gap-12">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="代表 村岡翔"
                  className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-48 2xl:h-48 rounded-full object-cover"
                />
                <div className="text-center md:text-left">
                  <h4 className="text-xl xl:text-2xl 2xl:text-3xl font-semibold text-trend-accent mb-2 xl:mb-4 2xl:mb-6 font-noto">
                    代表 村岡翔
                  </h4>
                  <p className="text-trend-text xl:text-lg 2xl:text-xl font-noto">
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
