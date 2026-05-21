import { useState, useEffect } from 'react';

interface SafeImageProps {
  src: string | null;
  alt: string;
  className?: string;
  fallbackIcon?: string;
}

export const SafeImage = ({ src, alt, className, fallbackIcon = '🍽️' }: SafeImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [retryStage, setRetryStage] = useState<number>(0); 
  // 0: 初期URL, 1: 独自ドメイン+サブディレクトリあり, 2: 独自ドメイン+サブディレクトリなし, 3: 共有SSL, 4: プレースホルダー

  useEffect(() => {
    setCurrentSrc(src);
    setRetryStage(0);
  }, [src]);

  if (!src || retryStage === 4) {
    return (
      <div className="fallback-icon text-5xl text-gray-400 flex items-center justify-center w-full h-full bg-zinc-900">
        {fallbackIcon}
      </div>
    );
  }

  const handleError = () => {
    try {
      const urlObj = new URL(currentSrc || '', window.location.href);
      let path = urlObj.pathname;
      
      // /trendcooks プレフィックスをトリミングしてクリーンなパスを取り出す
      if (path.startsWith('/trendcooks')) {
        path = path.substring('/trendcooks'.length);
      }
      
      const finalPath = path + urlObj.search;

      if (retryStage === 0) {
        // ステージ1: 独自ドメイン + サブディレクトリあり
        setRetryStage(1);
        setCurrentSrc(`https://www.trend-cooks.jp/trendcooks${finalPath}`);
      } else if (retryStage === 1) {
        // ステージ2: 独自ドメイン + サブディレクトリなし
        setRetryStage(2);
        setCurrentSrc(`https://www.trend-cooks.jp${finalPath}`);
      } else if (retryStage === 2) {
        // ステージ3: ロリポップ共有SSL + サブディレクトリあり
        setRetryStage(3);
        setCurrentSrc(`https://deci-jp-trendcompany.ssl-lolipop.jp/trendcooks${finalPath}`);
      } else {
        // すべて失敗した場合
        setRetryStage(4);
      }
    } catch (err) {
      console.error('Error in SafeImage fallback chain:', err);
      setRetryStage(4);
    }
  };

  return (
    <img
      src={currentSrc || ''}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
