import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoWeAre from './components/WhoWeAre';
import Products from './components/Products';
import Software from './components/Software';
import Training from './components/Training';
import Internship from './components/Internship';
import Partners from './components/Partners';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between selection:bg-brand-purple/30 selection:text-white">
      {/* Navbar with scroll logic */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => scrollToId('products')}
        onAboutClick={() => scrollToId('about')}
      />

      {/* About Segment: Who We Are */}
      <WhoWeAre />

      {/* Products Segment: Smart Hardware & Modules */}
      <Products />

      {/* Software Segment: Cloud, Edge, and Live Telemetry Console */}
      <Software />

      {/* Training Segment: Developer Masterclass Courses */}
      <Training />

      {/* Internship & Certificate Segment */}
      <Internship />

      {/* Partners Segment: Silicon Partners & Client Reviews */}
      <Partners />

      {/* Events Segment: Silicon & Systems Showcases */}
      <Events />

      {/* Contact Segment: Inquiries Pipeline */}
      <Contact />

      {/* Footer and final CTA block */}
      <Footer />
    </div>
  );
}
