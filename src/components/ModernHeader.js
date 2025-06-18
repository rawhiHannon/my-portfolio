import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calculator } from 'lucide-react';
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
    navigateToSection(sectionName);
    setIsMenuOpen(false);
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
          <nav className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <motion.button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-6 py-3 font-medium transition-all duration-300 rounded-xl overflow-hidden group ${
                  currentSection === item.key 
                    ? 'text-white bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background glow effect for active state */}
                {currentSection === item.key && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 rounded-xl"
                    layoutId="activeNavBackground"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-cyan-600/0 group-hover:from-cyan-500/5 group-hover:to-cyan-600/5 transition-all duration-300 rounded-xl" />
                
                {/* Text */}
                <span className="relative z-10">{t(`navigation.${item.key}`)}</span>
                
                {/* Bottom indicator line */}
                <motion.div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 transition-all duration-300 ${
                    currentSection === item.key ? 'w-3/4 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60'
                  }`}
                />
              </motion.button>
            ))}
          </nav>
  
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-white rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </motion.button>
          </div>
        </div>
  
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-gray-800/50 bg-black/98 backdrop-blur-xl rounded-b-2xl mx-4"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="space-y-2 px-2">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={() => scrollToSection(item.href)}
                    className={`w-full py-4 px-6 rounded-xl transition-all duration-300 text-lg font-medium text-right relative overflow-hidden group ${
                      currentSection === item.key 
                        ? 'text-white bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/30 shadow-lg shadow-cyan-500/10' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.02, x: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active background effect */}
                    {currentSection === item.key && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-cyan-600/5 rounded-xl"
                        layoutId="activeMobileNavBackground"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Side indicator for active state */}
                    <motion.div
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full transition-all duration-300 ${
                        currentSection === item.key ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      }`}
                    />
                    
                    <span className="relative z-10">{t(`navigation.${item.key}`)}</span>
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