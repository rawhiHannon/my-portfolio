import React from 'react';
import { MapPin, Mail, Phone, Github, Linkedin, Download } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const About = () => {
  const { personal, social } = portfolioConfig;

  return (
    <section id="about" className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-slide-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hi, I'm{' '}
              <span className="text-blue-500">
                {personal.name.split(' ')[0]}
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              {personal.title}
            </h2>
            
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {personal.bio}
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-3 text-blue-500" />
                {personal.location}
              </div>
              <div className="flex items-center text-gray-300">
                <Mail size={18} className="mr-3 text-blue-500" />
                {personal.email}
              </div>
              <div className="flex items-center text-gray-300">
                <Phone size={18} className="mr-3 text-blue-500" />
                {personal.phone}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Mail size={18} />
                Get In Touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Github size={20} />
              </a>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-slide-up">
            <div className="relative">
              <img
                src={personal.avatar}
                alt={personal.name}
                className="w-80 h-80 rounded-full object-cover border-4 border-blue-600"
              />
              <div className="absolute -z-10 w-80 h-80 rounded-full bg-blue-600/20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;