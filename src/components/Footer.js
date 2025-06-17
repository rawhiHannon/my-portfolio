import React from 'react';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';
import { portfolioConfig } from '../data/config';

const Footer = () => {
  const { personal, social } = portfolioConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {personal.name}
            </h3>
            <p className="text-blue-200 mb-4">
              {personal.title}
            </p>
            <p className="text-blue-300 text-sm">
              Building digital experiences with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-blue-200 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2">
              <a
                href={`mailto:${personal.email}`}
                className="text-blue-200 hover:text-white transition-colors text-sm flex items-center"
              >
                <Mail size={16} className="mr-2" />
                {personal.email}
              </a>
              <p className="text-blue-300 text-sm flex items-center">
                📍 {personal.location}
              </p>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass-card text-white hover:text-blue-300 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 glass-card text-white hover:text-blue-300 transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-2 glass-card text-white hover:text-blue-300 transition-colors"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className="flex items-center text-blue-300 text-sm">
            <span>© {currentYear} {personal.name}. Made with</span>
            <Heart size={16} className="mx-2 text-red-400" />
            <span>using React</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;