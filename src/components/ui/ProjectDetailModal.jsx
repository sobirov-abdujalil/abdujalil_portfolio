import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ProjectDetailModal = ({ 
  isOpen, 
  onClose, 
  project,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false 
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !project) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-1000 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-modal" />
      
      {/* Modal Content */}
      <div className="relative bg-card rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden transition-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-card-foreground">
              {project?.title}
            </h2>
            {project?.status && (
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                project?.status === 'completed' 
                  ? 'bg-success/10 text-success' 
                  : project?.status === 'in-progress' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
              }`}>
                {project?.status?.replace('-', ' ')?.toUpperCase()}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Navigation Arrows */}
            {hasPrevious && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                aria-label="Previous project"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
            )}
            
            {hasNext && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                aria-label="Next project"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            )}
            
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Hero Image */}
          {project?.image && (
            <div className="relative h-64 md:h-80 bg-muted">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover"
              />
              {project?.liveUrl && (
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    asChild
                  >
                    <a 
                      href={project?.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Live
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="p-6 space-y-6">
            {/* Project Overview */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                Project Overview
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project?.description || 'No description available.'}
              </p>
            </div>

            {/* Technologies Used */}
            {project?.technologies && project?.technologies?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            {project?.features && project?.features?.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project?.features?.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon 
                        name="Check" 
                        size={16} 
                        className="text-success mt-0.5 flex-shrink-0" 
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeline */}
              {(project?.startDate || project?.endDate || project?.duration) && (
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    Timeline
                  </h3>
                  <div className="space-y-2 text-sm">
                    {project?.startDate && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Started: {project?.startDate}
                        </span>
                      </div>
                    )}
                    {project?.endDate && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Completed: {project?.endDate}
                        </span>
                      </div>
                    )}
                    {project?.duration && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Duration: {project?.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Client Information */}
              {(project?.client || project?.industry) && (
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-3">
                    Client Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    {project?.client && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Building" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Client: {project?.client}
                        </span>
                      </div>
                    )}
                    {project?.industry && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Briefcase" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Industry: {project?.industry}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              {project?.liveUrl && (
                <Button
                  variant="default"
                  iconName="ExternalLink"
                  iconPosition="right"
                  asChild
                >
                  <a 
                    href={project?.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Live Site
                  </a>
                </Button>
              )}
              
              {project?.githubUrl && (
                <Button
                  variant="outline"
                  iconName="Github"
                  iconPosition="left"
                  asChild
                >
                  <a 
                    href={project?.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                </Button>
              )}
              
              <Button
                variant="secondary"
                iconName="MessageCircle"
                iconPosition="left"
                asChild
              >
                <a href="/contact-inquiry-form">
                  Discuss Similar Project
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectDetailModal;