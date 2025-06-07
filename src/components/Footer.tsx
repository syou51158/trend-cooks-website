import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-trend-text text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-trend-accent mb-4 font-noto">Trend Cooks</h3>
            <p className="text-gray-300 font-noto">
              "流行のものを手軽に味わう"をコンセプトに、大津京エリアに誕生した創作料理店＆バー。
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-noto">アクセス</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 text-trend-accent" />
                <div className="text-sm text-gray-300 font-noto">
                  〒520-0022<br />
                  滋賀県大津市柳が崎9-15<br />
                  ルシェル西大津102号室
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-trend-accent" />
                <span className="text-sm text-gray-300">090-2115-6429</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-noto">営業時間</h4>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Clock size={16} className="mt-1 text-trend-accent" />
                <div className="text-sm text-gray-300 font-noto">
                  <div>昼：11:00 - 17:00（創作カフェ）</div>
                  <div>夜：17:00 - 23:30（スナック・バー）</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400 font-noto">
            © 2025 Trend Company株式会社. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
