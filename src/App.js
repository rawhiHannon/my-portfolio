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
  const [sectionIntersections, setSectionIntersections] = useState({});
  
  const sections = ['home', 'services', 'projects', 'contact'];
  const observerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

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

  // Setup intersection observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const intersections = {};
      
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        intersections[sectionId] = {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          boundingRect: entry.boundingClientRect
        };
      });
      
      setSectionIntersections(prev => ({ ...prev, ...intersections }));
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
  }, [sections]);

  useEffect(() => {
    setIsLoaded(true);

    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between snaps

    const handleScroll = () => {
      // Update scroll-to-top button
      setShowScrollTop(window.scrollY > 400);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to handle potential section changes
      scrollTimeoutRef.current = setTimeout(() => {
        if (isScrolling) return;

        // Find the section that should be considered "current" based on visibility
        let newCurrentSection = currentSection;
        let maxVisibilityRatio = 0;

        sections.forEach((sectionId, index) => {
          const intersection = sectionIntersections[sectionId];
          if (intersection && intersection.isIntersecting) {
            // Prioritize sections that are more than 50% visible
            if (intersection.intersectionRatio > 0.5 && intersection.intersectionRatio > maxVisibilityRatio) {
              maxVisibilityRatio = intersection.intersectionRatio;
              newCurrentSection = index;
            }
          }
        });

        // Update current section if it changed
        if (newCurrentSection !== currentSection) {
          setCurrentSection(newCurrentSection);
        }
      }, 100);
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

      // Check if we should snap to next/previous section
      const currentSectionId = sections[currentSection];
      const currentIntersection = sectionIntersections[currentSectionId];
      
      if (!currentIntersection) return;

      let shouldSnap = false;
      let targetSectionIndex = currentSection;

      if (delta > 0) {
        // Scrolling down
        const nextSectionIndex = currentSection + 1;
        if (nextSectionIndex < sections.length) {
          const nextSectionId = sections[nextSectionIndex];
          const nextIntersection = sectionIntersections[nextSectionId];
          
          // Snap if next section is 30% or more visible
          if (nextIntersection && nextIntersection.intersectionRatio >= 0.3) {
            shouldSnap = true;
            targetSectionIndex = nextSectionIndex;
          }
        }
      } else {
        // Scrolling up
        const prevSectionIndex = currentSection - 1;
        if (prevSectionIndex >= 0) {
          const prevSectionId = sections[prevSectionIndex];
          const prevIntersection = sectionIntersections[prevSectionId];
          
          // Snap if current section is less than 70% visible (meaning we've scrolled up significantly)
          if (currentIntersection.intersectionRatio < 0.7) {
            shouldSnap = true;
            targetSectionIndex = prevSectionIndex;
          }
        }
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

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling, currentSection, sections, sectionIntersections]);

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