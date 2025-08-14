import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-accent to-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA Content */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
            Let's discuss your ideas and create something amazing together. 
            Get a free consultation and project estimate tailored to your needs.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            variant="secondary"
            size="lg"
            iconName="Calculator"
            iconPosition="left"
            className="w-full sm:w-auto bg-white text-accent hover:bg-white/90"
            asChild
          >
            <Link to="/interactive-cost-estimator">Get Free Estimate</Link>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="MessageCircle"
            iconPosition="left"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-accent"
            asChild
          >
            <Link to="/contact-inquiry-form">Start Discussion</Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Zap" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Fast Delivery</h3>
            <p className="text-white/80 text-sm">
              Quick turnaround times without compromising on quality
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Quality Assured</h3>
            <p className="text-white/80 text-sm">
              Rigorous testing and quality checks for every project
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="HeartHandshake" size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Ongoing Support</h3>
            <p className="text-white/80 text-sm">
              Continued maintenance and support after project completion
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-white/80 mb-4">
            Prefer to talk directly? I'm here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white">
            <a 
              href="mailto:hello@abdujalil.dev" 
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <Icon name="Mail" size={16} className="mr-2" />
              hello@abdujalil.dev
            </a>
            <a 
              href="tel:+1234567890" 
              className="flex items-center hover:text-white/80 transition-colors"
            >
              <Icon name="Phone" size={16} className="mr-2" />
              +1 (234) 567-8900
            </a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-4 hidden lg:block">
        <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-3/4 right-8 hidden lg:block">
        <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default CTASection;