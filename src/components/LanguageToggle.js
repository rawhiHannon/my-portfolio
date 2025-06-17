import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('LanguageToggle button clicked!'); // Debug log
    console.log('Current language before toggle:', currentLanguage); // Debug log
    toggleLanguage();
    setTimeout(() => {
      console.log('Language after toggle should be:', currentLanguage === 'he' ? 'en' : 'he'); // Debug log
    }, 100);
  };

  console.log('LanguageToggle render, current language:', currentLanguage); // Debug log

  return (
    <motion.button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Globe size={18} />
      <span className="font-medium">
        {currentLanguage === 'he' ? 'English' : 'עברית'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;