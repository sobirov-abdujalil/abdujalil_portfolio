import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, formData }) => {
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

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const nextSteps = [
    {
      icon: 'Clock',
      title: 'Response Time',
      description: 'I\'ll get back to you within 24 hours'
    },
    {
      icon: 'Calendar',
      title: 'Initial Consultation',
      description: 'We\'ll schedule a call to discuss your project'
    },
    {
      icon: 'FileText',
      title: 'Project Proposal',
      description: 'You\'ll receive a detailed proposal within 2-3 days'
    }
  ];

  const modalContent = (
    <div 
      className="fixed inset-0 z-1000 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-modal" />
      
      <div className="relative bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-hidden transition-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="Check" size={20} className="text-success" />
            </div>
            <h2 className="text-xl font-semibold text-card-foreground">
              Message Sent Successfully!
            </h2>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close modal"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Thank You Message */}
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-4">
              Thank you for reaching out, {formData?.name}!
            </p>
            <p className="text-muted-foreground">
              I've received your inquiry about your {formData?.projectType} project and I'm excited to learn more about your vision.
            </p>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              What happens next?
            </h3>
            
            <div className="space-y-4">
              {nextSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name={step?.icon} size={16} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-card-foreground">
                      {step?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-surface rounded-lg border border-border p-4">
            <h4 className="font-medium text-card-foreground mb-3">
              Need to reach me urgently?
            </h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={14} className="text-muted-foreground" />
                <a 
                  href="mailto:hello@abdujalil.dev" 
                  className="text-sm text-accent hover:text-accent/80 transition-micro"
                >
                  hello@abdujalil.dev
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <a 
                  href="tel:+15551234567" 
                  className="text-sm text-accent hover:text-accent/80 transition-micro"
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>

          {/* Project Summary */}
          {formData && (
            <div className="bg-surface rounded-lg border border-border p-4">
              <h4 className="font-medium text-card-foreground mb-3">
                Your Project Summary
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Project Type:</span>
                  <p className="font-medium text-card-foreground">{formData?.projectType}</p>
                </div>
                {formData?.budget && (
                  <div>
                    <span className="text-muted-foreground">Budget:</span>
                    <p className="font-medium text-card-foreground">{formData?.budget}</p>
                  </div>
                )}
                {formData?.timeline && (
                  <div>
                    <span className="text-muted-foreground">Timeline:</span>
                    <p className="font-medium text-card-foreground">{formData?.timeline}</p>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">Contact Method:</span>
                  <p className="font-medium text-card-foreground">{formData?.preferredContact}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              asChild
              iconName="Home"
              iconPosition="left"
            >
              <Link to="/home-portfolio-showcase">
                Back to Portfolio
              </Link>
            </Button>
            
            <Button
              variant="outline"
              asChild
              iconName="Calculator"
              iconPosition="left"
            >
              <Link to="/interactive-cost-estimator">
                Try Cost Estimator
              </Link>
            </Button>
            
            <Button
              variant="secondary"
              onClick={onClose}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default SuccessModal;