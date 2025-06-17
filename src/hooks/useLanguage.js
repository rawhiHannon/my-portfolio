import { useState, useEffect } from 'react';

// Inline translations (no external JSON files needed)
const translations = {
  en: {
    navigation: {
      home: "Home",
      services: "Services", 
      projects: "Projects",
      contact: "Contact"
    },
    hero: {
      greeting: "Precision Engineering",
      name: "Geodetic Solutions",
      title: "Licensed Geodetic Engineer",
      subtitle: "Surveying & Personal Projects",
      description: "Delivering precise land surveying, mapping, and geodetic solutions with cutting-edge technology and professional expertise.",
      cta: "View Projects",
      contact: "Get Quote"
    },
    services: {
      title: "Professional Services",
      subtitle: "Comprehensive geodetic engineering solutions",
      items: {
        surveying: {
          title: "Land Surveying",
          description: "Precise boundary surveys, topographic mapping, and construction layout with GPS and total station technology."
        },
        mapping: {
          title: "Digital Mapping",
          description: "High-accuracy GIS mapping, aerial photogrammetry, and 3D terrain modeling for engineering projects."
        },
        construction: {
          title: "Construction Support",
          description: "Site preparation, foundation layout, elevation certificates, and as-built surveys for construction projects."
        },
        analysis: {
          title: "Spatial Analysis",
          description: "Advanced spatial data analysis, coordinate transformations, and geodetic network adjustments."
        }
      }
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Real-world geodetic engineering solutions",
      viewProject: "View Details",
      technologies: "Technologies Used"
    },
    contact: {
      title: "Start Your Project",
      subtitle: "Get professional geodetic engineering consultation",
      form: {
        name: "Full Name",
        email: "Email Address", 
        phone: "Phone Number",
        project: "Project Type",
        message: "Project Details",
        send: "Send Message",
        sending: "Sending..."
      },
      info: {
        phone: "Phone",
        email: "Email",
        location: "Location",
        response: "Response Time",
        responseText: "Typically respond within 24 hours"
      }
    }
  },
  he: {
    navigation: {
      home: "בית",
      services: "שירותים",
      projects: "פרויקטים", 
      contact: "צור קשר"
    },
    hero: {
      greeting: "הנדסה מדויקת",
      name: "פתרונות גאודטיים",
      title: "מהנדס מדידות מוסמך",
      subtitle: "מדידות ופרויקטים אישיים",
      description: "מתן פתרונות מדויקים למדידות קרקע, מיפוי ופתרונות גאודטיים באמצעות טכנולוגיה מתקדמת ומומחיות מקצועית.",
      cta: "צפה בפרויקטים",
      contact: "קבל הצעת מחיר"
    },
    services: {
      title: "שירותים מקצועיים",
      subtitle: "פתרונות הנדסה גאודטית מקיפים",
      items: {
        surveying: {
          title: "מדידות קרקע",
          description: "מדידות גבול מדויקות, מיפוי טופוגרפי ותכנון בנייה באמצעות GPS וטכנולוגיית תחנה טוטאלית."
        },
        mapping: {
          title: "מיפוי דיגיטלי", 
          description: "מיפוי GIS ברמת דיוק גבוהה, צילום אוויר ופוטוגרמטריה ומודלים תלת-ממדיים של השטח."
        },
        construction: {
          title: "תמיכה בבנייה",
          description: "הכנת אתר, תכנון יסודות, תעודות גובה ומדידות כפי שנבנה עבור פרויקטי בנייה."
        },
        analysis: {
          title: "ניתוח מרחבי",
          description: "ניתוח נתונים מרחביים מתקדם, טרנספורמציות קואורדינטות והתאמות רשת גאודטית."
        }
      }
    },
    projects: {
      title: "פרויקטים נבחרים",
      subtitle: "פתרונות הנדסה גאודטית מהעולם האמיתי",
      viewProject: "צפה בפרטים",
      technologies: "טכנולוגיות בשימוש"
    },
    contact: {
      title: "התחל את הפרויקט שלך",
      subtitle: "קבל ייעוץ מקצועי בהנדסה גאודטית",
      form: {
        name: "שם מלא",
        email: "כתובת אימייל",
        phone: "מספר טלפון", 
        project: "סוג פרויקט",
        message: "פרטי הפרויקט",
        send: "שלח הודעה",
        sending: "שולח..."
      },
      info: {
        phone: "טלפון",
        email: "אימייל",
        location: "מיקום",
        response: "זמן תגובה",
        responseText: "בדרך כלל עונים תוך 24 שעות"
      }
    }
  }
};

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('he'); // Hebrew as default

  useEffect(() => {
    console.log('Language changed to:', currentLanguage); // Debug log
    // Update HTML dir and lang attributes
    document.documentElement.dir = currentLanguage === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    // Also update body class for additional RTL styling if needed
    document.body.className = currentLanguage === 'he' ? 'rtl' : 'ltr';
  }, [currentLanguage]);

  const toggleLanguage = () => {
    console.log('toggleLanguage called, current:', currentLanguage); // Debug log
    const newLang = currentLanguage === 'he' ? 'en' : 'he';
    console.log('Setting new language to:', newLang); // Debug log
    setCurrentLanguage(newLang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    console.log(`Translating "${key}" in "${currentLanguage}":`, value); // Debug log
    return value || key;
  };

  return {
    currentLanguage,
    toggleLanguage,
    isRTL: currentLanguage === 'he',
    t
  };
};