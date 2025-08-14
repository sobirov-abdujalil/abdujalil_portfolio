import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      company: "TechStart Inc.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Abdujalil delivered an exceptional e-commerce platform that exceeded our expectations. 
      His attention to detail, technical expertise, and ability to understand our business needs made the entire process smooth. 
      The platform has increased our online sales by 150% within the first quarter.`,
      rating: 5,
      project: "E-commerce Platform",
      date: "March 2024"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      position: "Product Manager, InnovateLab",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Working with Abdujalil was a game-changer for our startup. He transformed our complex requirements 
      into a beautiful, user-friendly application. His proactive communication and problem-solving skills are outstanding. 
      I highly recommend him for any web development project.`,
      rating: 5,
      project: "Task Management App",
      date: "December 2023"
    },
    {
      id: 3,
      name: "Emily Chen",
      position: "Marketing Director, Bella Vista",
      company: "Bella Vista Restaurant",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Our restaurant website has never looked better! Abdujalil created a stunning online presence 
      that perfectly captures our brand essence. The online reservation system has streamlined our operations, 
      and customer feedback has been overwhelmingly positive.`,
      rating: 5,
      project: "Restaurant Website",
      date: "September 2023"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Founder, PropertyPro LLC",
      company: "PropertyPro LLC",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `The real estate platform Abdujalil built for us has revolutionized how we do business. 
      The advanced search features and virtual tour integration have impressed both our agents and clients. 
      His technical skills combined with business understanding make him an invaluable partner.`,
      rating: 5,
      project: "Real Estate Platform",
      date: "June 2023"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => prev === 0 ? testimonials?.length - 1 : prev - 1);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted"}
      />
    ));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients say about working with me 
            and the results we've achieved together.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 lg:p-12 shadow-card">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="Quote" size={24} className="text-accent" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center mb-8">
              <blockquote className="text-lg lg:text-xl text-card-foreground leading-relaxed mb-6">
                "{testimonials?.[currentTestimonial]?.content}"
              </blockquote>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(testimonials?.[currentTestimonial]?.rating)}
              </div>

              {/* Client Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Image
                  src={testimonials?.[currentTestimonial]?.avatar}
                  alt={testimonials?.[currentTestimonial]?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-semibold text-card-foreground">
                    {testimonials?.[currentTestimonial]?.name}
                  </h4>
                  <p className="text-muted-foreground">
                    {testimonials?.[currentTestimonial]?.position}
                  </p>
                  <p className="text-sm text-accent">
                    {testimonials?.[currentTestimonial]?.company}
                  </p>
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Briefcase" size={14} className="mr-1" />
                    {testimonials?.[currentTestimonial]?.project}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {testimonials?.[currentTestimonial]?.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-accent w-6' :'bg-muted hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">24h</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">3+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;