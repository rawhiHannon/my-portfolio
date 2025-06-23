import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, FileText, ClipboardCheck, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({ 
    threshold: 0.1, 
    triggerOnce: true,
    rootMargin: '0px 0px -10% 0px' // Trigger earlier
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Two-stage loading to completely eliminate flicker
  useEffect(() => {
    // First - set mounted to true once component is in the DOM
    setIsMounted(true);
    
    // Second - set loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // Small delay to ensure browser has finished initial rendering
    
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      key: 'quantities',
      icon: Calculator,
      gradient: 'from-emerald-500 to-teal-600',
      delay: 0.1
    },
    {
      key: 'estimates',
      icon: FileText,
      gradient: 'from-blue-500 to-cyan-600',
      delay: 0.2
    },
    {
      key: 'documentation',
      icon: ClipboardCheck,
      gradient: 'from-purple-500 to-indigo-600',
      delay: 0.3
    },
    {
      key: 'accounting',
      icon: TrendingUp,
      gradient: 'from-orange-500 to-red-600',
      delay: 0.4
    }
  ];

  const nextService = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Animation variants for smoother transitions
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] // Custom ease curve for more modern feel
      }
    })
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Track the direction of carousel movement
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    nextService();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevService();
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section
      id="services"
      className="relative min-h-screen py-24 md:py-24 pt-32 md:pt-32 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl opacity-75 animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl opacity-75 animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl opacity-80 animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '0.5s' }} />
  
        {/* Additional floating dots with improved animations */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl opacity-80 animate-float-slow" />
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/25 rounded-full blur-lg opacity-80 animate-float-medium"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-indigo-400/30 rounded-full blur-md opacity-80 animate-float-fast" />
        <div
          className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-purple-400/20 rounded-full blur-lg opacity-80 animate-float-medium"
          style={{ animationDelay: '2s' }}
        />
      </div>
  
      <div 
        ref={ref} 
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-500 ${!isMounted ? 'opacity-0' : !isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ visibility: !isMounted ? 'hidden' : 'visible' }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-16 mb-8"
          initial={false}
          animate={inView && isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-hebrew bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {t('services.title')}
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto font-hebrew"
          >
            {t('services.subtitle')}
          </p>
        </motion.div>
  
        {/* Services Grid */}
        <div className="mb-20">
          {/* Desktop Grid - with staggered animations */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={service.key}
                className="group relative"
                variants={cardVariants}
                initial="hidden"
                custom={service.delay}
                animate={inView ? "visible" : "hidden"}
              >
                <div className="relative p-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl hover:bg-white transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/50 h-80 flex flex-col shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Gradient Background with improved hover effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                  />
  
                  {/* Icon with enhanced animation - CENTERED */}
                  <motion.div
                    className={`flex justify-center items-center p-4 bg-gradient-to-br ${service.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 w-16 h-16 mx-auto shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <service.icon size={32} className="text-white" />
                  </motion.div>
  
                  {/* Content */}
                  <div className="flex-1 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300 font-hebrew">
                      {t(`services.items.${service.key}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-hebrew">
                      {t(`services.items.${service.key}.description`)}
                    </p>
                  </div>
  
                  {/* Enhanced hover effect with glow */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl shadow-lg shadow-cyan-500/30"
                    layoutId={`service-border-${service.key}`}
                  />
                </div>
              </div>
            ))}
          </div>
  
          {/* Mobile Carousel - with fixed arrow buttons */}
          <div className="md:hidden relative">
            {/* Fixed size arrow buttons with consistent positioning */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-200"
              style={{ 
                position: 'absolute',
                transform: 'translateY(-50%)',
                minWidth: '48px',
                minHeight: '48px'
              }}
            >
              <ChevronLeft size={24} className="text-gray-600 hover:text-cyan-600 transition-colors" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border border-gray-200"
              style={{ 
                position: 'absolute',
                transform: 'translateY(-50%)',
                minWidth: '48px',
                minHeight: '48px'
              }}
            >
              <ChevronRight size={24} className="text-gray-600 hover:text-cyan-600 transition-colors" />
            </button>
  
            <div className="px-16"> {/* Increased padding for more space around carousel */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="group relative"
                >
                  <div className="relative p-6 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl hover:bg-white transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/50 min-h-[320px] flex flex-col shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${services[currentIndex].gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                    />
                    
                    {/* Icon - CENTERED */}
                    <motion.div
                      className={`flex justify-center items-center p-4 bg-gradient-to-br ${services[currentIndex].gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 w-16 h-16 mx-auto shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {React.createElement(services[currentIndex].icon, {
                        size: 32,
                        className: 'text-white'
                      })}
                    </motion.div>
                    
                    {/* Content - with proper text containment */}
                    <div className="flex-1 text-center px-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300 font-hebrew">
                        {t(`services.items.${services[currentIndex].key}.title`)}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-hebrew break-words hyphens-auto">
                        {t(`services.items.${services[currentIndex].key}.description`)}
                      </p>
                    </div>
                    <motion.div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl shadow-lg shadow-cyan-500/30" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
  
            {/* Enhanced pagination indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {services.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 scale-125 shadow-md shadow-cyan-500/30' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <div className="text-center mt-4">
              <motion.span 
                className="text-gray-500 font-hebrew text-sm bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={currentIndex}
              >
                שירות {currentIndex + 1} מתוך {services.length}
              </motion.span>
            </div>
          </div>
        </div>
  
        {/* Enhanced Bottom CTA */}
        <div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 font-hebrew shadow-lg relative overflow-hidden group"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button background gradient animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
            {/* Text content */}
            <span className="relative z-10">בואו נתחיל לעבוד יחד</span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;