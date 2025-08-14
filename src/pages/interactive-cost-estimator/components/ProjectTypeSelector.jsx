import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTypeSelector = ({ selectedType, onTypeSelect, className = '' }) => {
  const projectTypes = [
    {
      id: 'landing-page',
      name: 'Landing Page',
      description: 'Single page website with contact form and basic information',
      icon: 'FileText',
      basePrice: 1500,
      timeline: '1-2 weeks',
      features: ['Responsive Design', 'Contact Form', 'SEO Optimization']
    },
    {
      id: 'web-app',
      name: 'Web Application',
      description: 'Interactive web application with user authentication and database',
      icon: 'Globe',
      basePrice: 5000,
      timeline: '4-8 weeks',
      features: ['User Authentication', 'Database Integration', 'Admin Dashboard']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Full-featured online store with payment processing and inventory',
      icon: 'ShoppingCart',
      basePrice: 8000,
      timeline: '6-12 weeks',
      features: ['Product Catalog', 'Payment Gateway', 'Order Management']
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select Project Type
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the type of project you need developed
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectTypes?.map((type) => (
          <div
            key={type?.id}
            onClick={() => onTypeSelect(type)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedType?.id === type?.id
                ? 'border-accent bg-accent/5 shadow-sm'
                : 'border-border bg-card hover:border-accent/50'
            }`}
          >
            {/* Selection Indicator */}
            {selectedType?.id === type?.id && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-accent-foreground" />
              </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              selectedType?.id === type?.id
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name={type?.icon} size={24} />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h4 className="font-semibold text-card-foreground">{type?.name}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {type?.description}
              </p>
              
              <div className="pt-2 space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Starting from:</span>
                  <span className="font-semibold text-foreground">
                    ${type?.basePrice?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Timeline:</span>
                  <span className="text-foreground">{type?.timeline}</span>
                </div>
              </div>

              {/* Features */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Includes:</p>
                <ul className="space-y-1">
                  {type?.features?.slice(0, 3)?.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeSelector;