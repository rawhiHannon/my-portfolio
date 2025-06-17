import React, { useEffect, useState, createContext, useContext } from 'react';
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

  const sections = ['home', 'services', 'projects', 'contact'];

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

  useEffect(() => {
    setIsLoaded(true);

    let scrollTimeout;
    let lastScrollTime = 0;
    const scrollCooldown = 1000; // 1 second cooldown between snaps

    const handleScroll = (e) => {
      const now = Date.now();
      
      // Update scroll-to-top button
      setShowScrollTop(window.scrollY > 400);

      // Skip if currently scrolling or in cooldown
      if (isScrolling || (now - lastScrollTime) < scrollCooldown) {
        return;
      }

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set timeout to handle scroll snap
      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're at the very bottom or top
        const isAtBottom = (scrollY + windowHeight) >= documentHeight - 10;
        const isAtTop = scrollY <= 10;
        
        // Don't snap if at extremes
        if (isAtBottom || isAtTop) {
          return;
        }
        
        // Calculate which section we should be in based on scroll position
        const sectionIndex = Math.round(scrollY / windowHeight);
        const targetSection = Math.max(0, Math.min(sectionIndex, sections.length - 1));
        
        // Check if we're close to a section boundary (within 20% of viewport height)
        const sectionPosition = targetSection * windowHeight;
        const distanceFromSection = Math.abs(scrollY - sectionPosition);
        const snapThreshold = windowHeight * 0.2; // 20% of viewport height
        
        if (distanceFromSection < snapThreshold && targetSection !== currentSection) {
          lastScrollTime = now;
          setIsScrolling(true);
          setCurrentSection(targetSection);
          
          // Smooth scroll to the target section
          const targetElement = document.getElementById(sections[targetSection]);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Reset scrolling flag after animation completes
            setTimeout(() => {
              setIsScrolling(false);
            }, 800); // Match the scroll animation duration
          } else {
            setIsScrolling(false);
          }
        }
      }, 150); // Debounce scroll events
    };

    // Handle wheel events for more precise control
    const handleWheel = (e) => {
      const now = Date.now();
      
      // Skip if currently scrolling or in cooldown
      if (isScrolling || (now - lastScrollTime) < scrollCooldown) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate current section based on scroll position
      const currentSectionIndex = Math.round(scrollY / windowHeight);
      
      // Check if we're at the very bottom of the page
      const isAtBottom = (scrollY + windowHeight) >= documentHeight - 10;
      
      // Check if we're at the very top of the page
      const isAtTop = scrollY <= 10;
      
      // Don't snap if trying to scroll down when already at bottom
      if (delta > 0 && isAtBottom) {
        return; // Allow normal behavior (stay at bottom)
      }
      
      // Don't snap if trying to scroll up when already at top
      if (delta < 0 && isAtTop) {
        return; // Allow normal behavior (stay at top)
      }
      
      // Handle fast scrolling - jump multiple sections based on scroll intensity
      const scrollIntensity = Math.abs(delta);
      let sectionJump = 1;
      
      if (scrollIntensity > 100) {
        sectionJump = 2;
      }
      if (scrollIntensity > 200) {
        sectionJump = 3;
      }
      if (scrollIntensity > 300) {
        // Very fast scroll - go to extreme end
        sectionJump = sections.length;
      }
      
      // Determine target section based on scroll direction and intensity
      let targetSectionIndex;
      if (delta > 0) {
        // Scrolling down
        targetSectionIndex = Math.min(currentSectionIndex + sectionJump, sections.length - 1);
      } else {
        // Scrolling up
        targetSectionIndex = Math.max(currentSectionIndex - sectionJump, 0);
      }
      
      // Only snap if we're changing sections and scroll is significant
      if (targetSectionIndex !== currentSectionIndex && Math.abs(delta) > 10) {
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
    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling, currentSection, sections]);

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
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => navigateToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'bg-cyan-500 scale-150 shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
              title={`עבור ל${section === 'home' ? 'בית' : section === 'services' ? 'שירותים' : section === 'projects' ? 'פרויקטים' : 'צור קשר'}`}
            />
          ))}
        </div>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/25 z-50 group"
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 100 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SectionContext.Provider>
  );
}

export default App;