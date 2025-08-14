import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'hello@abdujalil.dev',
      href: 'mailto:hello@abdujalil.dev',
      description: 'Send me an email anytime'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      description: 'Call for urgent inquiries'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: 'San Francisco, CA',
      href: null,
      description: 'Available for local meetings'
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: 'Within 24 hours',
      href: null,
      description: 'Typical response timeframe'
    }
  ];

  const socialLinks = [
    {
      icon: 'Github',
      label: 'GitHub',
      href: 'https://github.com/abdujalil',
      color: 'hover:text-gray-900'
    },
    {
      icon: 'Linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/abdujalil',
      color: 'hover:text-blue-600'
    },
    {
      icon: 'Twitter',
      label: 'Twitter',
      href: 'https://twitter.com/abdujalil',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Get in Touch
        </h2>
        <p className="text-muted-foreground">
          Ready to start your project? Let's discuss your ideas and bring them to life.
        </p>
      </div>
      {/* Contact Methods */}
      <div className="space-y-4">
        {contactMethods?.map((method, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={method?.icon} size={18} className="text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{method?.label}</h3>
              {method?.href ? (
                <a
                  href={method?.href}
                  className="text-accent hover:text-accent/80 transition-micro font-medium"
                >
                  {method?.value}
                </a>
              ) : (
                <p className="text-foreground font-medium">{method?.value}</p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                {method?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Social Links */}
      <div>
        <h3 className="font-medium text-foreground mb-4">Connect with me</h3>
        <div className="flex space-x-4">
          {socialLinks?.map((social, index) => (
            <a
              key={index}
              href={social?.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 bg-muted rounded-lg flex items-center justify-center transition-micro hover:bg-muted/80 ${social?.color}`}
              aria-label={social?.label}
            >
              <Icon name={social?.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-medium text-foreground">Secure & Confidential</span>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>SSL encrypted communication</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>NDA available upon request</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name="Check" size={14} className="text-success" />
            <span>No spam, ever</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactInfo;