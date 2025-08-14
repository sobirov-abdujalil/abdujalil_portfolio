import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectImageCarousel = ({ images = [], title = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images?.length === 0) {
    return (
      <div className="relative h-64 md:h-80 bg-muted rounded-lg flex items-center justify-center">
        <Icon name="Image" size={48} className="text-muted-foreground" />
      </div>
    );
  }

  const handlePrevious = () => {
    setCurrentImageIndex(prev => prev === 0 ? images?.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => prev === images?.length - 1 ? 0 : prev + 1);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-64 md:h-80 bg-muted rounded-lg overflow-hidden group">
        <Image
          src={images?.[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-pointer ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
              onClick={handleNext}
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8"
            onClick={toggleZoom}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={14} />
          </Button>
        </div>

        {/* Image Counter */}
        {images?.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {currentImageIndex + 1} / {images?.length}
          </div>
        )}
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-micro ${
                index === currentImageIndex
                  ? 'border-accent' :'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;