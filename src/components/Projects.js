import React, { useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = portfolioConfig;
  
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const ProjectCard = ({ project, featured = false }) => (
    <div 
      className={`glass-card p-6 project-card cursor-pointer fade-in ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
      onClick={() => setSelectedProject(project)}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          {featured && (
            <div className="px-2 py-1 rounded-full text-xs font-semibold flex items-center glass-card">
              <Star size={12} className="mr-1 text-yellow-400" />
              <span className="text-white">Featured</span>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
      <p className="text-blue-100 mb-4 line-clamp-3">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 glass-card text-blue-200 rounded text-xs"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-2 py-1 text-blue-300 text-xs">
            +{project.technologies.length - 4} more
          </span>
        )}
      </div>
      
      <div className="flex space-x-3">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={16} />
          Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <Github size={16} />
          Code
        </a>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 section-transition">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 fade-in">
            Featured Projects
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            Some of my recent work that I'm most proud of
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center fade-in" style={{ animationDelay: '0.4s' }}>
              ⭐ Featured Work
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${0.6 + index * 0.2}s` }}>
                  <ProjectCard project={project} featured={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 text-center fade-in">
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-white hover:text-red-400 text-2xl transition-colors p-2 glass-card rounded-full"
                  >
                    ×
                  </button>
                </div>
                
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <p className="text-blue-100 mb-6 leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 glass-card text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink size={18} />
                    View Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={18} />
                    View Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;