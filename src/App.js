import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Home, Briefcase, FolderOpen, Mail } from 'lucide-react';
import { useLanguage } from './hooks/useLanguage';
import ModernHeader from './components/ModernHeader';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import FloatingElements from './components/FloatingElements';

// Create context for section navigation
const SectionContext = createContext();

export const useSectionContext = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSectionContext must be used within SectionProvider');
  }
  return context;
};

function App() {
  const { isRTL, t } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sectionPositions, setSectionPositions] = useState({});
  const [showSectionIndicator, setShowSectionIndicator] = useState(false);
  
  const sections = ['home', 'services', 'projects', 'contact'];
  const sectionNames = ['בית', 'שירותים', 'פרויקטים', 'צור קשר'];
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);
  const indicatorTimeoutRef = useRef(null);
  // Store positions in a ref to avoid state updates during calculations
  const positionsRef = useRef({});

  // Function to navigate to a specific section
  const navigateToSection = (sectionName) => {
    const sectionIndex = sections.indexOf(sectionName);
    if (sectionIndex !== -1) {
      setCurrentSection(sectionIndex);
      setIsScrolling(true);
      
      const targetElement = document.getElementById(sectionName);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        setTimeout(() => {
          setIsScrolling(false);
        }, 800);
      } else {
        setIsScrolling(false);
      }
    }
  };

  // Context value
  const sectionContextValue = {
    currentSection: sections[currentSection],
    currentSectionIndex: currentSection,
    navigateToSection,
    sections
  };

  // Function to calculate section positions - modified to use ref
  const updateSectionPositions = () => {
    const positions = {};
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        positions[sectionId] = {
          top: rect.top + scrollTop,
          bottom: rect.bottom + scrollTop,
          height: rect.height,
          center: rect.top + scrollTop + rect.height / 2
        };
      }
    });
    
    // Store in ref first
    positionsRef.current = positions;
    
    // Only update state if needed (once calculations are complete)
    // This is done outside of calculation functions to avoid render loops
    setSectionPositions(positions);
    
    return positions;
  };

  // Function to determine current section based on scroll position
  const getCurrentSectionFromScroll = (positions = positionsRef.current) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const viewportCenter = scrollTop + windowHeight / 2;
    
    // Find the section whose center is closest to the viewport center
    let closestSection = 0;
    let closestDistance = Infinity;
    
    sections.forEach((sectionId, index) => {
      const position = positions[sectionId];
      if (position) {
        // Calculate distance from viewport center to section center
        const distance = Math.abs(viewportCenter - position.center);
        
        // Also consider if the section is currently visible
        const isVisible = position.top <= scrollTop + windowHeight && 
                          position.bottom >= scrollTop;
        
        // Prioritize visible sections and closer distances
        const adjustedDistance = isVisible ? distance : distance + 10000;
        
        if (adjustedDistance < closestDistance) {
          closestDistance = adjustedDistance;
          closestSection = index;
        }
      }
    });
    
    // Special case: if we're at the very bottom of the page, show last section
    const documentHeight = document.documentElement.scrollHeight;
    const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;
    if (isAtBottom) {
      closestSection = sections.length - 1;
    }
    
    // Special case: if we're at the very top, show first section
    if (scrollTop <= 50) {
      closestSection = 0;
    }
    
    return closestSection;
  };

  // Function to show section indicator temporarily
  const showIndicatorTemporarily = () => {
    setShowSectionIndicator(true);
    
    // Clear existing timeout
    if (indicatorTimeoutRef.current) {
      clearTimeout(indicatorTimeoutRef.current);
    }
    
    // Hide after 3 seconds
    indicatorTimeoutRef.current = setTimeout(() => {
      setShowSectionIndicator(false);
    }, 3000);
  };

  // Function to check if user can snap to next/previous section
  const canSnapToSection = (targetSectionIndex, scrollDirection) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const currentSectionId = sections[currentSection];
    // Use the ref version for calculations to avoid re-renders
    const positions = positionsRef.current;
    const currentPosition = positions[currentSectionId];
    
    if (!currentPosition) return false;

    if (scrollDirection > 0) {
      // Scrolling down - check if we've scrolled through most of current section
      // and at least 20% of next section is visible
      const currentSectionProgress = (scrollTop - currentPosition.top) / Math.max(currentPosition.height - windowHeight, 1);
      const nextSectionId = sections[targetSectionIndex];
      const nextPosition = positions[nextSectionId];
      
      if (!nextPosition) return false;
      
      // Calculate how much of the next section is visible
      const nextSectionVisibleHeight = Math.max(0, Math.min(nextPosition.bottom, scrollTop + windowHeight) - Math.max(nextPosition.top, scrollTop));
      const nextSectionVisibility = nextSectionVisibleHeight / nextPosition.height;
      
      // Allow snap if:
      // 1. Current section is taller than viewport AND we've scrolled through most of it (80%+)
      // 2. OR current section fits in viewport AND next section is 20%+ visible
      // 3. OR we've scrolled past the current section entirely
      if (currentPosition.height > windowHeight) {
        return currentSectionProgress >= 0.8 && nextSectionVisibility >= 0.2;
      } else {
        return nextSectionVisibility >= 0.2 || scrollTop >= currentPosition.bottom - windowHeight * 0.3;
      }
    } else {
      // Scrolling up - mirror the logic of scrolling down
      const prevSectionId = sections[targetSectionIndex];
      const prevPosition = positions[prevSectionId];
      
      if (!prevPosition) return false;
      
      // Calculate how much of the previous section is visible
      const prevSectionVisibleHeight = Math.max(0, Math.min(prevPosition.bottom, scrollTop + windowHeight) - Math.max(prevPosition.top, scrollTop));
      const prevSectionVisibility = prevSectionVisibleHeight / prevPosition.height;
      
      // Calculate how close we are to the top of the current section
      // This should be similar to the downward logic but inverted
      const distanceFromTopOfSection = scrollTop - currentPosition.top;
      const currentSectionProgressFromTop = distanceFromTopOfSection / Math.max(currentPosition.height - windowHeight, 1);
      
      // Allow snap if:
      // 1. Current section is taller than viewport AND we're close to the top (less than 20% scrolled down from top)
      // 2. OR current section fits in viewport AND previous section is 20%+ visible
      if (currentPosition.height > windowHeight) {
        // For tall sections: only snap if we're very close to the top AND previous section is visible
        return currentSectionProgressFromTop <= 0.2 && prevSectionVisibility >= 0.2;
      } else {
        // For normal sections: snap if previous section is 20%+ visible
        return prevSectionVisibility >= 0.2;
      }
    }
  };

  // Setup intersection observer for better performance
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -10% 0px', // Trigger when section is 10% into viewport
      threshold: [0, 0.25, 0.5, 0.75, 1.0]
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Update section positions when elements come into view
      const now = Date.now();
      if (now - lastUpdateTimeRef.current > 100) { // Throttle updates
        lastUpdateTimeRef.current = now;
        requestAnimationFrame(() => {
          // Update positions in ref
          const positions = updateSectionPositions();
          const newCurrentSection = getCurrentSectionFromScroll(positions);
          
          if (newCurrentSection !== currentSection && !isScrolling) {
            setCurrentSection(newCurrentSection);
          }
        });
      }
    }, observerOptions);

    // Observe all sections
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections, currentSection, isScrolling]);

  // Initial setup and event listeners
  useEffect(() => {
    setIsLoaded(true);

    // Initial setup
    const initialSetupTimeout = setTimeout(() => {
      updateSectionPositions();
    }, 100);

    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between snaps

    const handleScroll = () => {
      // Update scroll-to-top button
      setShowScrollTop(window.scrollY > 400);

      // Show section indicator on scroll
      showIndicatorTemporarily();

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Throttled section update
      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrolling) return;

        const newCurrentSection = getCurrentSectionFromScroll();
        if (newCurrentSection !== currentSection) {
          setCurrentSection(newCurrentSection);
        }
      }, 50); // Reduced timeout for more responsive updates
    };

    // Handle wheel events for section snapping
    const handleWheel = (e) => {
      const now = Date.now();
      
      // Skip if currently scrolling or in cooldown
      if (isScrolling || (now - lastScrollTime) < scrollCooldown) {
        return;
      }

      const delta = e.deltaY;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're at the very bottom or top
      const isAtBottom = (scrollY + windowHeight) >= documentHeight - 10;
      const isAtTop = scrollY <= 10;
      
      // Allow normal scrolling at extremes
      if ((delta > 0 && isAtBottom) || (delta < 0 && isAtTop)) {
        return;
      }

      // Determine target section based on scroll direction
      let targetSectionIndex = currentSection;
      let shouldSnap = false;

      if (delta > 0 && currentSection < sections.length - 1) {
        // Scrolling down
        targetSectionIndex = currentSection + 1;
        shouldSnap = canSnapToSection(targetSectionIndex, delta);
      } else if (delta < 0 && currentSection > 0) {
        // Scrolling up
        targetSectionIndex = currentSection - 1;
        shouldSnap = canSnapToSection(targetSectionIndex, delta);
      }

      // Perform the snap if conditions are met
      if (shouldSnap && Math.abs(delta) > 10) {
        e.preventDefault();
        lastScrollTime = now;
        setIsScrolling(true);
        setCurrentSection(targetSectionIndex);
        
        const targetElement = document.getElementById(sections[targetSectionIndex]);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          setTimeout(() => {
            setIsScrolling(false);
          }, 800);
        } else {
          setIsScrolling(false);
        }
      }
    };

    const handleResize = () => {
      // Throttle resize updates
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        updateSectionPositions();
      }, 100);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(initialSetupTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (indicatorTimeoutRef.current) {
        clearTimeout(indicatorTimeoutRef.current);
      }
    };
  }, [isScrolling, currentSection, sections]); // Removed sectionPositions from deps

  const scrollToTop = () => {
    navigateToSection('home');
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white text-xl font-medium">טוען פורטפוליו...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <SectionContext.Provider value={sectionContextValue}>
      <div className={`App ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Floating Background Elements */}
        <FloatingElements />
        
        {/* Header */}
        <ModernHeader />
        
        {/* Main Content with section snapping */}
        <main className="relative z-10">
          <HeroSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Smart Section Indicator - Only shows on scroll and hides on small screens */}
        <AnimatePresence>
          {showSectionIndicator && (
            <motion.div
              className="fixed right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => navigateToSection(section)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
                    index === currentSection
                      ? 'bg-cyan-400 scale-125 shadow-md shadow-cyan-400/50'
                      : 'bg-gray-400 hover:bg-gray-300 hover:scale-110'
                  }`}
                  title={`עבור ל${sectionNames[index]}`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Active indicator ring */}
                  {index === currentSection && (
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-cyan-300 scale-150 opacity-50"
                      animate={{ scale: [1.5, 1.8, 1.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* iPhone-Style Bottom Navigation - Mobile Only */}
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-gray-300">
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" />
          
          {/* Safe area padding for iPhone */}
          <div className="relative px-4 pt-2 pb-6">
            <div className="flex justify-around items-center">
              {[
                { key: 'home', icon: Home, label: t('navigation.home') },
                { key: 'services', icon: Briefcase, label: t('navigation.services') },
                { key: 'projects', icon: FolderOpen, label: t('navigation.projects') },
                { key: 'contact', icon: Mail, label: t('navigation.contact') }
              ].map((item, index) => {
                const isActive = currentSection === index;
                return (
                  <motion.button
                    key={item.key}
                    onClick={() => navigateToSection(item.key)}
                    className="flex flex-col items-center justify-center p-2 min-w-[60px]"
                    whileTap={{ scale: 0.9 }}
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Icon container with active state */}
                    <motion.div
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30' 
                          : 'bg-transparent'
                      }`}
                      animate={{
                        y: isActive ? -2 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <item.icon 
                        size={24} 
                        className={`transition-all duration-300 ${
                          isActive ? 'text-white' : 'text-gray-600'
                        }`}
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <motion.span
                      className={`text-xs font-medium mt-1 transition-all duration-300 font-hebrew ${
                        isActive ? 'text-cyan-600 font-semibold' : 'text-gray-500'
                      }`}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        scale: isActive ? 1.05 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {item.label}
                    </motion.span>

                    {/* Active dot indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 w-1 h-1 bg-cyan-500 rounded-full"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </div>
          
          {/* iPhone home indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-400/50 rounded-full" />
        </div>

        {/* Scroll to Top Button */}
      </div>
    </SectionContext.Provider>
  );
}

export default App;