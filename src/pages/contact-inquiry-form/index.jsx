import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ContactInfo from './components/ContactInfo';
import ContactFormSteps from './components/ContactFormSteps';
import ProjectRequirements from './components/ProjectRequirements';
import SuccessModal from './components/SuccessModal';
import Icon from '../../components/AppIcon';

const ContactInquiryForm = () => {
  const location = useLocation();
  const [estimatorData, setEstimatorData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Extract estimator data from location state
  useEffect(() => {
    if (location?.state?.estimatorData) {
      setEstimatorData(location?.state?.estimatorData);
    }
  }, [location?.state]);

  const handleFormSubmit = (formData) => {
    setSubmittedData(formData);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmittedData(null);
  };

  return (
    <>
      <Helmet>
        <title>Contact & Inquiry Form - Abdujalil Portfolio</title>
        <meta 
          name="description" 
          content="Get in touch with Abdujalil for your web development project. Professional consultation, cost estimation, and project planning services available."
        />
        <meta name="keywords" content="contact, inquiry, web development, consultation, project planning, cost estimation" />
        <meta property="og:title" content="Contact & Inquiry Form - Abdujalil Portfolio" />
        <meta property="og:description" content="Ready to start your project? Contact Abdujalil for professional web development services and consultation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/contact-inquiry-form" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-background via-surface to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon name="MessageCircle" size={24} className="text-accent" />
                <span className="text-sm font-medium text-accent uppercase tracking-wide">
                  Contact & Inquiry
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Let's Build Something
                <span className="text-accent"> Amazing Together</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Ready to turn your vision into reality? Share your project details and let's discuss how we can create something extraordinary.
              </p>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span>24h Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span>Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span>Free Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Contact Information Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ContactInfo />
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-3">
                <div className="bg-card rounded-lg border border-border shadow-card">
                  {/* Form Header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-card-foreground">
                          Project Inquiry Form
                        </h2>
                        <p className="text-muted-foreground mt-1">
                          Tell us about your project and we'll get back to you with a detailed proposal
                        </p>
                      </div>
                      
                      {estimatorData && (
                        <div className="hidden md:flex items-center space-x-2 text-sm text-success">
                          <Icon name="Calculator" size={16} />
                          <span>Estimate Imported</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estimator Data Display */}
                  {estimatorData && (
                    <div className="p-6 bg-surface border-b border-border">
                      <ProjectRequirements estimatorData={estimatorData} />
                    </div>
                  )}

                  {/* Form Content */}
                  <div className="p-6">
                    <ContactFormSteps 
                      estimatorData={estimatorData}
                      onSubmit={handleFormSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Work With Me?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                I'm committed to delivering exceptional results and building long-term partnerships with my clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Fast Delivery
                </h3>
                <p className="text-muted-foreground">
                  Quick turnaround times without compromising on quality. Most projects delivered ahead of schedule.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Collaborative Approach
                </h3>
                <p className="text-muted-foreground">
                  Regular updates, transparent communication, and your input at every stage of development.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Quality Guaranteed
                </h3>
                <p className="text-muted-foreground">
                  Clean, maintainable code with comprehensive testing and ongoing support included.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Quick answers to common questions about the project process
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How long does it take to get a response?",
                  answer: "I typically respond to all inquiries within 24 hours, often much sooner. For urgent projects, feel free to call directly."
                },
                {
                  question: "Do you provide ongoing support after launch?",
                  answer: "Yes! All projects include 30 days of free support, with optional maintenance packages available for ongoing updates and improvements."
                },
                {
                  question: "Can you work with my existing team?",
                  answer: "Absolutely. I collaborate seamlessly with designers, marketers, and other developers to ensure your project's success."
                },
                {
                  question: "What information should I include in my inquiry?",
                  answer: "The more details you provide about your goals, timeline, and requirements, the better I can tailor my response to your needs."
                }
              ]?.map((faq, index) => (
                <div key={index} className="bg-card rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {faq?.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq?.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-semibold">Abdujalil</span>
              </div>
              
              <p className="text-primary-foreground/80 mb-6">
                Building exceptional web experiences, one project at a time.
              </p>
              
              <div className="flex items-center justify-center space-x-6 mb-6">
                <a href="mailto:hello@abdujalil.dev" className="text-primary-foreground/80 hover:text-primary-foreground transition-micro">
                  <Icon name="Mail" size={20} />
                </a>
                <a href="https://github.com/abdujalil" className="text-primary-foreground/80 hover:text-primary-foreground transition-micro">
                  <Icon name="Github" size={20} />
                </a>
                <a href="https://linkedin.com/in/abdujalil" className="text-primary-foreground/80 hover:text-primary-foreground transition-micro">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
              
              <p className="text-sm text-primary-foreground/60">
                © {new Date()?.getFullYear()} Abdujalil. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleCloseSuccessModal}
          formData={submittedData}
        />
      </div>
    </>
  );
};

export default ContactInquiryForm;