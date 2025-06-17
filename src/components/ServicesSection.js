import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calculator, FileText, ClipboardCheck, TrendingUp } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

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

  return (
    <section id="services" className="relative min-h-screen py-24 md:py-24 pt-32 md:pt-24 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background Elements - More visible and full height */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse" />
        
        {/* Additional floating dots */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-bounce" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-indigo-400/30 rounded-full blur-md animate-ping" />
        <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-purple-400/20 rounded-full blur-lg animate-ping" style={{ animationDelay: '2s' }} />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-hebrew"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto font-hebrew"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        {/* Services Grid - Fixed dimensions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: service.delay }}
            >
              <div className="relative p-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl hover:bg-white transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-400/50 h-80 flex flex-col shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 bg-gradient-to-br ${service.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300 self-start shadow-lg`}
                  whileHover={{ rotate: 5 }}
                >
                  <service.icon size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 text-right">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors duration-300 font-hebrew">
                    {t(`services.items.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 font-hebrew">
                    {t(`services.items.${service.key}.description`)}
                  </p>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl"
                  layoutId={`service-border-${index}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 font-hebrew shadow-lg"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            בואו נתחיל לעבוד יחד
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;