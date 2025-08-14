import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import FileUpload from './FileUpload';

const ContactFormSteps = ({ estimatorData, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Project Details
    projectType: estimatorData?.projectType || '',
    budget: estimatorData?.budget || '',
    timeline: estimatorData?.timeline || '',
    message: '',
    
    // Preferences
    preferredContact: 'email',
    communicationFrequency: 'weekly',
    
    // Files and Additional
    files: [],
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Personal Info',
      icon: 'User',
      description: 'Tell us about yourself'
    },
    {
      id: 2,
      title: 'Project Details',
      icon: 'Briefcase',
      description: 'Describe your project'
    },
    {
      id: 3,
      title: 'Preferences',
      icon: 'Settings',
      description: 'Communication preferences'
    },
    {
      id: 4,
      title: 'Review & Submit',
      icon: 'Send',
      description: 'Final review'
    }
  ];

  const projectTypeOptions = [
    { value: 'landing-page', label: 'Landing Page' },
    { value: 'web-app', label: 'Web Application' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'portfolio', label: 'Portfolio Website' },
    { value: 'blog', label: 'Blog/CMS' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: '$1,000 - $5,000', label: '$1,000 - $5,000' },
    { value: '$5,000 - $10,000', label: '$5,000 - $10,000' },
    { value: '$10,000 - $25,000', label: '$10,000 - $25,000' },
    { value: '$25,000 - $50,000', label: '$25,000 - $50,000' },
    { value: '$50,000+', label: '$50,000+' }
  ];

  const timelineOptions = [
    { value: '1-2 weeks', label: '1-2 weeks' },
    { value: '1 month', label: '1 month' },
    { value: '2-3 months', label: '2-3 months' },
    { value: '3-6 months', label: '3-6 months' },
    { value: '6+ months', label: '6+ months' }
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'both', label: 'Both Email & Phone' }
  ];

  const communicationOptions = [
    { value: 'daily', label: 'Daily updates' },
    { value: 'weekly', label: 'Weekly updates' },
    { value: 'milestone', label: 'Milestone updates' },
    { value: 'minimal', label: 'Minimal communication' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.name?.trim()) newErrors.name = 'Name is required';
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
      
      case 2:
        if (!formData?.projectType) newErrors.projectType = 'Please select a project type';
        if (!formData?.message?.trim()) newErrors.message = 'Please describe your project';
        break;
      
      case 4:
        if (!formData?.terms) newErrors.terms = 'Please accept the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit?.(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                required
                value={formData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                error={errors?.name}
                placeholder="Enter your full name"
              />
              
              <Input
                label="Email Address"
                type="email"
                required
                value={formData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)}
                error={errors?.email}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                placeholder="+1 (555) 123-4567"
              />
              
              <Input
                label="Company (Optional)"
                type="text"
                value={formData?.company}
                onChange={(e) => handleInputChange('company', e?.target?.value)}
                placeholder="Your company name"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                label="Project Type"
                required
                options={projectTypeOptions}
                value={formData?.projectType}
                onChange={(value) => handleInputChange('projectType', value)}
                error={errors?.projectType}
                placeholder="Select project type"
              />
              
              <Select
                label="Budget Range"
                options={budgetOptions}
                value={formData?.budget}
                onChange={(value) => handleInputChange('budget', value)}
                placeholder="Select budget range"
              />
              
              <Select
                label="Timeline"
                options={timelineOptions}
                value={formData?.timeline}
                onChange={(value) => handleInputChange('timeline', value)}
                placeholder="Select timeline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Description <span className="text-error">*</span>
              </label>
              <textarea
                rows={6}
                value={formData?.message}
                onChange={(e) => handleInputChange('message', e?.target?.value)}
                placeholder="Please describe your project requirements, goals, and any specific features you need..."
                className={`w-full px-3 py-2 border rounded-md shadow-sm transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical ${
                  errors?.message 
                    ? 'border-error focus:ring-error' :'border-border focus:ring-accent'
                }`}
              />
              {errors?.message && (
                <p className="mt-1 text-sm text-error">{errors?.message}</p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">
                {formData?.message?.length}/500 characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Files (Optional)
              </label>
              <FileUpload
                onFilesChange={(files) => handleInputChange('files', files)}
                maxFiles={3}
                maxSize={10}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Preferred Contact Method"
                options={contactMethodOptions}
                value={formData?.preferredContact}
                onChange={(value) => handleInputChange('preferredContact', value)}
              />
              
              <Select
                label="Communication Frequency"
                options={communicationOptions}
                value={formData?.communicationFrequency}
                onChange={(value) => handleInputChange('communicationFrequency', value)}
              />
            </div>
            <div className="space-y-4">
              <Checkbox
                label="Subscribe to newsletter for web development tips and updates"
                checked={formData?.newsletter}
                onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-surface rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Review Your Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Contact Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Name:</span> {formData?.name}</p>
                    <p><span className="text-muted-foreground">Email:</span> {formData?.email}</p>
                    {formData?.phone && (
                      <p><span className="text-muted-foreground">Phone:</span> {formData?.phone}</p>
                    )}
                    {formData?.company && (
                      <p><span className="text-muted-foreground">Company:</span> {formData?.company}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Project Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Type:</span> {formData?.projectType}</p>
                    {formData?.budget && (
                      <p><span className="text-muted-foreground">Budget:</span> {formData?.budget}</p>
                    )}
                    {formData?.timeline && (
                      <p><span className="text-muted-foreground">Timeline:</span> {formData?.timeline}</p>
                    )}
                    <p><span className="text-muted-foreground">Contact:</span> {formData?.preferredContact}</p>
                  </div>
                </div>
              </div>
              
              {formData?.message && (
                <div className="mt-4 pt-4 border-t border-border">
                  <h4 className="font-medium text-foreground mb-2">Project Description</h4>
                  <p className="text-sm text-muted-foreground">{formData?.message}</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <Checkbox
                label="I agree to the terms and conditions and privacy policy"
                required
                checked={formData?.terms}
                onChange={(e) => handleInputChange('terms', e?.target?.checked)}
                error={errors?.terms}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="relative">
        <div className="absolute top-4 left-0 w-full h-0.5 bg-border" />
        <div 
          className="absolute top-4 left-0 h-0.5 bg-accent transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
        />
        
        <div className="relative flex justify-between">
          {steps?.map((step) => (
            <div key={step?.id} className="flex flex-col items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 bg-background transition-micro
                ${step?.id < currentStep 
                  ? 'bg-success text-success-foreground border-success' 
                  : step?.id === currentStep
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-muted text-muted-foreground border-border'
                }
              `}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              
              <div className="mt-2 text-center hidden md:block">
                <span className={`text-xs transition-micro ${
                  step?.id <= currentStep 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Step Content */}
      <div className="min-h-[400px]">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {steps?.[currentStep - 1]?.title}
          </h2>
          <p className="text-muted-foreground">
            {steps?.[currentStep - 1]?.description}
          </p>
        </div>
        
        {renderStepContent()}
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {steps?.length}
        </span>
        
        {currentStep < steps?.length ? (
          <Button
            variant="default"
            onClick={nextStep}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ContactFormSteps;