import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: '店内バーチャル琵琶湖ビュー',
      category: '店内'
    },
    {
      src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: '近江牛炙り寿司',
      category: 'メニュー'
    },
    {
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'ライブステージ',
      category: 'イベント'
    },
    {
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: '近江牛スキレットステーキ',
      category: 'メニュー'
    },
    {
      src: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: '柳崎公園アウトドアイメージ',
      category: 'アウトドア'
    },
    {
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: 'モダンな店内インテリア',
      category: '店内'
    }
  ];

  return (
    <section id="gallery" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
          <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
            ギャラリー
          </h2>
          <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
            店内の雰囲気、創作メニュー、プロジェクター演出の様子など、フォトギャラリーでご覧ください。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8 2xl:gap-10 mb-8 xl:mb-12 2xl:mb-16">
          {galleryImages.map((image, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden group"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative h-64 xl:h-72 2xl:h-80">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/600x400/png';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 xl:bottom-6 xl:left-6 2xl:bottom-8 2xl:left-8">
                  <span className="bg-trend-accent text-white px-3 py-1 xl:px-4 xl:py-2 2xl:px-5 2xl:py-2 rounded-full text-sm xl:text-base 2xl:text-lg font-noto">
                    {image.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-4 xl:p-6 2xl:p-8">
                <p className="text-trend-text font-noto text-sm xl:text-base 2xl:text-lg">
                  {image.alt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
            ※写真は随時追加予定
          </p>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-full">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
              >
                <X size={24} className="text-trend-text" />
              </button>
              <img 
                src={selectedImage}
                alt="拡大表示"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
