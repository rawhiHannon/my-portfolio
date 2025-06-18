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
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mobile carousel state
  const [mobileCurrentIndex, setMobileCurrentIndex] = useState(0);

  // Project images mapping
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

  // Desktop carousel - Show 4 items at a time, navigate by changing the slice
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(portfolioData.projects.length / itemsPerPage);
  
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

  return (
      <section
        id="projects"
        className="relative min-h-screen py-24 md:py-24 pt-40 md:pt-32 bg-gradient-to-b from-gray-50 via-white to-gray-100 overflow-hidden"
      >
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-bounce" />
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/25 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-indigo-400/30 rounded-full blur-md animate-ping" />
        <div
          className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-purple-400/20 rounded-full blur-lg animate-ping"
          style={{ animationDelay: '2s' }}
        />
      </div>
  
      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-hebrew"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto font-hebrew"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>
  
        {/* Desktop Carousel */}
        <div className="relative hidden md:block">
          {currentPage > 0 && (
            <button
              onClick={goToPrevPage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={goToNextPage}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200"
            >
              <ChevronRight size={24} />
            </button>
          )}
  
          <div className="px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getCurrentProjects().map((project) => (
                <div key={project.id} className="w-full">
                  <div
                    className="cursor-pointer group transition-all duration-200"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-cyan-400/50 transition-all duration-200 h-96 flex flex-col shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={getProjectImage(project.id)}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center text-6xl">
                          {(() => {
                            const icons = {
                              1: '🏢',
                              2: '🏠',
                              3: '🔧',
                              4: '🏗️',
                              5: '🌉',
                              6: '⚡'
                            };
                            return icons[project.id] || '🏗️';
                          })()}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-gray-800 font-medium font-hebrew shadow-lg">
                            <ExternalLink size={18} />
                            {t('projects.viewProject')}
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full font-hebrew shadow-md">
                          {project.category}
                        </div>
                      </div>
  
                      <div className="p-6 flex-1 flex flex-col bg-white">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-200 text-right font-hebrew">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-right font-hebrew flex-1 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {project.technologies.slice(0, 2).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full border border-cyan-200 font-hebrew"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 2 && (
                            <span className="px-3 py-1 text-gray-500 text-xs font-hebrew">
                              +{project.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-3">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    i === currentPage
                      ? 'bg-cyan-500 scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
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
  
        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <button
            onClick={prevProject}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200"
          >
            <ChevronRight size={20} />
          </button>
  
          <div className="px-12">
            <motion.div
              key={mobileCurrentIndex}
              className="cursor-pointer group transition-all duration-200"
              onClick={() => setSelectedProject(portfolioData.projects[mobileCurrentIndex])}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl border border-gray-200/50 hover:border-cyan-400/50 transition-all duration-200 h-96 flex flex-col shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getProjectImage(portfolioData.projects[mobileCurrentIndex].id)}
                    alt={portfolioData.projects[mobileCurrentIndex].title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 hidden items-center justify-center text-6xl">
                    {(() => {
                      const icons = {
                        1: '🏢',
                        2: '🏠',
                        3: '🔧',
                        4: '🏗️',
                        5: '🌉',
                        6: '⚡'
                      };
                      return icons[portfolioData.projects[mobileCurrentIndex].id] || '🏗️';
                    })()}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-gray-800 font-medium font-hebrew shadow-lg">
                      <ExternalLink size={18} />
                      {t('projects.viewProject')}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full font-hebrew shadow-md">
                    {portfolioData.projects[mobileCurrentIndex].category}
                  </div>
                </div>
  
                <div className="p-6 flex-1 flex flex-col bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-cyan-600 transition-colors duration-200 text-right font-hebrew">
                    {portfolioData.projects[mobileCurrentIndex].title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-right font-hebrew flex-1 line-clamp-3">
                    {portfolioData.projects[mobileCurrentIndex].description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {portfolioData.projects[mobileCurrentIndex].technologies.slice(0, 2).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full border border-cyan-200 font-hebrew"
                      >
                        {tech}
                      </span>
                    ))}
                    {portfolioData.projects[mobileCurrentIndex].technologies.length > 2 && (
                      <span className="px-3 py-1 text-gray-500 text-xs font-hebrew">
                        +{portfolioData.projects[mobileCurrentIndex].technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
  
          <div className="flex justify-center mt-6 gap-2">
            {portfolioData.projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setMobileCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  idx === mobileCurrentIndex ? 'bg-cyan-500 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-500 font-hebrew text-sm">
              פרויקט {mobileCurrentIndex + 1} מתוך {portfolioData.projects.length}
            </span>
          </div>
        </div>
  
        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative">
                  <div className="h-80 overflow-hidden">
                    <img
                      src={{
                        1: '/1.jpg',
                        2: '/2.jpg',
                        3: '/3.jpg',
                        4: '/4.jpg',
                        5: '/5.jpg',
                        6: '/6.jpg'
                      }[selectedProject.id] || '/1.jpg'}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 left-4 p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full transition-colors shadow-lg"
                  >
                    <X size={24} />
                  </button>
                  <div className="absolute bottom-6 right-6 left-6">
                    <h3 className="text-3xl font-bold text-white mb-2 text-right font-hebrew">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-4 text-cyan-300 justify-end">
                      <div className="flex items-center gap-2">
                        <span className="font-hebrew">{selectedProject.category}</span>
                        <Tag size={16} />
                      </div>
                    </div>
                  </div>
                </div>
  
                {/* Modal Content */}
                <div className="p-8 bg-white">
                  <p className="text-gray-700 text-lg leading-relaxed mb-8 text-right font-hebrew">
                    {selectedProject.details || selectedProject.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4 text-right font-hebrew">
                      {t('projects.technologies')}
                    </h4>
                    <div className="flex flex-wrap gap-3 justify-end">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 rounded-full border border-cyan-200 font-medium font-hebrew"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
  
};

export default ProjectsSection;