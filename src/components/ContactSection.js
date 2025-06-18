import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolioData';

const ContactSection = () => {
  const { t, isRTL } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', project: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone}`,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: MapPin,
      label: t('contact.info.location'),
      value: portfolioData.personal.location,
      gradient: 'from-red-500 to-pink-600'
    },
    {
      icon: Clock,
      label: t('contact.info.response'),
      value: t('contact.info.responseText'),
      gradient: 'from-purple-500 to-indigo-600'
    }
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-12 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle size={40} className="text-white" />
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-hebrew">הודעה נשלחה בהצלחה!</h3>
            <p className="text-gray-600 mb-8 font-hebrew">תודה שפניתם אלי. אחזור אליכם תוך 24 שעות.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-hebrew shadow-lg"
            >
              שלח הודעה נוספת
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-24 pt-40 md:pt-32 bg-gradient-to-b from-gray-50 via-white to-gray-100 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
      </div>
  
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 font-hebrew"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('contact.title')}
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto font-hebrew"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>
  
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      className="flex items-start gap-4 p-6 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl hover:bg-white hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-105 shadow-xl shadow-gray-900/5 hover:shadow-2xl hover:shadow-cyan-500/10"
                    >
                      <div
                        className={`p-3 bg-gradient-to-r ${info.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-md`}
                      >
                        <info.icon size={24} className="text-white" />
                      </div>
                      <div className="text-right">
                        <h4 className="text-gray-900 font-semibold mb-1 font-hebrew">
                          {info.label}
                        </h4>
                        <p className="text-gray-600 group-hover:text-cyan-600 transition-colors duration-300 font-hebrew">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-6 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-900/5">
                      <div
                        className={`p-3 bg-gradient-to-r ${info.gradient} rounded-xl shadow-md`}
                      >
                        <info.icon size={24} className="text-white" />
                      </div>
                      <div className="text-right">
                        <h4 className="text-gray-900 font-semibold mb-1 font-hebrew">
                          {info.label}
                        </h4>
                        <p className="text-gray-600 font-hebrew">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
  
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-8 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-right font-hebrew">
                    {t('contact.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50/70 border border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300 text-right font-hebrew"
                    placeholder={t('contact.form.name')}
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-right font-hebrew">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50/70 border border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300 text-right font-hebrew"
                    placeholder={t('contact.form.email')}
                  />
                </div>
              </div>
  
              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-right font-hebrew">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50/70 border border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300 text-right font-hebrew"
                    placeholder={t('contact.form.phone')}
                  />
                </div>
                {/* Project Type */}
                <div>
                  <label className="block text-gray-900 font-medium mb-2 text-right font-hebrew">
                    {t('contact.form.project')}
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50/70 border border-gray-300/50 rounded-xl text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300 font-hebrew"
                  >
                    <option value="" className="bg-white">
                      בחר סוג פרויקט
                    </option>
                    <option value="residential" className="bg-white">
                      בנייני מגורים
                    </option>
                    <option value="infrastructure" className="bg-white">
                      תשתיות
                    </option>
                    <option value="renovation" className="bg-white">
                      שיפוצים
                    </option>
                    <option value="tama" className="bg-white">
                      פרויקטי תמ"א
                    </option>
                    <option value="industrial" className="bg-white">
                      פרויקטים תעשייתיים
                    </option>
                    <option value="consultation" className="bg-white">
                      ייעוץ והערכה
                    </option>
                    <option value="other" className="bg-white">
                      אחר
                    </option>
                  </select>
                </div>
              </div>
  
              {/* Message */}
              <div>
                <label className="block text-gray-900 font-medium mb-2 text-right font-hebrew">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-gray-50/70 border border-gray-300/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:bg-white transition-all duration-300 resize-vertical text-right font-hebrew"
                  placeholder={t('contact.form.message')}
                />
              </div>
  
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="font-hebrew">{t('contact.form.sending')}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Send size={20} />
                    <span className="font-hebrew">{t('contact.form.send')}</span>
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
  
};

export default ContactSection;