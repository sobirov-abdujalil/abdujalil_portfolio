import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectImageCarousel from './components/ProjectImageCarousel';
import TechnologyStack from './components/TechnologyStack';
import ProjectTimeline from './components/ProjectTimeline';
import CodeSnippetPreview from './components/CodeSnippetPreview';
import ProjectActions from './components/ProjectActions';
import ProjectNavigation from './components/ProjectNavigation';

const ProjectDetailModal = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Mock project data
  const projects = [
    {
      id: 'ecommerce-platform',
      title: 'Modern E-commerce Platform',
      description: `A comprehensive e-commerce solution built with React and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics dashboard. The platform supports multi-vendor functionality with automated commission calculations and dispute resolution system.\n\nKey achievements include 40% improvement in conversion rates, 60% reduction in cart abandonment, and seamless integration with major payment gateways including Stripe, PayPal, and Apple Pay.`,
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop'
      ],
      technologies: [
        { name: 'React', category: 'frontend', icon: 'Component' },
        { name: 'TypeScript', category: 'frontend', icon: 'FileCode' },
        { name: 'Tailwind CSS', category: 'frontend', icon: 'Palette' },
        { name: 'Node.js', category: 'backend', icon: 'Server' },
        { name: 'Express.js', category: 'backend', icon: 'Zap' },
        { name: 'MongoDB', category: 'database', icon: 'Database' },
        { name: 'Redis', category: 'database', icon: 'Zap' },
        { name: 'Stripe API', category: 'tools', icon: 'CreditCard' },
        { name: 'AWS S3', category: 'deployment', icon: 'Cloud' },
        { name: 'Docker', category: 'deployment', icon: 'Package' }
      ],
      features: [
        'Multi-vendor marketplace functionality',
        'Real-time inventory management',
        'Advanced search and filtering',
        'Secure payment processing',
        'Order tracking and notifications',
        'Admin analytics dashboard',
        'Mobile-responsive design',
        'SEO optimization'
      ],
      timeline: [
        {
          phase: 'Planning',
          duration: '2 weeks',
          status: 'completed',
          description: 'Requirements gathering and system architecture design',
          deliverables: ['Technical specifications', 'UI/UX wireframes', 'Database schema'],
          date: 'Jan 2024'
        },
        {
          phase: 'Design',
          duration: '3 weeks',
          status: 'completed',
          description: 'UI/UX design and prototyping',
          deliverables: ['Design system', 'High-fidelity mockups', 'Interactive prototypes'],
          date: 'Feb 2024'
        },
        {
          phase: 'Development',
          duration: '8 weeks',
          status: 'completed',
          description: 'Frontend and backend development',
          deliverables: ['Core functionality', 'Payment integration', 'Admin panel'],
          date: 'Mar - Apr 2024'
        },
        {
          phase: 'Testing',
          duration: '2 weeks',
          status: 'completed',
          description: 'Quality assurance and bug fixes',
          deliverables: ['Test reports', 'Performance optimization', 'Security audit'],
          date: 'May 2024'
        },
        {
          phase: 'Launch',
          duration: '1 week',
          status: 'completed',
          description: 'Production deployment and monitoring',
          deliverables: ['Live deployment', 'Documentation', 'Training materials'],
          date: 'May 2024'
        }
      ],
      codeSnippets: [
        {
          title: 'Product Search Hook',
          language: 'JavaScript',
          code: `const useProductSearch = (filters) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get('/products/search', {
          params: filters
        });
        setProducts(response.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (filters.query || filters.category) {
      searchProducts();
    }
  }, [filters]);

  return { products, loading, error };
};`,
          description: 'Custom React hook for product search with filtering and pagination'
        },
        {
          title: 'Payment Processing',
          language: 'JavaScript',
          code: `const processPayment = async (paymentData) => {
  try {
    const stripe = await stripePromise;
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      paymentData.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: paymentData.customerName,
            email: paymentData.customerEmail,
          },
        },
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, paymentIntent };
  } catch (error) {
    return { success: false, error: error.message };
  }
};`,
          description: 'Stripe payment processing with error handling and validation'
        }
      ],
      liveUrl: 'https://ecommerce-demo.abdujalil.dev',
      githubUrl: 'https://github.com/abdujalil/ecommerce-platform',
      caseStudyUrl: 'https://abdujalil.dev/case-studies/ecommerce-platform',
      client: 'TechCorp Solutions',
      industry: 'E-commerce',
      startDate: 'January 2024',
      endDate: 'May 2024',
      duration: '4 months',
      status: 'completed'
    },
    {
      id: 'task-management-app',
      title: 'Collaborative Task Management App',
      description: `A powerful task management application designed for remote teams, featuring real-time collaboration, advanced project tracking, and intelligent automation. Built with modern web technologies to ensure scalability and performance.\n\nThe application includes features like drag-and-drop task boards, time tracking, team chat integration, and comprehensive reporting tools that help teams stay organized and productive.`,
      images: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop'
      ],
      technologies: [
        { name: 'React', category: 'frontend', icon: 'Component' },
        { name: 'Redux Toolkit', category: 'frontend', icon: 'Layers' },
        { name: 'Material-UI', category: 'frontend', icon: 'Palette' },
        { name: 'Socket.io', category: 'backend', icon: 'Zap' },
        { name: 'PostgreSQL', category: 'database', icon: 'Database' },
        { name: 'Prisma', category: 'tools', icon: 'Database' },
        { name: 'Vercel', category: 'deployment', icon: 'Cloud' }
      ],
      features: [
        'Real-time collaboration',
        'Drag-and-drop task boards',
        'Time tracking and reporting',
        'Team chat integration',
        'File sharing and comments',
        'Custom workflows',
        'Mobile app support'
      ],
      timeline: [
        {
          phase: 'Planning',
          duration: '1 week',
          status: 'completed',
          description: 'Project scope and requirements analysis',
          date: 'March 2024'
        },
        {
          phase: 'Development',
          duration: '6 weeks',
          status: 'completed',
          description: 'Core application development',
          date: 'April - May 2024'
        },
        {
          phase: 'Launch',
          duration: '1 week',
          status: 'completed',
          description: 'Production deployment',
          date: 'June 2024'
        }
      ],
      codeSnippets: [
        {
          title: 'Real-time Updates',
          language: 'JavaScript',
          code: `useEffect(() => {
  socket.on('taskUpdated', (updatedTask) => {
    dispatch(updateTask(updatedTask));
  });

  socket.on('taskCreated', (newTask) => {
    dispatch(addTask(newTask));
  });

  return () => {
    socket.off('taskUpdated');
    socket.off('taskCreated');
  };
}, [dispatch]);`,
          description: 'Socket.io integration for real-time task updates'
        }
      ],
      liveUrl: 'https://taskmanager.abdujalil.dev',
      githubUrl: 'https://github.com/abdujalil/task-manager',
      client: 'StartupXYZ',
      industry: 'Productivity',
      startDate: 'March 2024',
      endDate: 'June 2024',
      duration: '3 months',
      status: 'completed'
    },
    {
      id: 'portfolio-website',
      title: 'Creative Portfolio Website',
      description: `A stunning portfolio website for a creative agency, featuring smooth animations, interactive galleries, and optimized performance. The site showcases the agency's work through immersive storytelling and cutting-edge web technologies.\n\nBuilt with a focus on user experience and visual impact, the website includes custom animations, lazy loading, and advanced SEO optimization to ensure maximum reach and engagement.`,
      images: [
        'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop'
      ],
      technologies: [
        { name: 'Next.js', category: 'frontend', icon: 'Zap' },
        { name: 'Framer Motion', category: 'frontend', icon: 'Zap' },
        { name: 'Sanity CMS', category: 'backend', icon: 'FileText' },
        { name: 'Vercel', category: 'deployment', icon: 'Cloud' }
      ],
      features: [
        'Interactive animations','CMS integration','SEO optimization','Performance optimization','Mobile-first design'
      ],
      timeline: [
        {
          phase: 'Design',duration: '2 weeks',status: 'completed',description: 'Creative design and prototyping',date: 'February 2024'
        },
        {
          phase: 'Development',duration: '4 weeks',status: 'completed',description: 'Frontend development and CMS integration',date: 'March 2024'
        }
      ],
      codeSnippets: [
        {
          title: 'Smooth Scroll Animation',language: 'JavaScript',
          code: `const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

return (
  <motion.div
    style={{ y }}
    className="hero-section"
  >
    <h1>Creative Agency</h1>
  </motion.div>
);`,
          description: 'Framer Motion parallax scrolling effect'
        }
      ],
      liveUrl: 'https://creative-agency.abdujalil.dev',githubUrl: 'https://github.com/abdujalil/creative-portfolio',client: 'Creative Studio',industry: 'Design',startDate: 'February 2024',endDate: 'March 2024',duration: '2 months',status: 'completed'
    }
  ];

  // Find current project
  const currentProject = projects?.find(p => p?.id === projectId) || projects?.[0];
  
  useEffect(() => {
    const index = projects?.findIndex(p => p?.id === projectId);
    setCurrentProjectIndex(index >= 0 ? index : 0);
  }, [projectId]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        navigate('/home-portfolio-showcase');
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [navigate]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      navigate('/home-portfolio-showcase');
    }
  };

  // Navigation handlers
  const handlePrevious = () => {
    const prevIndex = currentProjectIndex > 0 ? currentProjectIndex - 1 : projects?.length - 1;
    navigate(`/project-detail-modal/${projects?.[prevIndex]?.id}`);
  };

  const handleNext = () => {
    const nextIndex = currentProjectIndex < projects?.length - 1 ? currentProjectIndex + 1 : 0;
    navigate(`/project-detail-modal/${projects?.[nextIndex]?.id}`);
  };

  const handleShare = () => {
    // Fallback share functionality
    if (navigator.clipboard) {
      navigator.clipboard?.writeText(window.location?.href);
      // You could add a toast notification here
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-1000 bg-background">
      {/* Header */}
      <Header />
      
      {/* Modal Backdrop and Content */}
      <div 
        className="fixed inset-0 pt-16 flex items-start justify-center overflow-y-auto"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        {/* Modal Content */}
        <div className="relative bg-card rounded-lg shadow-modal max-w-6xl w-full mx-4 my-8 overflow-hidden">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center space-x-4 min-w-0">
              <h1 className="text-2xl font-semibold text-card-foreground truncate">
                {currentProject?.title}
              </h1>
              {currentProject?.status && (
                <span className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${
                  currentProject?.status === 'completed' 
                    ? 'bg-success/10 text-success' 
                    : currentProject?.status === 'in-progress' ?'bg-warning/10 text-warning' :'bg-muted text-muted-foreground'
                }`}>
                  {currentProject?.status?.replace('-', ' ')?.toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Project Navigation */}
              <ProjectNavigation
                onPrevious={handlePrevious}
                onNext={handleNext}
                hasPrevious={currentProjectIndex > 0}
                hasNext={currentProjectIndex < projects?.length - 1}
                currentIndex={currentProjectIndex}
                totalProjects={projects?.length}
              />
              
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/home-portfolio-showcase')}
                aria-label="Close modal"
                className="ml-4"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Hero Section */}
            <div className="p-6">
              <ProjectImageCarousel 
                images={currentProject?.images} 
                title={currentProject?.title} 
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Overview */}
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground mb-4">
                    Project Overview
                  </h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {currentProject?.description?.split('\n\n')?.map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                {currentProject?.features && currentProject?.features?.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-card-foreground mb-4">
                      Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentProject?.features?.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <Icon 
                            name="Check" 
                            size={16} 
                            className="text-success mt-0.5 flex-shrink-0" 
                          />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technology Stack */}
                <TechnologyStack technologies={currentProject?.technologies} />

                {/* Project Timeline */}
                <ProjectTimeline timeline={currentProject?.timeline} />

                {/* Code Snippets */}
                <CodeSnippetPreview codeSnippets={currentProject?.codeSnippets} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Project Actions */}
                <div className="sticky top-24">
                  <ProjectActions
                    liveUrl={currentProject?.liveUrl}
                    githubUrl={currentProject?.githubUrl}
                    caseStudyUrl={currentProject?.caseStudyUrl}
                    onShare={handleShare}
                  />
                </div>

                {/* Project Details */}
                <div className="bg-surface rounded-lg border border-border p-6">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">
                    Project Details
                  </h3>
                  <div className="space-y-4 text-sm">
                    {currentProject?.client && (
                      <div>
                        <span className="text-muted-foreground">Client:</span>
                        <p className="font-medium text-card-foreground mt-1">
                          {currentProject?.client}
                        </p>
                      </div>
                    )}
                    
                    {currentProject?.industry && (
                      <div>
                        <span className="text-muted-foreground">Industry:</span>
                        <p className="font-medium text-card-foreground mt-1">
                          {currentProject?.industry}
                        </p>
                      </div>
                    )}
                    
                    {currentProject?.duration && (
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium text-card-foreground mt-1">
                          {currentProject?.duration}
                        </p>
                      </div>
                    )}
                    
                    {(currentProject?.startDate || currentProject?.endDate) && (
                      <div>
                        <span className="text-muted-foreground">Timeline:</span>
                        <p className="font-medium text-card-foreground mt-1">
                          {currentProject?.startDate} - {currentProject?.endDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectDetailModal;