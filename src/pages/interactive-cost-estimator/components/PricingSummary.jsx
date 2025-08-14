import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSummary = ({ 
  projectType, 
  selectedFeatures, 
  selectedTimeline, 
  onGetQuote,
  onSaveEstimate,
  className = '' 
}) => {
  const calculatePricing = () => {
    let basePrice = projectType?.basePrice || 0;
    let featuresPrice = selectedFeatures?.reduce((total, feature) => total + feature?.price, 0);
    let subtotal = basePrice + featuresPrice;
    let timelineMultiplier = selectedTimeline?.priceMultiplier || 1;
    let totalPrice = subtotal * timelineMultiplier;
    
    return {
      basePrice,
      featuresPrice,
      subtotal,
      timelineMultiplier,
      timelineAdjustment: subtotal * (timelineMultiplier - 1),
      totalPrice
    };
  };

  const calculateTimeline = () => {
    if (!projectType || !selectedTimeline) return 'TBD';
    
    let baseDays = 14; // Default 2 weeks
    
    switch (projectType?.id) {
      case 'landing-page':
        baseDays = 10;
        break;
      case 'web-app':
        baseDays = 35;
        break;
      case 'ecommerce':
        baseDays = 60;
        break;
    }
    
    // Add feature days
    const featureDays = selectedFeatures?.reduce((total, feature) => {
      const days = parseInt(feature?.timeline?.split('-')?.[0]) || 3;
      return total + days;
    }, 0);
    
    let totalDays = baseDays + featureDays;
    
    // Apply timeline multiplier
    switch (selectedTimeline?.id) {
      case 'urgent':
        totalDays = Math.ceil(totalDays * 0.5);
        break;
      case 'flexible':
        totalDays = Math.ceil(totalDays * 1.25);
        break;
    }
    
    const weeks = Math.ceil(totalDays / 7);
    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  };

  const getEstimatedDelivery = () => {
    if (!selectedTimeline) return 'TBD';
    
    const timeline = calculateTimeline();
    const weeks = parseInt(timeline?.split(' ')?.[0]);
    const deliveryDate = new Date();
    deliveryDate?.setDate(deliveryDate?.getDate() + (weeks * 7));
    
    return deliveryDate?.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const pricing = calculatePricing();
  const timeline = calculateTimeline();
  const deliveryDate = getEstimatedDelivery();

  const isComplete = projectType && selectedTimeline;

  return (
    <div className={`bg-card rounded-lg border border-border p-6 sticky top-24 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">
          Project Estimate
        </h3>
        <Icon name="Calculator" size={20} className="text-accent" />
      </div>
      {!isComplete ? (
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-2">
            Complete the form to see your estimate
          </p>
          <p className="text-sm text-muted-foreground">
            Select project type and timeline to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Project Overview */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Project Type</span>
              <span className="font-medium text-foreground">{projectType?.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Timeline</span>
              <span className="font-medium text-foreground">{selectedTimeline?.name}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Duration</span>
              <span className="font-medium text-foreground">{timeline}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Delivery Date</span>
              <span className="font-medium text-foreground">{deliveryDate}</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-card-foreground mb-3">Cost Breakdown</h4>
            
            <div className="space-y-2">
              {/* Base Price */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base {projectType?.name}</span>
                <span className="text-foreground">${pricing?.basePrice?.toLocaleString()}</span>
              </div>

              {/* Features */}
              {selectedFeatures?.map((feature) => (
                <div key={feature?.id} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">+ {feature?.name}</span>
                  <span className="text-foreground">${feature?.price?.toLocaleString()}</span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm pt-2 border-t border-border">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  ${pricing?.subtotal?.toLocaleString()}
                </span>
              </div>

              {/* Timeline Adjustment */}
              {pricing?.timelineMultiplier !== 1 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {selectedTimeline?.name} Adjustment
                  </span>
                  <span className={`font-medium ${
                    pricing?.timelineAdjustment > 0 ? 'text-warning' : 'text-success'
                  }`}>
                    {pricing?.timelineAdjustment > 0 ? '+' : ''}
                    ${Math.abs(pricing?.timelineAdjustment)?.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-card-foreground">Total</span>
              <span className="text-2xl font-bold text-accent">
                ${pricing?.totalPrice?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Selected Features Summary */}
          {selectedFeatures?.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-card-foreground mb-3">Selected Features</h4>
              <div className="space-y-2">
                {selectedFeatures?.map((feature) => (
                  <div key={feature?.id} className="flex items-center text-sm">
                    <Icon name="Check" size={14} className="text-success mr-2" />
                    <span className="text-muted-foreground">{feature?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              iconName="MessageCircle"
              iconPosition="right"
              onClick={onGetQuote}
            >
              Get Detailed Quote
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              iconName="Save"
              iconPosition="left"
              onClick={onSaveEstimate}
            >
              Save Estimate
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground pt-4 border-t border-border">
            <p>
              * This is an estimated quote based on your selections. 
              Final pricing may vary based on specific requirements and project complexity.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSummary;