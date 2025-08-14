import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-surface to-muted overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-text-primary mb-4">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Abdujalil
            </span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-text-secondary font-medium mb-2">
            Full-Stack Developer
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I create modern, responsive web applications that drive business growth. 
            From concept to deployment, I deliver solutions that exceed expectations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent">3+</div>
            <div className="text-sm text-muted-foreground">Years Exp</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-accent">100%</div>
            <div className="text-sm text-muted-foreground">Satisfied</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            variant="default"
            size="lg"
            iconName="Eye"
            iconPosition="left"
            className="w-full sm:w-auto"
            asChild
          >
            <a href="#portfolio">View Portfolio</a>
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            iconName="Calculator"
            iconPosition="left"
            className="w-full sm:w-auto"
            asChild
          >
            <Link to="/interactive-cost-estimator">Get Quote</Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-muted-foreground mx-auto" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-4 hidden lg:block">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      </div>
      <div className="absolute top-3/4 right-8 hidden lg:block">
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default HeroSection;