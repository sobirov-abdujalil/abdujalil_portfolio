import React from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSelector = ({ selectedTimeline, onTimelineSelect, className = '' }) => {
  const timelineOptions = [
    {
      id: 'urgent',
      name: 'Urgent Delivery',
      description: 'Rush delivery with priority support',
      duration: '50% faster',
      priceMultiplier: 1.5,
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning',
      features: [
        'Priority development queue',
        'Daily progress updates',
        'Dedicated developer assigned'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Timeline',
      description: 'Balanced approach with regular updates',
      duration: 'Normal timeline',
      priceMultiplier: 1.0,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent',
      features: [
        'Regular progress updates',
        'Standard development process',
        'Quality assurance testing'
      ]
    },
    {
      id: 'flexible',
      name: 'Flexible Schedule',
      description: 'Extended timeline with cost savings',
      duration: '25% longer',
      priceMultiplier: 0.85,
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success',
      features: [
        'Cost-effective option',
        'Flexible milestone dates',
        'Thorough testing phase'
      ]
    }
  ];

  const getPriceImpact = (multiplier) => {
    if (multiplier > 1) {
      return `+${Math.round((multiplier - 1) * 100)}% cost`;
    } else if (multiplier < 1) {
      return `-${Math.round((1 - multiplier) * 100)}% cost`;
    }
    return 'Standard pricing';
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Choose Timeline
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your preferred project timeline and delivery speed
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {timelineOptions?.map((option) => (
          <div
            key={option?.id}
            onClick={() => onTimelineSelect(option)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTimeline?.id === option?.id
                ? `${option?.borderColor} ${option?.bgColor} shadow-sm`
                : 'border-border bg-card hover:border-accent/50'
            }`}
          >
            {/* Selection Indicator */}
            {selectedTimeline?.id === option?.id && (
              <div className={`absolute top-3 right-3 w-5 h-5 bg-accent rounded-full flex items-center justify-center`}>
                <Icon name="Check" size={12} className="text-accent-foreground" />
              </div>
            )}

            {/* Icon */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              selectedTimeline?.id === option?.id
                ? option?.bgColor
                : 'bg-muted'
            }`}>
              <Icon 
                name={option?.icon} 
                size={24} 
                className={selectedTimeline?.id === option?.id ? option?.color : 'text-muted-foreground'} 
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-card-foreground mb-1">
                  {option?.name}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {option?.description}
                </p>
              </div>

              {/* Timeline Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium text-foreground">
                    {option?.duration}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Price impact:</span>
                  <span className={`font-medium ${
                    option?.priceMultiplier > 1 
                      ? 'text-warning' 
                      : option?.priceMultiplier < 1 
                      ? 'text-success' :'text-foreground'
                  }`}>
                    {getPriceImpact(option?.priceMultiplier)}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Includes:</p>
                <ul className="space-y-1">
                  {option?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success mr-2 mt-0.5 flex-shrink-0" />
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

export default TimelineSelector;