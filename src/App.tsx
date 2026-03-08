
import { Suspense, lazy } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
// import Features from './components/sections/Features';
// import About from './components/sections/About';
// import Menu from './components/sections/Menu';
// import Events from './components/sections/Events';
// import News from './components/sections/News';
// import Gallery from './components/sections/Gallery';
// import Contact from './components/sections/Contact';
import './App.css';
import { useTranslation } from 'react-i18next';

const Features = lazy(() => import('./components/sections/Features'));
const About = lazy(() => import('./components/sections/About'));
const Menu = lazy(() => import('./components/sections/Menu'));
const Events = lazy(() => import('./components/sections/Events'));
const News = lazy(() => import('./components/sections/News'));
const Gallery = lazy(() => import('./components/sections/Gallery'));
const Contact = lazy(() => import('./components/sections/Contact'));

function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-trend-bg">
      {/* Skip to content link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-trend-accent text-white px-4 py-2 rounded-md shadow">{t('common.skipToContent')}</a>
      <Header />
      <main id="main-content" role="main">
        <Hero />
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-trend-text">{t('common.loading')}</div>}>
          <Features />
          <About />
          <Menu />
          <Events />
          <News />
          <Gallery />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
