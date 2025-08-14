import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline?.length === 0) {
    return null;
  }

  const getPhaseIcon = (phase) => {
    switch (phase?.toLowerCase()) {
      case 'planning':
        return 'Target';
      case 'design':
        return 'Palette';
      case 'development':
        return 'Code';
      case 'testing':
        return 'TestTube';
      case 'deployment':
        return 'Rocket';
      case 'launch':
        return 'Globe';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'in-progress':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'upcoming':
        return 'text-muted-foreground bg-muted border-border';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center">
        <Icon name="Clock" size={20} className="mr-2" />
        Project Timeline
      </h3>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
        
        <div className="space-y-4">
          {timeline?.map((item, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Timeline Dot */}
              <div className={`
                relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-micro
                ${getStatusColor(item?.status)}
              `}>
                <Icon name={getPhaseIcon(item?.phase)} size={14} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-card-foreground">
                    {item?.phase}
                  </h4>
                  {item?.duration && (
                    <span className="text-xs text-muted-foreground">
                      {item?.duration}
                    </span>
                  )}
                </div>
                
                {item?.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item?.description}
                  </p>
                )}
                
                {item?.deliverables && item?.deliverables?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {item?.deliverables?.map((deliverable, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-center">
                        <Icon name="Check" size={12} className="mr-1.5 text-success" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                )}
                
                {item?.date && (
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    {item?.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;