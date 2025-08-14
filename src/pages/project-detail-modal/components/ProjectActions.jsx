import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectActions = ({ 
  liveUrl, 
  githubUrl, 
  caseStudyUrl,
  onShare,
  className = ''
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this project',
          url: window.location?.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else if (onShare) {
      onShare();
    }
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location?.href);
    const text = encodeURIComponent('Check out this amazing project by Abdujalil');
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location?.href);
    const text = encodeURIComponent('Check out this amazing project by @abdujalil');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {liveUrl && (
          <Button
            variant="default"
            iconName="ExternalLink"
            iconPosition="right"
            asChild
          >
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Live Demo
            </a>
          </Button>
        )}
        
        {githubUrl && (
          <Button
            variant="outline"
            iconName="Github"
            iconPosition="left"
            asChild
          >
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Source Code
            </a>
          </Button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {caseStudyUrl && (
          <Button
            variant="secondary"
            iconName="FileText"
            iconPosition="left"
            asChild
          >
            <a 
              href={caseStudyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Read Case Study
            </a>
          </Button>
        )}
        
        <Button
          variant="secondary"
          iconName="MessageCircle"
          iconPosition="left"
          asChild
        >
          <Link to="/contact-inquiry-form">
            Discuss Similar Project
          </Link>
        </Button>
      </div>

      {/* Social Sharing */}
      <div className="pt-4 border-t border-border">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">
          Share this project
        </h4>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={shareOnLinkedIn}
            aria-label="Share on LinkedIn"
          >
            <Icon name="Linkedin" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={shareOnTwitter}
            aria-label="Share on Twitter"
          >
            <Icon name="Twitter" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            aria-label="Share project"
          >
            <Icon name="Share2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectActions;