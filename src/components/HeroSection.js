import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Phone, Mail, User } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolioData';

const HeroSection = () => {
  const { t, isRTL } = useLanguage();
  const canvasRef = useRef(null);

  // Animated background with moving particles
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity * 2})`;
        ctx.fill();
        
        // Connect nearby particles
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
<section id="home" 
className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-32 md:pt-0 pb-10 lg:pb-0"
>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-transparent to-blue-600/15 z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50 z-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Profile Card - Mobile: order-1, Desktop: order-1 */}
          <motion.div
            className="relative order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 text-center shadow-2xl shadow-gray-900/10">
              {/* Profile Picture */}
              <motion.div
                className="relative mx-auto mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-40 h-40 mx-auto relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-4 border-cyan-400/50 flex items-center justify-center overflow-hidden shadow-lg">
                    <img 
                      src="/nizar.jpg"
                      alt="ניזאר סמרי"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full hidden items-center justify-center">
                      <User size={60} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    ✓
                  </div>
                </div>
              </motion.div>


              {/* Professional Info */}
              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 font-hebrew">
                  {portfolioData.personal.name}
                </h1>
                <p className="text-cyan-600 font-medium text-lg font-hebrew">
                  {portfolioData.personal.title}
                </p>
                <p className="text-gray-600 font-hebrew">
                  {portfolioData.personal.company}
                </p>
              </motion.div>

              {/* Contact Info */}
              <motion.div 
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {[
                  { icon: Phone, text: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}` },
                  { icon: Mail, text: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}` },
                  { icon: MapPin, text: portfolioData.personal.location }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between p-3 bg-gray-50/70 rounded-xl hover:bg-gray-100/70 transition-colors border border-gray-200/30">
                      <span className="text-gray-700 text-sm font-hebrew">{item.text}</span>
                      <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg shadow-md">
                        <item.icon size={16} className="text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Main Content - Mobile: order-2, Desktop: order-2 */}
          <motion.div
            className="space-y-8 order-2 lg:order-2 text-center lg:text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.p 
                className="text-cyan-600 font-medium text-lg md:text-xl tracking-wider font-hebrew"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {t('hero.greeting')}
              </motion.p>

              <motion.h2 
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight font-hebrew"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <span className="block bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                חישובי כמויות
                </span>
                <span className="block text-gray-800">
                בניית אומדנים
                </span>
              </motion.h2>

              <motion.p 
                className="text-xl md:text-2xl text-gray-600 font-light font-hebrew"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.p 
                className="text-lg text-gray-500 leading-relaxed font-hebrew"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {t('hero.description')}
              </motion.p>
            </motion.div>

              {/* ─── Mobile-only Action Buttons ─── */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 lg:hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <button
                  onClick={scrollToProjects}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.cta')}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button
                  onClick={scrollToContact}
                  className="px-8 py-4 border-2 border-cyan-500 text-cyan-600 font-semibold rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('hero.contact')}
                </button>
              </motion.div>

            {/* Slogan */}
            <motion.div
              className="p-6 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200/50 shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <p className="text-2xl font-bold text-cyan-700 font-hebrew">
                {portfolioData.personal.slogan}
              </p>
            </motion.div>

            {/* Action Buttons - RTL Aligned */}
              <motion.div 
                className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-start pt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
              <motion.button
                onClick={scrollToProjects}
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.cta')}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                onClick={scrollToContact}
                className="px-8 py-4 border-2 border-cyan-500 text-cyan-600 font-semibold rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('hero.contact')}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;