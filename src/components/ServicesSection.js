import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapIcon, Satellite, Building, BarChart3 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const ServicesSection = () => {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const services = [
    {
      key: 'surveying',
      icon: MapIcon,
      gradient: 'from-emerald-500 to-teal-600',
      delay: 0.1
    },
    {
      key: 'mapping',
      icon: Satellite,
      gradient: 'from-blue-500 to-cyan-600',
      delay: 0.2
    },
    {
      key: 'construction',
      icon: Building,
      gradient: 'from-purple-500 to-indigo-600',
      delay: 0.3
    },
    {
      key: 'analysis',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-24 md:py-24 pt-32 md:pt-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className={`text-4xl md:text-6xl font-bold text-white mb-6 ${isRTL ? 'font-hebrew' : ''}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('services.title')}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('services.subtitle')}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: service.delay }}
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-500/30">
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <motion.div
                  className={`inline-flex p-4 bg-gradient-to-br ${service.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <service.icon size={32} className="text-white" />
                </motion.div>

                {/* Content */}
                <h3 className={`text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className={`text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t(`services.items.${service.key}.description`)}
                </p>

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
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Professional Consultation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;