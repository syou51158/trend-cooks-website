import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import AnimatedElement from '@/components/ui/AnimatedElement';
import { useParallax } from '@/hooks/useParallax';
import { useTranslation } from 'react-i18next';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const parallaxOffset = useParallax(0.15);
  const { t } = useTranslation();

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.0.alt'),
      category: t('gallery.images.0.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.1.alt'),
      category: t('gallery.images.1.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.2.alt'),
      category: t('gallery.images.2.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.3.alt'),
      category: t('gallery.images.3.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.4.alt'),
      category: t('gallery.images.4.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.5.alt'),
      category: t('gallery.images.5.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.6.alt'),
      category: t('gallery.images.6.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.7.alt'),
      category: t('gallery.images.7.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.8.alt'),
      category: t('gallery.images.8.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1543269664-647b4d4c4c2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.9.alt'),
      category: t('gallery.images.9.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.10.alt'),
      category: t('gallery.images.10.category')
    },
    {
      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt: t('gallery.images.11.alt'),
      category: t('gallery.images.11.category')
    }
  ];

  return (
    <section id="gallery" className="py-20 xl:py-24 2xl:py-32 bg-trend-bg relative overflow-hidden">
      {/* Floating background elements */}
      <div 
        className="absolute top-10 left-10 w-32 h-32 bg-trend-accent/5 rounded-full blur-2xl"
        style={{ transform: `translateY(${parallaxOffset * 0.8}px)` }}
      />
      <div 
        className="absolute bottom-20 right-20 w-48 h-48 bg-trend-accent/8 rounded-full blur-2xl"
        style={{ transform: `translateY(${parallaxOffset * -0.6}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-trend-accent/3 rounded-full blur-xl"
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
      />

      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <AnimatedElement animation="fadeInUp" delay={100}>
          <div className="text-center mb-16 xl:mb-20 2xl:mb-24">
            <h2 className="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-trend-text mb-4 xl:mb-6 2xl:mb-8 font-noto">
              {t('gallery.title')}
            </h2>
            <p className="text-lg xl:text-xl 2xl:text-2xl text-gray-600 font-noto">
              {t('gallery.subtitle')}
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 xl:gap-8 2xl:gap-10 mb-8 xl:mb-12 2xl:mb-16">
          {galleryImages.map((image, index) => (
            <AnimatedElement 
              key={index} 
              animation="scaleIn" 
              delay={200 + index * 30}
            >
              <Card 
                className="border-none shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={t('gallery.openImageAria', { alt: image.alt })}
                onClick={() => setSelectedImage(image.src)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setSelectedImage(image.src); } }}
              >
                <CardContent className="p-0">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                    width={400}
                    height={300}
                    className="w-full h-48 xl:h-56 2xl:h-64 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={t('gallery.previewAria')}
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button 
                className="absolute -top-10 right-0 text-white hover:text-trend-accent"
                aria-label={t('gallery.close')}
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <img src={selectedImage} alt={t('gallery.enlargedAlt')} className="w-full max-h-[80vh] object-contain rounded-lg" />
            </div>
          </div>
        )}

        <AnimatedElement animation="fadeIn" delay={600}>
          <div className="text-center">
            <p className="text-gray-600 xl:text-lg 2xl:text-xl font-noto">
              {t('gallery.photoNote')}
            </p>
          </div>
        </AnimatedElement>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-4xl max-h-full animate-in zoom-in duration-300">
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-10 shadow-lg"
                aria-label={t('gallery.close')}
              >
                <X size={24} className="text-trend-text" />
              </button>
              <img 
                src={selectedImage}
                alt={t('gallery.enlargedAlt2')}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 rounded-lg pointer-events-none"></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
