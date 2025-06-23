import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useSectionContext } from '../App';

const ModernHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t, isRTL } = useLanguage();
  const { currentSection, navigateToSection, sections } = useSectionContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update activeSection when currentSection changes
  useEffect(() => {
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, [currentSection]);

  const navigation = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const sectionName = href.replace('#', '');
    setIsMenuOpen(false);
    
    // Immediately update active section for visual feedback
    setActiveSection(sectionName);
    
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
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
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
          <nav className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="relative px-5 py-2.5 font-medium text-sm tracking-wide transition-all duration-300 rounded-full overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background layers */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  activeSection === item.key 
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30' 
                    : 'bg-white/5 hover:bg-white/10'
                }`} />
                
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
                
                {/* Glow effect */}
                <div className={`absolute inset-0 transition-all duration-300 ${
                  activeSection === item.key 
                    ? 'shadow-lg shadow-cyan-500/25' 
                    : 'shadow-none group-hover:shadow-md group-hover:shadow-cyan-500/20'
                }`} />
                
                {/* Text */}
                <span className={`relative z-10 transition-all duration-300 ${
                  activeSection === item.key 
                    ? 'text-white drop-shadow-sm' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {t(`navigation.${item.key}`)}
                </span>
              </motion.button>
            ))}
          </nav>
  
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-white bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-gray-800/50 bg-black/95 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-1">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full py-3 px-4 transition-all duration-300 text-lg font-medium text-right rounded-lg mx-2 ${
                      activeSection === item.key 
                        ? 'text-white bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-r-2 border-cyan-400 shadow-lg shadow-cyan-500/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    {t(`navigation.${item.key}`)}
                  </motion.button>
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