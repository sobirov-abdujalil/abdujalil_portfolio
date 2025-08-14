import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import PortfolioGrid from './components/PortfolioGrid';
import SkillsSection from './components/SkillsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const HomePortfolioShowcase = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Abdujalil - Full-Stack Developer | Modern Web Solutions';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 
        'Professional full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio and get a free project estimate.'
      );
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Professional full-stack developer specializing in React, Node.js, and modern web technologies. View my portfolio and get a free project estimate.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }

    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute('href');
      if (target && target?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners for smooth scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks?.forEach(link => {
      link?.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup
    return () => {
      anchorLinks?.forEach(link => {
        link?.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Portfolio Grid */}
        <PortfolioGrid />
        
        {/* Skills Section */}
        <SkillsSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePortfolioShowcase;