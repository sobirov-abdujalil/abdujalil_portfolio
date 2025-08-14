import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ProjectDetailModal from '../../../components/ui/ProjectDetailModal';

const PortfolioGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A modern e-commerce solution with advanced product filtering, secure payment integration, and comprehensive admin dashboard for inventory management.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Application",
      status: "completed",
      liveUrl: "https://demo-ecommerce.example.com",
      githubUrl: "https://github.com/abdujalil/ecommerce-platform",
      client: "TechStore Inc.",
      industry: "Retail",
      startDate: "Jan 2024",
      endDate: "Mar 2024",
      duration: "3 months",
      features: [
        "Advanced product search and filtering",
        "Secure payment processing with Stripe",
        "Real-time inventory management",
        "Customer review and rating system",
        "Mobile-responsive design",
        "Admin dashboard with analytics"
      ]
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative project management tool featuring real-time updates, team collaboration, and advanced reporting capabilities for enhanced productivity.",
      image: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?w=800&h=600&fit=crop",
      technologies: ["React", "Firebase", "Material-UI", "Chart.js"],
      category: "Productivity",
      status: "completed",
      liveUrl: "https://taskflow-demo.example.com",
      githubUrl: "https://github.com/abdujalil/task-management",
      client: "StartupXYZ",
      industry: "Technology",
      startDate: "Oct 2023",
      endDate: "Dec 2023",
      duration: "2 months",
      features: [
        "Real-time collaboration",
        "Drag-and-drop task management",
        "Team performance analytics",
        "File sharing and comments",
        "Mobile app companion",
        "Integration with popular tools"
      ]
    },
    {
      id: 3,
      title: "Restaurant Website",
      description: "Elegant restaurant website with online reservation system, menu showcase, and integrated ordering platform to enhance customer experience.",
      image: "https://images.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1280.jpg?w=800&h=600&fit=crop",
      technologies: ["React", "Express", "PostgreSQL", "Tailwind"],
      category: "Business Website",
      status: "completed",
      liveUrl: "https://bella-vista-demo.example.com",
      githubUrl: "https://github.com/abdujalil/restaurant-website",
      client: "Bella Vista Restaurant",
      industry: "Food & Beverage",
      startDate: "Aug 2023",
      endDate: "Sep 2023",
      duration: "1 month",
      features: [
        "Online table reservation system",
        "Interactive menu with images",
        "Online ordering and delivery",
        "Customer reviews integration",
        "Event booking system",
        "Multi-language support"
      ]
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Creative portfolio showcase for a digital artist featuring interactive galleries, client testimonials, and seamless contact integration.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
      technologies: ["React", "Framer Motion", "Sanity CMS", "Vercel"],
      category: "Portfolio",
      status: "completed",
      liveUrl: "https://artist-portfolio-demo.example.com",
      githubUrl: "https://github.com/abdujalil/artist-portfolio",
      client: "Sarah Johnson",
      industry: "Creative Arts",
      startDate: "Jun 2023",
      endDate: "Jul 2023",
      duration: "1 month",
      features: [
        "Interactive image galleries",
        "Smooth scroll animations",
        "CMS integration for easy updates",
        "Client testimonial system",
        "Contact form with file upload",
        "SEO optimized structure"
      ]
    },
    {
      id: 5,
      title: "Learning Management System",
      description: "Comprehensive LMS platform with course creation tools, student progress tracking, and interactive learning modules for educational institutions.",
      image: "https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?w=800&h=600&fit=crop",
      technologies: ["React", "Django", "PostgreSQL", "Redis"],
      category: "Education Platform",
      status: "in-progress",
      liveUrl: "https://edulearn-demo.example.com",
      githubUrl: "https://github.com/abdujalil/learning-management",
      client: "EduTech Solutions",
      industry: "Education",
      startDate: "Nov 2023",
      endDate: "Feb 2024",
      duration: "4 months",
      features: [
        "Course creation and management",
        "Student progress tracking",
        "Interactive quizzes and assignments",
        "Video streaming integration",
        "Discussion forums",
        "Certificate generation"
      ]
    },
    {
      id: 6,
      title: "Real Estate Platform",
      description: "Modern real estate marketplace with advanced property search, virtual tours, and integrated CRM system for agents and buyers.",
      image: "https://images.pixabay.com/photo/2016/11/29/03/53/house-1867187_1280.jpg?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "MySQL", "AWS"],
      category: "Marketplace",
      status: "completed",
      liveUrl: "https://propfinder-demo.example.com",
      githubUrl: "https://github.com/abdujalil/real-estate-platform",
      client: "PropertyPro LLC",
      industry: "Real Estate",
      startDate: "Mar 2023",
      endDate: "Jun 2023",
      duration: "3 months",
      features: [
        "Advanced property search filters",
        "Virtual property tours",
        "Agent CRM integration",
        "Mortgage calculator",
        "Neighborhood insights",
        "Mobile-first responsive design"
      ]
    }
  ];

  const handleProjectClick = (project, index) => {
    setSelectedProject(project);
    setCurrentProjectIndex(index);
    setIsModalOpen(true);
  };

  const handleNextProject = () => {
    const nextIndex = (currentProjectIndex + 1) % projects?.length;
    setSelectedProject(projects?.[nextIndex]);
    setCurrentProjectIndex(nextIndex);
  };

  const handlePreviousProject = () => {
    const prevIndex = currentProjectIndex === 0 ? projects?.length - 1 : currentProjectIndex - 1;
    setSelectedProject(projects?.[prevIndex]);
    setCurrentProjectIndex(prevIndex);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work showcasing modern web development solutions 
            that deliver exceptional user experiences and business results.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, index) => (
            <div
              key={project?.id}
              className="group relative bg-card rounded-lg border border-border overflow-hidden shadow-card hover:shadow-modal transition-all duration-300 hover-lift cursor-pointer"
              onClick={() => handleProjectClick(project, index)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-muted overflow-hidden">
                <Image
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Status Badge */}
                {project?.status && (
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      project?.status === 'completed' 
                        ? 'bg-success/10 text-success' 
                        : project?.status === 'in-progress' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
                    }`}>
                      {project?.status?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View Details
                  </Button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-sm text-accent font-medium">
                    {project?.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                  {project?.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {project?.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project?.technologies?.slice(0, 3)?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project?.technologies?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                      +{project?.technologies?.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {project?.liveUrl && (
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          window.open(project?.liveUrl, '_blank');
                        }}
                        className="text-accent hover:text-accent/80 transition-colors"
                        aria-label="View live demo"
                      >
                        <Icon name="ExternalLink" size={16} />
                      </button>
                    )}
                    {project?.githubUrl && (
                      <button
                        onClick={(e) => {
                          e?.stopPropagation();
                          window.open(project?.githubUrl, '_blank');
                        }}
                        className="text-muted-foreground hover:text-text-primary transition-colors"
                        aria-label="View source code"
                      >
                        <Icon name="Github" size={16} />
                      </button>
                    )}
                  </div>
                  
                  <Icon 
                    name="ArrowRight" 
                    size={16} 
                    className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="Plus"
            iconPosition="left"
          >
            Load More Projects
          </Button>
        </div>
      </div>
      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        project={selectedProject}
        onNext={handleNextProject}
        onPrevious={handlePreviousProject}
        hasNext={currentProjectIndex < projects?.length - 1}
        hasPrevious={currentProjectIndex > 0}
      />
    </section>
  );
};

export default PortfolioGrid;