import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, Video, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-trend-accent" />,
      title: '昼夜二毛作',
      description: '11:00–17:00は創作カフェ、17:00–23:30はスナック・バー営業。'
    },
    {
      icon: <Star className="w-8 h-8 text-trend-accent" />,
      title: '近江牛創作',
      description: 'A5ランク近江牛を使った炙り寿司／スキレットステーキなどプレミアムメニュー。'
    },
    {
      icon: <Video className="w-8 h-8 text-trend-accent" />,
      title: 'バーチャル琵琶湖ビュー',
      description: 'Nebulaレーザープロジェクターで湖畔の風景を店内に投影。'
    },
    {
      icon: <Users className="w-8 h-8 text-trend-accent" />,
      title: '地域交流',
      description: '通りがかりの子ども向け無料試食、柳崎公園でのアウトドアイベントも構想中。'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-trend-text mb-4 font-noto">
            注目ポイント
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-trend-text mb-3 font-noto">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-noto leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
