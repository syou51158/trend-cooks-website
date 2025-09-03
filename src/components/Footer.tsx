
import { MapPin, Phone, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-trend-text text-white py-12 xl:py-16 2xl:py-20">
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12 2xl:gap-16">
          <div>
            <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold text-trend-accent mb-4 xl:mb-6 2xl:mb-8 font-noto">{t('common.brand')}</h3>
            <p className="text-gray-300 xl:text-lg 2xl:text-xl font-noto">
              {t('footer.concept')}
            </p>
          </div>

          <div>
            <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4 xl:mb-6 2xl:mb-8 font-noto">{t('footer.access')}</h4>
            <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
              <div className="flex items-start space-x-2 xl:space-x-3 2xl:space-x-4">
                <MapPin size={16} className="mt-1 text-trend-accent xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                <div className="text-sm xl:text-base 2xl:text-lg text-gray-300 font-noto">
                  {t('common.address.zip')}<br />
                  {t('common.address.line1')}<br />
                  {t('common.address.line2')}
                </div>
              </div>
              <div className="flex items-center space-x-2 xl:space-x-3 2xl:space-x-4">
                <Phone size={16} className="text-trend-accent xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                <span className="text-sm xl:text-base 2xl:text-lg text-gray-300">{t('common.phone')}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg xl:text-xl 2xl:text-2xl font-semibold mb-4 xl:mb-6 2xl:mb-8 font-noto">{t('footer.hoursTitle')}</h4>
            <div className="space-y-2 xl:space-y-3 2xl:space-y-4">
              <div className="flex items-start space-x-2 xl:space-x-3 2xl:space-x-4">
                <Clock size={16} className="mt-1 text-trend-accent xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                <div className="text-sm xl:text-base 2xl:text-lg text-gray-300 font-noto">
                  <div>{t('common.hours.day')}</div>
                  <div>{t('common.hours.night')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 xl:mt-12 2xl:mt-16 pt-8 xl:pt-12 2xl:pt-16 text-center">
          <p className="text-sm xl:text-base 2xl:text-lg text-gray-400 font-noto">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
