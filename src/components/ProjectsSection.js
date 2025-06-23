import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolioData';

const ProjectsSection = () => {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState(null);

  // Desktop carousel state
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(portfolioData.projects.length / itemsPerPage);
  
  // Mobile carousel state
  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);

  // Store scroll position when modal opens
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  // Add effect to prevent body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      // Store current scroll position IMMEDIATELY
      const scrollY = window.scrollY;
      setSavedScrollPosition(scrollY);
      
      // Immediately prevent any scroll-related interference from the app
      document.body.style.pointerEvents = 'none';
      
      // Use requestAnimationFrame to ensure we capture the position before any other effects
      requestAnimationFrame(() => {
        // Disable scrolling on the body and html
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.body.style.width = '100%';
        
        // Also prevent touch scrolling on mobile
        document.body.style.touchAction = 'none';
        document.documentElement.style.touchAction = 'none';
        
        // Re-enable pointer events after preventing scroll
        setTimeout(() => {
          document.body.style.pointerEvents = '';
        }, 100);
      });
    } else {
      // When closing modal, restore everything
      const scrollPosition = savedScrollPosition;
      
      // Temporarily disable pointer events to prevent interference
      document.body.style.pointerEvents = 'none';
      
      // Re-enable scrolling
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
      
      // Restore scroll position immediately and repeatedly
      if (scrollPosition !== 0) {
        // Immediate restore
        window.scrollTo(0, scrollPosition);
        
        // Use requestAnimationFrame for smoother restoration
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition);
          
          // Additional attempts to ensure position is maintained
          setTimeout(() => window.scrollTo(0, scrollPosition), 0);
          setTimeout(() => window.scrollTo(0, scrollPosition), 10);
          setTimeout(() => window.scrollTo(0, scrollPosition), 50);
          setTimeout(() => window.scrollTo(0, scrollPosition), 100);
        });
      }
      
      // Re-enable pointer events after restoration
      setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 200);
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
      document.body.style.pointerEvents = '';
    };
  }, [selectedProject]);

  // Project images mapping with modern fallback
  const getProjectImage = (id) => {
    const images = {
      1: '/1.jpg',
      2: '/2.jpg',
      3: '/3.jpg',
      4: '/4.jpg',
      5: '/5.jpg',
      6: '/6.jpg'
    };
    return images[id] || images[1];
  };
  
  // Get current projects to display on desktop
  const getCurrentProjects = () => {
    const startIndex = currentPage * itemsPerPage;
    return portfolioData.projects.slice(startIndex, startIndex + itemsPerPage);
  };

  // Desktop navigation functions
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Mobile navigation functions
  const nextProject = () => {
    setMobileCurrentIndex((prev) => (prev + 1) % portfolioData.projects.length);
  };

  const prevProject = () => {
    setMobileCurrentIndex((prev) => (prev - 1 + portfolioData.projects.length) % portfolioData.projects.length);
  };

  // Project emoji icons
  const getProjectEmoji = (id) => {
    const icons = {
      1: '🏢',
      2: '🏠',
      3: '🔧',
      4: '🏗️',
      5: '🌉',
      6: '⚡'
    };
    return icons[id] || '🏗️';
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Modern Animated Background */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <div className="absolute top-1/3 right-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '12s' }} />
        <div className="absolute -bottom-20 right-20 w-[40rem] h-[40rem] bg-emerald-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '15s' }} />
        <div 
          className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-blue-400/5 rounded-full blur-3xl" 
          style={{ animationDuration: '20s', animation: 'ping 25s cubic-bezier(0, 0, 0.2, 1) infinite' }} 
        />
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-cyan-400 rounded-full blur-sm animate-ping" style={{ animationDelay: '3s', animationDuration: '5s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-purple-400 rounded-full blur-sm animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      </div>
  
      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header with improved animations */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-hebrew bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto font-hebrew"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>
  
        {/* Desktop Carousel with improved design */}
        <div className="relative hidden md:block">
          {currentPage > 0 && (
            <button
              onClick={goToPrevPage}
              className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-30 p-3.5 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50 backdrop-blur-md group"
              aria-label="Previous page"
            >
              <ChevronLeft size={24} className="group-hover:text-cyan-600 transition-colors" />
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={goToNextPage}
              className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-30 p-3.5 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50 backdrop-blur-md group"
              aria-label="Next page"
            >
              <ChevronRight size={24} className="group-hover:text-cyan-600 transition-colors" />
            </button>
          )}
  
          <div className="px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getCurrentProjects().map((project) => (
                <motion.div 
                  key={project.id} 
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (project.id % 4) }}
                >
                  <div
                    className="cursor-pointer group transition-all duration-300"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/40 hover:border-cyan-400/60 transition-all duration-300 h-[26rem] flex flex-col shadow-lg shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                      {/* Fixed image container with consistent dimensions - REMOVED CATEGORY TAG */}
                      <div className="relative w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 mix-blend-overlay z-10" />
                        <img
                          src={getProjectImage(project.id)}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center text-6xl">
                          {getProjectEmoji(project.id)}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-gray-800 font-medium font-hebrew shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <ExternalLink size={18} className="text-cyan-500" />
                            {t('projects.viewProject')}
                          </div>
                        </div>
                      </div>
  
                      <div className="p-6 flex-1 flex flex-col bg-white">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300 text-right font-hebrew">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-5 text-right font-hebrew flex-1 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="mt-auto">
                          {/* Empty space - no tags */}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
  
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
          <div className="text-center mt-6">
            <span className="text-gray-500 font-hebrew">
              עמוד {currentPage + 1} מתוך {totalPages} - מציג {getCurrentProjects().length} פרויקטים
            </span>
          </div>
        </div>
  
        {/* Mobile Carousel with improved spacing for arrows - REMOVED CATEGORY TAG */}
        <div className="md:hidden relative">
          <button
            onClick={prevProject}
            className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50 backdrop-blur-md group"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} className="group-hover:text-cyan-600 transition-colors" />
          </button>
          <button
            onClick={nextProject}
            className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200/50 backdrop-blur-md group"
            aria-label="Next project"
          >
            <ChevronRight size={20} className="group-hover:text-cyan-600 transition-colors" />
          </button>
  
          <div className="px-14 mx-auto max-w-sm">
            <motion.div
              key={mobileCurrentIndex}
              className="cursor-pointer group transition-all duration-300"
              onClick={() => setSelectedProject(portfolioData.projects[mobileCurrentIndex])}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/40 hover:border-cyan-400/60 transition-all duration-300 h-[26rem] flex flex-col shadow-lg shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Fixed mobile image container - REMOVED CATEGORY TAG */}
                <div className="relative w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 mix-blend-overlay z-10" />
                  <img
                    src={getProjectImage(portfolioData.projects[mobileCurrentIndex].id)}
                    alt={portfolioData.projects[mobileCurrentIndex].title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center text-6xl">
                    {getProjectEmoji(portfolioData.projects[mobileCurrentIndex].id)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-gray-800 font-medium font-hebrew shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ExternalLink size={18} className="text-cyan-500" />
                      {t('projects.viewProject')}
                    </div>
                  </div>
                </div>
  
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-300 text-right font-hebrew">
                    {portfolioData.projects[mobileCurrentIndex].title}
                  </h3>
                  <p className="text-gray-600 mb-5 text-right font-hebrew flex-1 line-clamp-3">
                    {portfolioData.projects[mobileCurrentIndex].description}
                  </p>
                  <div className="mt-auto">
                    {/* Empty space - no tags */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
  
          <div className="flex justify-center mt-8 gap-2">
            {portfolioData.projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === mobileCurrentIndex 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-500 font-hebrew text-sm">
              פרויקט {mobileCurrentIndex + 1} מתוך {portfolioData.projects.length}
            </span>
          </div>
        </div>
  
        {/* Project Modal with improved design - FULL SCREEN ON MOBILE starting below header */}
        <AnimatePresence>
          {selectedProject && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center md:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                style={{ 
                  position: 'fixed', 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0,
                  zIndex: 9999
                }}
              >
                <motion.div
                  className="w-full bg-white overflow-hidden border-0 md:border md:border-gray-200/50 shadow-2xl flex flex-col
                             h-full md:max-w-4xl md:w-full md:h-auto md:rounded-2xl
                             pt-24 md:pt-0"
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                >
                {/* Modal Header with fixed image dimensions */}
                <div className="relative flex-shrink-0">
                  <div className="h-60 md:h-80 overflow-hidden bg-gray-100">
                    <img
                      src={getProjectImage(selectedProject.id)}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 mix-blend-overlay" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 z-50 border-2 border-gray-300"
                    aria-label="Close modal"
                  >
                    <X size={24} className="hover:text-cyan-600 transition-colors" />
                  </button>
                  <div className="absolute bottom-6 right-6 left-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-right font-hebrew">
                      {selectedProject.title}
                    </h3>
                    {/* MOVED CATEGORY TAG HERE */}
                    <div className="flex items-center gap-4 text-cyan-300 justify-end">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew px-3 py-1 bg-gradient-to-r from-cyan-500/80 to-blue-600/80 text-white text-sm font-semibold rounded-full shadow-md">
                          {selectedProject.category}
                        </span>
                        <Tag size={16} />
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Modal Content - SCROLLABLE ON MOBILE */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-white">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 md:mb-8 text-right font-hebrew">
                    {selectedProject.details || selectedProject.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 text-right font-hebrew">
                      {t('projects.technologies')}
                    </h4>
                    <div className="flex flex-wrap gap-3 justify-end">
                      {selectedProject.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 md:px-4 py-1 md:py-2 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 rounded-full border border-cyan-200/70 font-medium font-hebrew text-sm md:text-base"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05, backgroundColor: "#e0f7fa" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;