import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectNavigation = ({ 
  onPrevious, 
  onNext, 
  hasPrevious = false, 
  hasNext = false,
  currentIndex = 0,
  totalProjects = 0,
  className = ''
}) => {
  if (!hasPrevious && !hasNext) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Previous Button */}
      <div className="flex items-center space-x-2">
        {hasPrevious ? (
          <Button
            variant="ghost"
            onClick={onPrevious}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous Project
          </Button>
        ) : (
          <div /> // Spacer
        )}
      </div>

      {/* Project Counter */}
      {totalProjects > 0 && (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Grid3x3" size={14} />
          <span>
            {currentIndex + 1} of {totalProjects}
          </span>
        </div>
      )}

      {/* Next Button */}
      <div className="flex items-center space-x-2">
        {hasNext ? (
          <Button
            variant="ghost"
            onClick={onNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next Project
          </Button>
        ) : (
          <div /> // Spacer
        )}
      </div>
    </div>
  );
};

export default ProjectNavigation;