import React from 'react';
import Icon from '../../../components/AppIcon';

const TechnologyStack = ({ technologies = [] }) => {
  if (!technologies || technologies?.length === 0) {
    return null;
  }

  // Categorize technologies
  const categorizedTech = technologies?.reduce((acc, tech) => {
    const category = tech?.category || 'other';
    if (!acc?.[category]) {
      acc[category] = [];
    }
    acc?.[category]?.push(tech);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'frontend':
        return 'Monitor';
      case 'backend':
        return 'Server';
      case 'database':
        return 'Database';
      case 'tools':
        return 'Wrench';
      case 'deployment':
        return 'Cloud';
      default:
        return 'Code';
    }
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'frontend':
        return 'Frontend';
      case 'backend':
        return 'Backend';
      case 'database':
        return 'Database';
      case 'tools':
        return 'Tools & Libraries';
      case 'deployment':
        return 'Deployment';
      default:
        return 'Technologies';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center">
        <Icon name="Code" size={20} className="mr-2" />
        Technology Stack
      </h3>
      <div className="space-y-4">
        {Object.entries(categorizedTech)?.map(([category, techs]) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
              <Icon name={getCategoryIcon(category)} size={14} className="mr-2" />
              {getCategoryTitle(category)}
            </h4>
            <div className="flex flex-wrap gap-2">
              {techs?.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm font-medium hover:bg-accent/10 hover:text-accent transition-micro"
                  title={tech?.description || tech?.name}
                >
                  {tech?.icon && (
                    <Icon name={tech?.icon} size={14} className="mr-1.5" />
                  )}
                  {tech?.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnologyStack;