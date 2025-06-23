import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useSectionContext } from '../App';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, isRTL } = useLanguage();
  const { currentSection, navigateToSection, sections } = useSectionContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const sectionName = href.replace('#', '');
    setIsMenuOpen(false);
    
    // Add small delay to prevent flickering
    setTimeout(() => {
      if (navigateToSection) {
        navigateToSection(sectionName);
      } else {
        const targetElement = document.getElementById(sectionName);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }, 100);
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-cyan-500/30' : 'bg-black/80 backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
              <img
                src="/logo.png"
                alt="ניזאר סמרי"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            </div>
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">נ.ס. שירותי הנדסה</h1>
              <p className="text-xs text-cyan-400">ניזאר סמרי - מהנדס אזרחי</p>
            </div>
          </motion.div>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-6 py-3 font-medium transition-all duration-200 rounded-lg overflow-hidden group ${
                  currentSection === item.key 
                    ? 'text-white bg-cyan-500/20 border border-cyan-400/50' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {/* Simple hover effect */}
                <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Text */}
                <span className="relative z-10">{t(`navigation.${item.key}`)}</span>
                
                {/* Active indicator */}
                {currentSection === item.key && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-cyan-400" />
                )}
              </button>
            ))}
          </nav>
  
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-gray-800 bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                {navigation.map((item, index) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full py-3 px-4 transition-colors duration-200 text-lg font-medium text-right ${
                      currentSection === item.key 
                        ? 'text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400' 
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-white/5'
                    }`}
                  >
                    {t(`navigation.${item.key}`)}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default ModernHeader;