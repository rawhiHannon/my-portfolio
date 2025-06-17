export const portfolioData = {
    personal: {
      name: "Alex Cohen", // Change to actual name
      email: "alex@geodetic-solutions.com",
      phone: "+972-50-123-4567", 
      location: "Tel Aviv, Israel",
      linkedin: "https://linkedin.com/in/alexcohen",
      company: "Geodetic Solutions Ltd."
    },
    
    projects: [
      {
        id: 1,
        title: {
          en: "Tel Aviv Marina Development",
          he: "פיתוח מרינה תל אביב"
        },
        description: {
          en: "Comprehensive surveying and mapping for luxury waterfront development project covering 15 hectares with precision GPS and LiDAR technology.",
          he: "מדידה ומיפוי מקיף לפרויקט פיתוח חוף ים יוקרתי המכסה 15 הקטרים באמצעות GPS מדויק וטכנולוגיית LiDAR."
        },
        image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
        technologies: ["GPS RTK", "LiDAR", "AutoCAD", "GIS", "Photogrammetry"],
        category: "Commercial Development",
        year: "2024"
      },
      {
        id: 2, 
        title: {
          en: "Highway 6 Extension Survey",
          he: "מדידת הרחבת כביש 6"
        },
        description: {
          en: "Precise corridor mapping and elevation surveys for 25km highway extension project including bridges and interchanges with millimeter accuracy.",
          he: "מיפוי מסדרון מדויק ומדידות גובה לפרויקט הרחבת כביש באורך 25 ק״מ כולל גשרים וצמתים ברמת דיוק של מילימטר."
        },
        image: "https://images.unsplash.com/photo-1486744123896-7de4b19b4b1b?w=800&h=600&fit=crop",
        technologies: ["Total Station", "GPS Network", "AutoCAD Civil 3D", "Drone Survey"],
        category: "Infrastructure",
        year: "2023"
      },
      {
        id: 3,
        title: {
          en: "Archaeological Site Documentation",
          he: "תיעוד אתר ארכיאולוגי"
        },
        description: {
          en: "3D mapping and precise documentation of ancient settlement site using advanced photogrammetry and terrestrial laser scanning.",
          he: "מיפוי תלת-ממדי ותיעוד מדויק של אתר יישוב עתיק באמצעות פוטוגרמטריה מתקדמת וסריקת לייזר יבשתית."
        },
        image: "https://images.unsplash.com/photo-1539650116574-75c0c6d0893b?w=800&h=600&fit=crop",
        technologies: ["Terrestrial Laser Scanning", "Photogrammetry", "3D Modeling", "GIS"],
        category: "Cultural Heritage",
        year: "2024"
      },
      {
        id: 4,
        title: {
          en: "Residential Complex Boundary Survey",
          he: "מדידת גבולות מתחם מגורים"
        },
        description: {
          en: "Precise property boundary determination for 120-unit residential complex with legal documentation and coordinate certification.",
          he: "קביעת גבולות נכס מדויקת למתחם מגורים של 120 יחידות עם תיעוד משפטי ואישור קואורדינטות."
        },
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        technologies: ["GPS RTK", "Total Station", "Legal Documentation", "CAD Mapping"],
        category: "Residential",
        year: "2023"
      },
      {
        id: 5,
        title: {
          en: "Industrial Zone Topographic Survey",
          he: "מדידה טופוגרפית אזור תעשייה"
        },
        description: {
          en: "Comprehensive topographic mapping of 200-hectare industrial zone including utilities, drainage, and infrastructure planning.",
          he: "מיפוי טופוגרפי מקיף של אזור תעשייה בשטח 200 הקטר כולל תשתיות, ניקוז ותכנון תשתית."
        },
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&h=600&fit=crop",
        technologies: ["Drone Mapping", "GIS Analysis", "Contour Mapping", "Infrastructure Planning"],
        category: "Industrial",
        year: "2024"
      },
      {
        id: 6,
        title: {
          en: "Coastal Erosion Monitoring",
          he: "ניטור שחיקת חוף"
        },
        description: {
          en: "Long-term coastal monitoring project using GPS and remote sensing to track shoreline changes and erosion patterns.",
          he: "פרויקט ניטור חוף לטווח ארוך באמצעות GPS וחישה מרחוק למעקב אחר שינויי קו החוף ודפוסי שחיקה."
        },
        image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop",
        technologies: ["GPS Monitoring", "Remote Sensing", "GIS Analysis", "Environmental Modeling"],
        category: "Environmental",
        year: "2023"
      }
    ]
  };