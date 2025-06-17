import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, Cloud, Palette } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { skills } = portfolioConfig;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend':
        return <Palette size={24} />;
      case 'Backend':
        return <Code size={24} />;
      case 'Database':
        return <Database size={24} />;
      case 'Cloud':
        return <Cloud size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section id="skills" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categorySkills = skills.filter(skill => skill.category === category);
            
            return (
              <div key={category} className="glass-card p-6 fade-in">
                <div className="flex items-center mb-4">
                  <div className="p-2 glass-card mr-3 text-blue-300">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{category}</h3>
                </div>
                
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-100 font-medium">{skill.name}</span>
                        <span className="text-blue-300 text-sm">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div
                          className="skill-progress"
                          style={{
                            width: isVisible ? `${skill.level}%` : '0%',
                            transitionDelay: `${index * 0.1}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Experience Section */}
        {portfolioConfig.experience && portfolioConfig.experience.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white text-center mb-12">Experience</h3>
            <div className="max-w-4xl mx-auto">
              {portfolioConfig.experience.map((exp, index) => (
                <div key={exp.id} className="glass-card p-6 mb-6 fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-white">{exp.title}</h4>
                      <p className="text-blue-300 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-blue-200 text-sm mt-2 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-blue-100 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-full text-sm border border-blue-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;