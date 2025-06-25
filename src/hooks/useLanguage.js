import { useState, useEffect } from 'react';

// Hebrew-only translations 
const translations = {
  navigation: {
    home: "בית",
    services: "שירותים",
    projects: "פרויקטים", 
    contact: "צור קשר"
  },
  hero: {
    greeting: "מהנדס אזרחי מוסמך",
    name: "ניזאר סמרי",
    title: "מהנדס אזרחי | חשב כמויות | בונה אומדנים",
    subtitle: "מומחה לבניית אומדנים וחישובי כמויות.",
    description: "חישוב כמויות ובניית אומדנים לפרויקטים בענף הבנייה והתשתיות – משלב המכרז ועד שלב ההתחשבנות בשטח.",
    cta: "צפה בפרויקטים",
    contact: "קבל הצעת מחיר"
  },
  services: {
    title: "השירותים שלי",
    subtitle: "שירותי חישוב כמויות ובניית אומדנים מקצועיים",
    items: {
      quantities: {
        title: "חישוב כמויות מדויק",
        description: "חישוב כמויות מפורט לפי תוכניות, מפרטים וכתבי כמויות. כל כמות מוצמדת לסקיצה – החישוב לכל פרקי הענף."
      },
      estimates: {
        title: "בניית אומדנים תחרותיים",
        description: "  בבניית אומדנים מדויקים למכרזים, כולל חלופות – נועד למקסם סיכויי זכייה ושמירה על רווחיות."
      },
      documentation: {
        title: "הגשה מקצועית",
        description: "הגשת סקיצות מסודרות וטבלאות חישוב. קובצי Excel, סקיצות בפורמט AutoCad  ו- PDF ותיוג ברור לכל סעיף בפרויקט."
      },
      accounting: {
        title: "ליווי קבלנים והתחשבנות חודשית",
        description: "התחשבנות חודשית מסודרת מול הפיקוח והקבלן בשטח. איתור סעיפים חריגים לטובת הקבלן ובקרה תקציבית חכמה."
      }
    }
  },
  projects: {
    title: "תחומי ההתמחות שלי בפרויקטים הנדסיים",
    subtitle: "שליטה בפרויקטים מגוונים בענף הבנייה והתשתיות",
    viewProject: "צפה בפרטים",
    technologies: "כלים וטכנולוגיות"
  },
  contact: {
    title: "בואו נתחיל לעבוד",
    subtitle: "מוזמנים ליצור קשר לקבלת הצעת מחיר והתייעצות מקצועית",
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
      responseText: "מענה מהיר ושירות אישי"
    }
  }
};

export const useLanguage = () => {
  // Always Hebrew - no language switching needed
  const currentLanguage = 'he';

  useEffect(() => {
    // Always RTL for Hebrew
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'he';
    document.body.className = 'rtl';
  }, []);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return {
    currentLanguage,
    isRTL: true, // Always RTL
    t
  };
};