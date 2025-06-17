import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Calendar, Tag, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolioData';

const ProjectsSection = () => {
  const { t, isRTL, currentLanguage } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState(null);

  const ProjectCard = ({ project, index }) => (
    <motion.div
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onClick={() => setSelectedProject(project)}
      whileHover={{ y: -10 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-500">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title[currentLanguage]}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
            initial={false}
          >
            <motion.div
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-medium"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ExternalLink size={18} />
              {t('projects.viewProject')}
            </motion.div>
          </motion.div>

          {/* Year Badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-full">
            {project.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
            {project.title[currentLanguage]}
          </h3>
          
          <p className={`text-gray-400 mb-4 line-clamp-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            {project.description[currentLanguage]}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-white/10 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/30"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 text-gray-500 text-xs">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Category */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Tag size={14} />
            {project.category}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-24 md:py-24 pt-32 md:pt-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className={`text-4xl md:text-6xl font-bold text-white mb-6 ${isRTL ? 'font-hebrew' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('projects.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('projects.subtitle')}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title[currentLanguage]}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-black/50 to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className={`text-3xl font-bold text-white mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {selectedProject.title[currentLanguage]}
                    </h3>
                    <div className="flex items-center gap-4 text-cyan-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {selectedProject.year}
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        {selectedProject.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className={`text-gray-300 text-lg leading-relaxed mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {selectedProject.description[currentLanguage]}
                  </p>

                  <div className="mb-6">
                    <h4 className={`text-xl font-semibold text-white mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t('projects.technologies')}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 rounded-full border border-cyan-500/30 font-medium"
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
  );
};

export default ProjectsSection;