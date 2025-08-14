import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Checkbox } from './Checkbox';

const ContactFormPanel = ({ 
  prefilledData = null,
  onSubmit,
  showEstimatorSummary = false,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    preferredContact: 'email',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Populate form with prefilled data from cost estimator
  useEffect(() => {
    if (prefilledData) {
      setFormData(prev => ({
        ...prev,
        ...prefilledData
      }));
    }
  }, [prefilledData]);

  const projectTypeOptions = [
    { value: 'website', label: 'Website Development' },
    { value: 'webapp', label: 'Web Application' },
    { value: 'ecommerce', label: 'E-commerce Store' },
    { value: 'portfolio', label: 'Portfolio Website' },
    { value: 'blog', label: 'Blog/CMS' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: '10000-25000', label: '$10,000 - $25,000' },
    { value: '25000-50000', label: '$25,000 - $50,000' },
    { value: '50000+', label: '$50,000+' }
  ];

  const timelineOptions = [
    { value: '1-2weeks', label: '1-2 weeks' },
    { value: '1month', label: '1 month' },
    { value: '2-3months', label: '2-3 months' },
    { value: '3-6months', label: '3-6 months' },
    { value: '6months+', label: '6+ months' }
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'both', label: 'Both Email & Phone' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Please describe your project';
    }

    if (!formData?.terms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          preferredContact: 'email',
          newsletter: false,
          terms: false
        });
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className={`bg-card rounded-lg border border-border p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Check" size={32} className="text-success" />
        </div>
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your inquiry. I'll get back to you within 24 hours.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setSubmitSuccess(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${className}`}>
      {/* Estimator Summary Panel */}
      {showEstimatorSummary && prefilledData && (
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Icon name="Calculator" size={20} className="mr-2" />
              Project Estimate
            </h3>
            
            <div className="space-y-4">
              {prefilledData?.projectType && (
                <div>
                  <span className="text-sm text-muted-foreground">Project Type</span>
                  <p className="font-medium text-foreground">{prefilledData?.projectType}</p>
                </div>
              )}
              
              {prefilledData?.budget && (
                <div>
                  <span className="text-sm text-muted-foreground">Estimated Budget</span>
                  <p className="font-medium text-foreground">{prefilledData?.budget}</p>
                </div>
              )}
              
              {prefilledData?.timeline && (
                <div>
                  <span className="text-sm text-muted-foreground">Timeline</span>
                  <p className="font-medium text-foreground">{prefilledData?.timeline}</p>
                </div>
              )}
              
              {prefilledData?.features && prefilledData?.features?.length > 0 && (
                <div>
                  <span className="text-sm text-muted-foreground">Selected Features</span>
                  <ul className="mt-1 space-y-1">
                    {prefilledData?.features?.map((feature, index) => (
                      <li key={index} className="text-sm text-foreground flex items-center">
                        <Icon name="Check" size={14} className="text-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                This estimate is based on your selections and may vary based on specific requirements.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Contact Form */}
      <div className={showEstimatorSummary ? 'lg:col-span-2' : 'lg:col-span-3'}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
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
              error={errors?.phone}
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

          {/* Project Details */}
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

          {/* Project Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Description <span className="text-error">*</span>
            </label>
            <textarea
              rows={5}
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
          </div>

          {/* Contact Preferences */}
          <div>
            <Select
              label="Preferred Contact Method"
              options={contactMethodOptions}
              value={formData?.preferredContact}
              onChange={(value) => handleInputChange('preferredContact', value)}
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <Checkbox
              label="Subscribe to newsletter for web development tips and updates"
              checked={formData?.newsletter}
              onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
            />
            
            <Checkbox
              label="I agree to the terms and conditions and privacy policy"
              required
              checked={formData?.terms}
              onChange={(e) => handleInputChange('terms', e?.target?.checked)}
              error={errors?.terms}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormPanel;