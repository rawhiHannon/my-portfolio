import React, { useEffect, useState, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
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
  const { isRTL } = useLanguage();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [sectionPositions, setSectionPositions] = useState({});
  
  const sections = ['home', 'services', 'projects', 'contact'];
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastUpdateTimeRef = useRef(0);

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

  // Function to calculate section positions
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
    setSectionPositions(positions);
    return positions;
  };

  // Function to determine current section based on scroll position
  const getCurrentSectionFromScroll = (positions = sectionPositions) => {
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

  // Function to check if user can snap to next/previous section
  const canSnapToSection = (targetSectionIndex, scrollDirection) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const currentSectionId = sections[currentSection];
    const currentPosition = sectionPositions[currentSectionId];
    
    if (!currentPosition) return false;

    if (scrollDirection > 0) {
      // Scrolling down - check if we've scrolled through most of current section
      // and at least 20% of next section is visible
      const currentSectionProgress = (scrollTop - currentPosition.top) / Math.max(currentPosition.height - windowHeight, 1);
      const nextSectionId = sections[targetSectionIndex];
      const nextPosition = sectionPositions[nextSectionId];
      
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
      const prevPosition = sectionPositions[prevSectionId];
      
      if (!prevPosition) return false;
      
      // Calculate how much of the previous section is visible
      const prevSectionVisibleHeight = Math.max(0, Math.min(prevPosition.bottom, scrollTop + windowHeight) - Math.max(prevPosition.top, scrollTop));
      const prevSectionVisibility = prevSectionVisibleHeight / prevPosition.height;
      
      // Calculate progress from the bottom of current section (inverted for upward scroll)
      const currentSectionProgressFromBottom = Math.max(0, (currentPosition.bottom - (scrollTop + windowHeight)) / Math.max(currentPosition.height - windowHeight, 1));
      
      // Allow snap if:
      // 1. Current section is taller than viewport AND we've scrolled up through most of it from bottom (80%+)
      // 2. OR current section fits in viewport AND previous section is 20%+ visible
      // 3. OR we've scrolled past the current section entirely (near top)
      if (currentPosition.height > windowHeight) {
        return currentSectionProgressFromBottom >= 0.8 && prevSectionVisibility >= 0.2;
      } else {
        return prevSectionVisibility >= 0.2 || scrollTop <= currentPosition.top + windowHeight * 0.3;
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

  useEffect(() => {
    setIsLoaded(true);

    // Initial setup
    setTimeout(() => {
      updateSectionPositions();
    }, 100);

    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between snaps

    const handleScroll = () => {
      // Update scroll-to-top button
      setShowScrollTop(window.scrollY > 400);

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
      // Update positions on resize
      setTimeout(updateSectionPositions, 100);
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling, currentSection, sections, sectionPositions]);

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

        {/* Section Indicator */}
        <div className="fixed right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 shadow-lg">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => navigateToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
                index === currentSection
                  ? 'bg-indigo-500 scale-125 shadow-md shadow-indigo-500/50'
                  : 'bg-gray-400 hover:bg-gray-300 hover:scale-110'
              }`}
              title={`עבור ל${section === 'home' ? 'בית' : section === 'services' ? 'שירותים' : section === 'projects' ? 'פרויקטים' : 'צור קשר'}`}
            >
              {/* Active indicator ring */}
              {index === currentSection && (
                <div className="absolute inset-0 rounded-full border-2 border-indigo-300 scale-150 opacity-50 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-6 right-4 xl:right-8 p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-indigo-500/25 z-50 group"
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 100 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SectionContext.Provider>
  );
}

export default App;