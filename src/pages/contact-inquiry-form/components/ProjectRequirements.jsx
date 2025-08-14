import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectRequirements = ({ estimatorData }) => {
  if (!estimatorData) return null;

  const {
    projectType,
    features = [],
    timeline,
    budget,
    totalCost,
    deliveryTime
  } = estimatorData;

  const projectTypeLabels = {
    'landing-page': 'Landing Page',
    'web-app': 'Web Application',
    'ecommerce': 'E-commerce Store',
    'portfolio': 'Portfolio Website',
    'blog': 'Blog/CMS',
    'other': 'Custom Project'
  };

  const timelineLabels = {
    'urgent': 'Urgent (Rush delivery)',
    'standard': 'Standard Timeline',
    'flexible': 'Flexible Timeline'
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Calculator" size={20} className="text-accent" />
        <h3 className="text-lg font-semibold text-foreground">
          Project Requirements
        </h3>
      </div>
      <div className="space-y-4">
        {/* Project Type */}
        <div>
          <span className="text-sm text-muted-foreground">Project Type</span>
          <p className="font-medium text-foreground">
            {projectTypeLabels?.[projectType] || projectType}
          </p>
        </div>

        {/* Selected Features */}
        {features?.length > 0 && (
          <div>
            <span className="text-sm text-muted-foreground">Selected Features</span>
            <div className="mt-2 space-y-2">
              {features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline */}
        {timeline && (
          <div>
            <span className="text-sm text-muted-foreground">Timeline Preference</span>
            <p className="font-medium text-foreground">
              {timelineLabels?.[timeline] || timeline}
            </p>
          </div>
        )}

        {/* Budget Range */}
        {budget && (
          <div>
            <span className="text-sm text-muted-foreground">Budget Range</span>
            <p className="font-medium text-foreground">{budget}</p>
          </div>
        )}

        {/* Estimated Cost */}
        {totalCost && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated Cost</span>
              <span className="text-lg font-semibold text-accent">{totalCost}</span>
            </div>
            {deliveryTime && (
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">Delivery Time</span>
                <span className="text-sm font-medium text-foreground">{deliveryTime}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          This estimate is based on your selections and may vary based on specific requirements discussed during consultation.
        </p>
      </div>
    </div>
  );
};

export default ProjectRequirements;