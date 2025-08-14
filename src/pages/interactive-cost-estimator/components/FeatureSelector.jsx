import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const FeatureSelector = ({ selectedFeatures, onFeatureToggle, projectType, className = '' }) => {
  const featureCategories = [
    {
      id: 'authentication',
      name: 'User Authentication',
      features: [
        {
          id: 'basic-auth',
          name: 'Basic Login/Register',
          description: 'Email and password authentication',
          price: 800,
          timeline: '3-5 days',
          icon: 'User'
        },
        {
          id: 'social-auth',
          name: 'Social Media Login',
          description: 'Google, Facebook, Twitter integration',
          price: 600,
          timeline: '2-3 days',
          icon: 'Share2'
        },
        {
          id: 'two-factor',
          name: 'Two-Factor Authentication',
          description: 'SMS or email verification',
          price: 500,
          timeline: '2-3 days',
          icon: 'Shield'
        }
      ]
    },
    {
      id: 'payments',
      name: 'Payment Integration',
      features: [
        {
          id: 'stripe-payment',
          name: 'Stripe Payment Gateway',
          description: 'Credit card processing with Stripe',
          price: 1200,
          timeline: '4-6 days',
          icon: 'CreditCard'
        },
        {
          id: 'paypal-payment',
          name: 'PayPal Integration',
          description: 'PayPal payment processing',
          price: 800,
          timeline: '3-4 days',
          icon: 'DollarSign'
        },
        {
          id: 'subscription',
          name: 'Subscription Management',
          description: 'Recurring payment handling',
          price: 1500,
          timeline: '5-7 days',
          icon: 'RefreshCw'
        }
      ]
    },
    {
      id: 'admin',
      name: 'Admin & Management',
      features: [
        {
          id: 'admin-panel',
          name: 'Admin Dashboard',
          description: 'Complete admin interface',
          price: 2000,
          timeline: '7-10 days',
          icon: 'Settings'
        },
        {
          id: 'user-management',
          name: 'User Management',
          description: 'Manage users and permissions',
          price: 1000,
          timeline: '4-5 days',
          icon: 'Users'
        },
        {
          id: 'analytics',
          name: 'Analytics Dashboard',
          description: 'Usage statistics and reporting',
          price: 1500,
          timeline: '5-7 days',
          icon: 'BarChart3'
        }
      ]
    },
    {
      id: 'content',
      name: 'Content Management',
      features: [
        {
          id: 'cms',
          name: 'Content Management System',
          description: 'Easy content editing interface',
          price: 1800,
          timeline: '6-8 days',
          icon: 'Edit'
        },
        {
          id: 'blog',
          name: 'Blog System',
          description: 'Full-featured blog with categories',
          price: 1200,
          timeline: '4-6 days',
          icon: 'BookOpen'
        },
        {
          id: 'media-library',
          name: 'Media Library',
          description: 'Image and file management',
          price: 800,
          timeline: '3-4 days',
          icon: 'Image'
        }
      ]
    }
  ];

  const isFeatureSelected = (featureId) => {
    return selectedFeatures?.some(f => f?.id === featureId);
  };

  const handleFeatureChange = (feature, checked) => {
    onFeatureToggle(feature, checked);
  };

  const getRelevantCategories = () => {
    if (!projectType) return featureCategories;
    
    // Filter categories based on project type
    switch (projectType?.id) {
      case 'landing-page':
        return featureCategories?.filter(cat => 
          ['authentication', 'content']?.includes(cat?.id)
        );
      case 'web-app':
        return featureCategories;
      case 'ecommerce':
        return featureCategories?.filter(cat => 
          ['authentication', 'payments', 'admin']?.includes(cat?.id)
        );
      default:
        return featureCategories;
    }
  };

  const relevantCategories = getRelevantCategories();

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select Additional Features
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose the features you need for your project
        </p>
      </div>
      {relevantCategories?.map((category) => (
        <div key={category?.id} className="space-y-4">
          <h4 className="font-medium text-foreground flex items-center">
            <Icon name="Folder" size={16} className="mr-2 text-accent" />
            {category?.name}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category?.features?.map((feature) => (
              <div
                key={feature?.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isFeatureSelected(feature?.id)
                    ? 'border-accent bg-accent/5' :'border-border bg-card hover:border-accent/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={isFeatureSelected(feature?.id)}
                    onChange={(e) => handleFeatureChange(feature, e?.target?.checked)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon 
                        name={feature?.icon} 
                        size={16} 
                        className="text-accent flex-shrink-0" 
                      />
                      <h5 className="font-medium text-card-foreground">
                        {feature?.name}
                      </h5>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {feature?.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-muted-foreground">
                          +${feature?.price?.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">
                          {feature?.timeline}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      {selectedFeatures?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Package" size={48} className="mx-auto mb-3 opacity-50" />
          <p>No additional features selected</p>
          <p className="text-sm">Choose features to enhance your project</p>
        </div>
      )}
    </div>
  );
};

export default FeatureSelector;