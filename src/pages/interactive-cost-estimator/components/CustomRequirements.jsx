import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomRequirements = ({ 
  customRequirements, 
  onRequirementsChange, 
  className = '' 
}) => {
  const [complexity, setComplexity] = useState(customRequirements?.complexity || 'medium');
  const [description, setDescription] = useState(customRequirements?.description || '');
  const [specialFeatures, setSpecialFeatures] = useState(customRequirements?.specialFeatures || '');
  const [integrations, setIntegrations] = useState(customRequirements?.integrations || '');

  const complexityOptions = [
    { 
      value: 'simple', 
      label: 'Simple',
      description: 'Basic functionality with minimal customization'
    },
    { 
      value: 'medium', 
      label: 'Medium',
      description: 'Standard features with some custom elements'
    },
    { 
      value: 'complex', 
      label: 'Complex',
      description: 'Advanced functionality with extensive customization'
    },
    { 
      value: 'enterprise', 
      label: 'Enterprise',
      description: 'Large-scale solution with complex integrations'
    }
  ];

  const handleComplexityChange = (value) => {
    setComplexity(value);
    updateRequirements({ complexity: value });
  };

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    setDescription(value);
    updateRequirements({ description: value });
  };

  const handleSpecialFeaturesChange = (e) => {
    const value = e?.target?.value;
    setSpecialFeatures(value);
    updateRequirements({ specialFeatures: value });
  };

  const handleIntegrationsChange = (e) => {
    const value = e?.target?.value;
    setIntegrations(value);
    updateRequirements({ integrations: value });
  };

  const updateRequirements = (updates) => {
    const newRequirements = {
      complexity,
      description,
      specialFeatures,
      integrations,
      ...updates
    };
    onRequirementsChange(newRequirements);
  };

  const getComplexityMultiplier = (complexityLevel) => {
    switch (complexityLevel) {
      case 'simple':
        return 0.8;
      case 'medium':
        return 1.0;
      case 'complex':
        return 1.4;
      case 'enterprise':
        return 2.0;
      default:
        return 1.0;
    }
  };

  const selectedComplexity = complexityOptions?.find(opt => opt?.value === complexity);

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Custom Requirements
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Tell us more about your specific needs and project complexity
        </p>
      </div>
      {/* Project Complexity */}
      <div className="space-y-4">
        <Select
          label="Project Complexity"
          description="Select the complexity level that best matches your project"
          options={complexityOptions}
          value={complexity}
          onChange={handleComplexityChange}
        />

        {selectedComplexity && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-accent" />
              <span className="font-medium text-foreground">
                {selectedComplexity?.label} Complexity
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedComplexity?.description}
            </p>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">Price multiplier:</span>
              <span className={`ml-2 font-medium ${
                getComplexityMultiplier(complexity) > 1 
                  ? 'text-warning' 
                  : getComplexityMultiplier(complexity) < 1 
                  ? 'text-success' :'text-foreground'
              }`}>
                {getComplexityMultiplier(complexity)}x
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Project Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Project Description
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Describe your project goals, target audience, and key objectives..."
          className="w-full px-3 py-2 border border-border rounded-md shadow-sm transition-micro focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-vertical"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Provide as much detail as possible to help us understand your vision
        </p>
      </div>
      {/* Special Features */}
      <Input
        label="Special Features or Functionality"
        type="text"
        value={specialFeatures}
        onChange={handleSpecialFeaturesChange}
        placeholder="e.g., Real-time chat, Advanced search, Custom animations..."
        description="List any unique features or functionality you need"
      />
      {/* Third-party Integrations */}
      <Input
        label="Required Integrations"
        type="text"
        value={integrations}
        onChange={handleIntegrationsChange}
        placeholder="e.g., CRM systems, Email marketing, Social media APIs..."
        description="Specify any third-party services or APIs you need integrated"
      />
      {/* Requirements Summary */}
      {(description || specialFeatures || integrations) && (
        <div className="bg-surface rounded-lg border border-border p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Icon name="FileText" size={16} className="mr-2 text-accent" />
            Requirements Summary
          </h4>
          
          <div className="space-y-3 text-sm">
            {description && (
              <div>
                <span className="font-medium text-foreground">Project Description:</span>
                <p className="text-muted-foreground mt-1">{description}</p>
              </div>
            )}
            
            {specialFeatures && (
              <div>
                <span className="font-medium text-foreground">Special Features:</span>
                <p className="text-muted-foreground mt-1">{specialFeatures}</p>
              </div>
            )}
            
            {integrations && (
              <div>
                <span className="font-medium text-foreground">Integrations:</span>
                <p className="text-muted-foreground mt-1">{integrations}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Helpful Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
          Helpful Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Be specific about your target audience and their needs</li>
          <li>• Mention any existing systems or platforms you use</li>
          <li>• Include any design preferences or brand guidelines</li>
          <li>• Note any technical constraints or requirements</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomRequirements;