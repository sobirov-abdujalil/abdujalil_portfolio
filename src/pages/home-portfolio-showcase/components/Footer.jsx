import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const navigationLinks = [
    { label: 'Home', path: '/home-portfolio-showcase' },
    { label: 'Portfolio', path: '/home-portfolio-showcase#portfolio' },
    { label: 'Cost Estimator', path: '/interactive-cost-estimator' },
    { label: 'Contact', path: '/contact-inquiry-form' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: 'Github', url: 'https://github.com/abdujalil' },
    { name: 'LinkedIn', icon: 'Linkedin', url: 'https://linkedin.com/in/abdujalil' },
    { name: 'Twitter', icon: 'Twitter', url: 'https://twitter.com/abdujalil' },
    { name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/abdujalil' }
  ];

  const services = [
    'Web Development',
    'React Applications',
    'E-commerce Solutions',
    'UI/UX Design',
    'API Development',
    'Performance Optimization'
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-md flex items-center justify-center">
                <span className="text-primary font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-semibold">Abdujalil</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Full-stack developer creating modern, responsive web applications 
              that drive business growth and deliver exceptional user experiences.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={`Follow on ${social?.name}`}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {services?.map((service) => (
                <li key={service}>
                  <span className="text-primary-foreground/80">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@abdujalil.dev"
                className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Icon name="Mail" size={16} className="mr-3" />
                hello@abdujalil.dev
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                <Icon name="Phone" size={16} className="mr-3" />
                +1 (234) 567-8900
              </a>
              <div className="flex items-center text-primary-foreground/80">
                <Icon name="MapPin" size={16} className="mr-3" />
                San Francisco, CA
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Stay Updated</h4>
              <p className="text-sm text-primary-foreground/80 mb-3">
                Get the latest updates on web development trends and tips.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-md text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                />
                <button className="px-4 py-2 bg-primary-foreground text-primary rounded-r-md hover:bg-primary-foreground/90 transition-colors">
                  <Icon name="Send" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © {currentYear} Abdujalil. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;