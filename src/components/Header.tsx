import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.menu'), href: '#menu' },
    { name: t('nav.events'), href: '#events' },
    { name: t('nav.news'), href: '#news' },
    { name: t('nav.gallery'), href: '#gallery' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language?.startsWith('en') ? 'ja' : 'en';
    void i18n.changeLanguage(newLang);
  };

  // 変更: 現在の言語ではなく「切り替え先の言語」を表示
  const nextLangDisplay = i18n.language?.startsWith('en') ? '日本語' : 'EN';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`} role="banner" aria-label={t('nav.aria.header')}>
      <div className="max-w-7xl xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex justify-between items-center h-16 xl:h-18 2xl:h-20">
          <div className="flex-shrink-0">
            <h1 className={`text-2xl xl:text-3xl 2xl:text-4xl font-bold font-noto ${isScrolled ? 'text-trend-accent' : 'text-white drop-shadow'}`}>Trend Cooks</h1>
          </div>

          <nav className="hidden md:block" role="navigation" aria-label={t('nav.aria.main')}>
            <div className="ml-10 xl:ml-12 2xl:ml-16 flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`${isScrolled ? 'text-trend-text' : 'text-white'} hover:text-trend-accent px-3 py-2 text-sm xl:text-base 2xl:text-lg font-medium transition-colors duration-200 font-noto break-keep whitespace-nowrap`}
                  aria-label={t('nav.aria.goTo', { section: item.name })}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={toggleLanguage}
                className={`${isScrolled ? 'text-trend-text/80' : 'text-white/90'} hover:text-trend-accent px-3 py-2 text-sm xl:text-base 2xl:text-lg font-medium flex items-center gap-1 transition-colors duration-200 break-keep whitespace-nowrap`}
                aria-label={t('nav.language')}
                title={t('nav.language')}
              >
                <Globe size={16} />
                {nextLangDisplay}
              </button>
            </div>
          </nav>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-trend-text"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t('nav.aria.closeMenu') : t('nav.aria.openMenu')}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu" role="navigation" aria-label={t('nav.aria.mobile')}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-sm rounded-lg mt-2 shadow-lg">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-trend-text hover:text-trend-accent block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200 font-noto break-keep whitespace-nowrap"
                  aria-label={t('nav.aria.goTo', { section: item.name })}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={toggleLanguage}
                className="text-trend-text/80 hover:text-trend-accent block px-3 py-2 text-base font-medium w-full text-left flex items-center gap-2 break-keep whitespace-nowrap"
                aria-label={t('nav.language')}
                title={t('nav.language')}
              >
                <Globe size={16} />
                {nextLangDisplay}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
