import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ProjectTypeSelector from './components/ProjectTypeSelector';
import FeatureSelector from './components/FeatureSelector';
import TimelineSelector from './components/TimelineSelector';
import CustomRequirements from './components/CustomRequirements';
import PricingSummary from './components/PricingSummary';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InteractiveCostEstimator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectType, setProjectType] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [customRequirements, setCustomRequirements] = useState({});
  const [showMobileSummary, setShowMobileSummary] = useState(false);

  const steps = [
    { id: 1, label: 'Project Type', icon: 'Layers' },
    { id: 2, label: 'Features', icon: 'Package' },
    { id: 3, label: 'Timeline', icon: 'Clock' },
    { id: 4, label: 'Requirements', icon: 'FileText' }
  ];

  // Auto-advance to next step when selections are made
  useEffect(() => {
    if (currentStep === 1 && projectType) {
      setTimeout(() => setCurrentStep(2), 500);
    }
  }, [projectType, currentStep]);

  const handleProjectTypeSelect = (type) => {
    setProjectType(type);
    // Reset features when project type changes
    setSelectedFeatures([]);
  };

  const handleFeatureToggle = (feature, checked) => {
    if (checked) {
      setSelectedFeatures(prev => [...prev, feature]);
    } else {
      setSelectedFeatures(prev => prev?.filter(f => f?.id !== feature?.id));
    }
  };

  const handleTimelineSelect = (timeline) => {
    setSelectedTimeline(timeline);
  };

  const handleRequirementsChange = (requirements) => {
    setCustomRequirements(requirements);
  };

  const handleGetQuote = () => {
    // Prepare data for contact form
    const estimateData = {
      projectType: projectType?.name || '',
      budget: calculateTotalPrice(),
      timeline: selectedTimeline?.name || '',
      features: selectedFeatures?.map(f => f?.name),
      customRequirements: customRequirements?.description || '',
      specialFeatures: customRequirements?.specialFeatures || '',
      integrations: customRequirements?.integrations || '',
      complexity: customRequirements?.complexity || 'medium'
    };

    // Navigate to contact form with pre-filled data
    navigate('/contact-inquiry-form', { 
      state: { 
        estimateData,
        fromEstimator: true 
      } 
    });
  };

  const handleSaveEstimate = () => {
    const estimate = {
      projectType,
      selectedFeatures,
      selectedTimeline,
      customRequirements,
      totalPrice: calculateTotalPrice(),
      createdAt: new Date()?.toISOString()
    };

    // Save to localStorage
    const savedEstimates = JSON.parse(localStorage.getItem('savedEstimates') || '[]');
    savedEstimates?.push(estimate);
    localStorage.setItem('savedEstimates', JSON.stringify(savedEstimates));

    // Show success message (you could implement a toast notification here)
    alert('Estimate saved successfully!');
  };

  const calculateTotalPrice = () => {
    if (!projectType) return '$0';
    
    let basePrice = projectType?.basePrice;
    let featuresPrice = selectedFeatures?.reduce((total, feature) => total + feature?.price, 0);
    let subtotal = basePrice + featuresPrice;
    let timelineMultiplier = selectedTimeline?.priceMultiplier || 1;
    let complexityMultiplier = getComplexityMultiplier(customRequirements?.complexity);
    let totalPrice = subtotal * timelineMultiplier * complexityMultiplier;
    
    return `$${Math.round(totalPrice)?.toLocaleString()}`;
  };

  const getComplexityMultiplier = (complexity) => {
    switch (complexity) {
      case 'simple': return 0.8;
      case 'medium': return 1.0;
      case 'complex': return 1.4;
      case 'enterprise': return 2.0;
      default: return 1.0;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return projectType !== null;
      case 2: return true; // Features are optional
      case 3: return selectedTimeline !== null;
      case 4: return true; // Custom requirements are optional
      default: return false;
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4 && canProceedToNext()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectTypeSelector
            selectedType={projectType}
            onTypeSelect={handleProjectTypeSelect}
          />
        );
      case 2:
        return (
          <FeatureSelector
            selectedFeatures={selectedFeatures}
            onFeatureToggle={handleFeatureToggle}
            projectType={projectType}
          />
        );
      case 3:
        return (
          <TimelineSelector
            selectedTimeline={selectedTimeline}
            onTimelineSelect={handleTimelineSelect}
          />
        );
      case 4:
        return (
          <CustomRequirements
            customRequirements={customRequirements}
            onRequirementsChange={handleRequirementsChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Interactive Cost Estimator - Abdujalil Portfolio</title>
        <meta 
          name="description" 
          content="Get instant project pricing and timeline estimates for your web development needs. Interactive cost calculator with detailed breakdowns." 
        />
        <meta name="keywords" content="cost estimator, web development pricing, project calculator, quote generator" />
        <meta property="og:title" content="Interactive Cost Estimator - Abdujalil Portfolio" />
        <meta property="og:description" content="Get instant project pricing and timeline estimates for your web development needs." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Hero Section */}
          <section className="bg-surface border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Interactive Cost Estimator
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Get instant pricing and timeline estimates for your web development project. 
                  Our interactive tool helps you understand costs upfront and plan your budget effectively.
                </p>
                
                {/* Progress Indicator */}
                <ProgressIndicator
                  currentStep={currentStep}
                  totalSteps={4}
                  steps={steps}
                  className="max-w-2xl mx-auto"
                />
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Current Step Content */}
                  <div className="bg-card rounded-lg border border-border p-6 md:p-8">
                    {renderCurrentStep()}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button
                      variant="outline"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 1}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      className="sm:w-auto"
                    >
                      Previous Step
                    </Button>

                    <div className="flex gap-3">
                      {currentStep < 4 ? (
                        <Button
                          variant="default"
                          onClick={handleNextStep}
                          disabled={!canProceedToNext()}
                          iconName="ChevronRight"
                          iconPosition="right"
                          className="flex-1 sm:flex-none"
                        >
                          Next Step
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          onClick={handleGetQuote}
                          disabled={!projectType || !selectedTimeline}
                          iconName="MessageCircle"
                          iconPosition="right"
                          className="flex-1 sm:flex-none"
                        >
                          Get Detailed Quote
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing Summary - Desktop */}
                <div className="hidden lg:block">
                  <PricingSummary
                    projectType={projectType}
                    selectedFeatures={selectedFeatures}
                    selectedTimeline={selectedTimeline}
                    onGetQuote={handleGetQuote}
                    onSaveEstimate={handleSaveEstimate}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Summary Toggle */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Estimated Total</p>
                <p className="text-xl font-bold text-accent">{calculateTotalPrice()}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileSummary(true)}
                iconName="Calculator"
                iconPosition="left"
              >
                View Details
              </Button>
            </div>
          </div>

          {/* Mobile Summary Modal */}
          {showMobileSummary && (
            <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
              <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[80vh] overflow-y-auto">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Project Estimate</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowMobileSummary(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <div className="p-4">
                  <PricingSummary
                    projectType={projectType}
                    selectedFeatures={selectedFeatures}
                    selectedTimeline={selectedTimeline}
                    onGetQuote={() => {
                      setShowMobileSummary(false);
                      handleGetQuote();
                    }}
                    onSaveEstimate={() => {
                      setShowMobileSummary(false);
                      handleSaveEstimate();
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Bottom Spacing for Mobile */}
        <div className="lg:hidden h-20" />
      </div>
    </>
  );
};

export default InteractiveCostEstimator;