import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    menu: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitMessage('お問い合わせありがとうございます。24時間以内にご連絡いたします。');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '',
        menu: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 xl:py-24 2xl:py-32 bg-white">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            ご予約・お問い合わせ
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
            お気軽にお問い合わせください。お待ちしております。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 2xl:gap-20">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl xl:text-3xl 2xl:text-4xl font-noto text-trend-text">
                オンライン予約フォーム
              </CardTitle>
            </CardHeader>
            <CardContent className="xl:p-8 2xl:p-10">
              <form onSubmit={handleSubmit} className="space-y-6 xl:space-y-8 2xl:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="font-noto">お名前 *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="font-noto">メールアドレス *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="font-noto">電話番号</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date" className="font-noto">ご希望日 *</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="font-noto">ご希望時間 *</Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests" className="font-noto">人数 *</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.guests}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="menu" className="font-noto">ご希望メニュー</Label>
                  <Input
                    id="menu"
                    name="menu"
                    value={formData.menu}
                    onChange={handleInputChange}
                    placeholder="例：近江牛コース、飲み放題プラン"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="font-noto">その他ご要望</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="アレルギー、記念日、送迎サービスご希望など"
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-trend-accent hover:bg-trend-accent/90 text-white xl:text-lg 2xl:text-xl xl:py-3 2xl:py-4 font-noto"
                >
                  {isSubmitting ? '送信中...' : '予約を送信'}
                  <Send className="ml-2" size={16} />
                </Button>

                {submitMessage && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-noto">{submitMessage}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 xl:space-y-12 2xl:space-y-16">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl xl:text-3xl 2xl:text-4xl font-noto text-trend-text">
                  店舗情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 xl:space-y-8 2xl:space-y-10 xl:p-8 2xl:p-10">
                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <MapPin className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">住所</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                      〒520-0022<br />
                      滋賀県大津市柳が崎9-15<br />
                      ルシェル西大津102号室
                    </p>
                    <p className="text-sm xl:text-base 2xl:text-lg text-gray-500 font-noto mt-1">
                      JR大津京駅より徒歩20分<br />
                      Pなし（近隣コインパーキングをご利用ください）
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <Phone className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">電話予約</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">090-2115-6429</p>
                    <p className="text-sm xl:text-base 2xl:text-lg text-gray-500 font-noto">代表・村岡</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <Clock className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">営業時間</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                      昼：11:00 - 17:00（創作カフェ）<br />
                      夜：17:00 - 23:30（スナック・バー）
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 xl:space-x-4 2xl:space-x-6">
                  <Mail className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 text-trend-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-trend-text xl:text-lg 2xl:text-xl font-noto">無料送迎サービス</h4>
                    <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
                      大津京駅⇔店舗間<br />
                      <span className="text-sm xl:text-base 2xl:text-lg text-gray-500">（要事前予約）</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 xl:p-8 2xl:p-10">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 xl:text-lg 2xl:text-xl font-noto">Google Maps（実装予定）</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
