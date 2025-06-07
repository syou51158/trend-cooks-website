import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import About from './components/sections/About';
import Menu from './components/sections/Menu';
import Events from './components/sections/Events';
import News from './components/sections/News';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-trend-bg">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <Menu />
        <Events />
        <News />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
