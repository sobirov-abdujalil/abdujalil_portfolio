import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  orientation = 'horizontal',
  showLabels = true,
  className = ''
}) => {
  const defaultSteps = [
    { id: 1, label: 'Project Type', icon: 'Layers' },
    { id: 2, label: 'Requirements', icon: 'CheckSquare' },
    { id: 3, label: 'Timeline', icon: 'Calendar' },
    { id: 4, label: 'Summary', icon: 'FileText' }
  ];

  const progressSteps = steps?.length > 0 ? steps : defaultSteps?.slice(0, totalSteps);
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const getStepStatus = (stepNumber) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-accent text-accent-foreground border-accent';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getLabelClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success font-medium';
      case 'current':
        return 'text-accent font-semibold';
      case 'upcoming':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  if (orientation === 'vertical') {
    return (
      <div className={`flex flex-col space-y-4 ${className}`}>
        {progressSteps?.map((step, index) => {
          const stepNumber = index + 1;
          const status = getStepStatus(stepNumber);
          
          return (
            <div key={step?.id} className="flex items-center space-x-3">
              {/* Step Circle */}
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 transition-micro
                ${getStepClasses(status)}
              `}>
                {status === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              {/* Step Label */}
              {showLabels && (
                <div className="flex-1">
                  <span className={`text-sm transition-micro ${getLabelClasses(status)}`}>
                    {step?.label}
                  </span>
                </div>
              )}
              {/* Connector Line */}
              {index < progressSteps?.length - 1 && (
                <div className="absolute left-4 mt-8 w-0.5 h-4 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal orientation (default)
  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-border" />
        <div 
          className="absolute top-4 left-0 h-0.5 bg-accent transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
        
        {/* Step Circles */}
        <div className="relative flex justify-between">
          {progressSteps?.map((step, index) => {
            const stepNumber = index + 1;
            const status = getStepStatus(stepNumber);
            
            return (
              <div key={step?.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background transition-micro
                  ${getStepClasses(status)}
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-xs font-semibold">{stepNumber}</span>
                  )}
                </div>
                {/* Step Label */}
                {showLabels && (
                  <div className="mt-2 text-center">
                    <span className={`text-xs transition-micro ${getLabelClasses(status)}`}>
                      {step?.label}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Mobile Step Indicator */}
      <div className="md:hidden text-center">
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        {showLabels && (
          <div className="mt-1">
            <span className="text-sm font-medium text-foreground">
              {progressSteps?.[currentStep - 1]?.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;