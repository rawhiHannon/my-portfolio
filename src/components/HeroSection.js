import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, User, Linkedin } from 'lucide-react';
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
    <section
      id="home"
      className="relative min-h-screen flex justify-center
                 items-center md:items-start
                 overflow-hidden
                 bg-gradient-to-br from-gray-50 via-white to-gray-100
                 pt-28 md:pt-32 pb-16 lg:pb-16"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-transparent to-blue-600/15 z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-100/50 z-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-3">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Mobile: Key Services Highlight - Desktop: Profile Card */}
          <motion.div
            className="relative order-1 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Mobile View - Modern Glass Morphism Interface */}
            <div className="lg:hidden">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                
                {/* Hero Profile Glass Card */}
                <motion.div
                  className="relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-1 shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  {/* Animated gradient border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 rounded-3xl opacity-20 blur-sm animate-pulse"></div>
                  
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6">
            
                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mb-6">
                      
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img 
                            src="/nizar.jpg"
                            alt="ניזאר סמרי"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 hidden items-center justify-center">
                            <User size={24} className="text-gray-500" />
                          </div>
                        </div>
                        {/* Active indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                          <motion.div
                            className="w-2 h-2 bg-white rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>

                      <div className="flex-1 text-right">
                        <motion.h1
                          className="text-lg font-bold text-gray-900 font-hebrew"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          {portfolioData.personal.name}
                        </motion.h1>
                        <motion.p
                          className="text-sm text-gray-600 font-hebrew"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 }}
                        >
                          מהנדס אזרחי מוסמך
                        </motion.p>
                        <motion.p
                          className="text-xs text-gray-500 font-hebrew"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.2 }}
                        >
                          {portfolioData.personal.company}
                        </motion.p>
                      </div>
                    </div>

                    {/* Status Banner */}
                    <motion.div
                      className="flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl py-3 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-sm font-medium text-gray-700 font-hebrew">
                        זמין לפרויקטים חדשים
                      </span>
                    </motion.div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          icon: Phone,
                          label: "התקשר",
                          href: `tel:${portfolioData.personal.phone}`,
                          gradient: "from-gray-600 to-gray-700",
                          delay: 1.6
                        },
                        {
                          icon: Mail,
                          label: "מייל",
                          href: `mailto:${portfolioData.personal.email}`,
                          gradient: "from-gray-600 to-gray-700",
                          delay: 1.8
                        },
                        {
                          icon: Linkedin,
                          label: "LinkedIn",
                          href: "https://www.linkedin.com/in/nezarsomri-eng/",
                          target: "_blank",
                          gradient: "from-gray-600 to-gray-700",
                          delay: 2.0
                        }
                      ].map((action, index) => (
                        <motion.a
                          key={index}
                          href={action.href}
                          target={action.target || "_self"}
                          rel={action.target ? "noopener noreferrer" : ""}
                          className={`group relative bg-gradient-to-br ${action.gradient} p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: action.delay }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          <div className="relative flex flex-col items-center text-center">
                            <action.icon className="text-white mb-3" />
                            <span className="text-xs font-medium text-white font-hebrew">
                              {action.label}
                            </span>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Modern Footer */}
              </motion.div>
            </div>

            {/* Desktop View - Profile Card */}
            <div className="hidden lg:block">
              <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl p-7 text-center shadow-[0_8px_32px_rgba(0,0,0,0.12)] shadow-cyan-500/8 max-w-md mx-auto relative overflow-hidden">
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                  <video
                    className="w-full h-full object-cover opacity-15"
                    style={{ objectPosition: '50% 10%' }}
                    src="/videos/cranes-cinstructions.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to bottom,rgba(0,0,0,0) 60%,rgba(0,0,0,0.8) 100%)'
                    }}
                  />
                </div>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  {/* Profile Picture */}
                  <motion.div
                    className="relative mx-auto mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="w-32 h-32 mx-auto relative">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border border-white/50 flex items-center justify-center overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                        <img 
                          src="/nizar.jpg"
                          alt="ניזאר סמרי"
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full hidden items-center justify-center">
                          <User size={44} className="text-gray-500" />
                        </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white border-2 border-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Professional Info */}
                  <motion.div
                    className="space-y-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h1 className="text-xl font-bold text-gray-900 font-hebrew">
                      {portfolioData.personal.name}
                    </h1>
                    <p className="text-gray-600 font-medium text-base font-hebrew">
                      {portfolioData.personal.title}
                    </p>
                    <p className="text-gray-500 text-sm font-hebrew">
                      {portfolioData.personal.company}
                    </p>
                  </motion.div>

                  {/* Contact Info */}
                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    {[
                      { icon: Phone, text: portfolioData.personal.phone, href: `tel:${portfolioData.personal.phone}`, color: 'from-green-400 to-emerald-500' },
                      { icon: Mail, text: portfolioData.personal.email, href: `mailto:${portfolioData.personal.email}`, color: 'from-blue-400 to-cyan-500' },
                      { icon: () => (
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        ), text: 'LinkedIn', href: 'https://www.linkedin.com/in/nezarsomri-eng/', color: 'from-blue-600 to-blue-700' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="group/contact"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                      >
                        {item.href ? (
                          <a href={item.href} target={item.text === 'LinkedIn' ? '_blank' : '_self'} rel={item.text === 'LinkedIn' ? 'noopener noreferrer' : ''} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 border border-white/40 group-hover/contact:border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
                            <span className="text-gray-600 text-sm font-hebrew group-hover/contact:text-gray-900 transition-colors">{item.text}</span>
                            <div className={`p-2.5 bg-gradient-to-r ${item.color} rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] group-hover/contact:shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all`}>
                              <item.icon size={16} className="text-white" />
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                            <span className="text-gray-600 text-sm font-hebrew">{item.text}</span>
                            <div className={`p-2.5 bg-gradient-to-r ${item.color} rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)]`}>
                              <item.icon size={16} className="text-white" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
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