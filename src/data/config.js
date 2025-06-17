// 🎨 PORTFOLIO CONFIGURATION
// Edit this file to customize the portfolio for any person

export const portfolioConfig = {
    // Personal Information
    personal: {
      name: "John Doe",
      title: "Full Stack Developer",
      subtitle: "Crafting digital experiences with modern technologies",
      bio: "I'm a passionate full-stack developer with 3+ years of experience building web applications. I love creating user-friendly interfaces and robust backend systems.",
      location: "New York, USA",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
  
    // Social Links
    social: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      twitter: "https://twitter.com/johndoe",
      portfolio: "https://johndoe.dev"
    },
  
    // Skills (name and proficiency level 0-100)
    skills: [
      { name: "React", level: 90, category: "Frontend" },
      { name: "JavaScript", level: 85, category: "Frontend" },
      { name: "TypeScript", level: 80, category: "Frontend" },
      { name: "Node.js", level: 75, category: "Backend" },
      { name: "Python", level: 70, category: "Backend" },
      { name: "MongoDB", level: 75, category: "Database" },
      { name: "PostgreSQL", level: 70, category: "Database" },
      { name: "AWS", level: 65, category: "Cloud" }
    ],
  
    // Projects
    projects: [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
        longDescription: "A comprehensive e-commerce platform built with modern technologies. Includes features like user registration/login, product catalog, shopping cart, payment integration with Stripe, order management, and admin panel for inventory management.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        demoUrl: "https://demo-ecommerce.vercel.app",
        githubUrl: "https://github.com/johndoe/ecommerce-platform",
        featured: true
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
        longDescription: "A modern task management application inspired by Trello and Asana. Features include real-time collaboration, drag-and-drop task organization, team workspaces, file attachments, and notification system.",
        technologies: ["React", "TypeScript", "Firebase", "Material-UI", "Socket.io"],
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        demoUrl: "https://taskmaster-app.vercel.app",
        githubUrl: "https://github.com/johndoe/task-manager",
        featured: true
      },
      {
        id: 3,
        title: "Weather Dashboard",
        description: "Interactive weather dashboard displaying current conditions, forecasts, and historical data with beautiful visualizations.",
        longDescription: "A comprehensive weather application that provides current weather conditions, 7-day forecasts, weather maps, and historical data visualization using Chart.js. Integrates with OpenWeatherMap API.",
        technologies: ["React", "Chart.js", "OpenWeather API", "Tailwind CSS"],
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
        demoUrl: "https://weather-dash.vercel.app",
        githubUrl: "https://github.com/johndoe/weather-dashboard",
        featured: false
      },
      {
        id: 4,
        title: "Social Media Dashboard",
        description: "Analytics dashboard for social media management with data visualization and automated reporting features.",
        longDescription: "A comprehensive social media analytics dashboard that aggregates data from multiple platforms, provides insights through interactive charts, and generates automated reports for social media managers.",
        technologies: ["Vue.js", "D3.js", "Express", "Redis", "Docker"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        demoUrl: "https://social-dash.vercel.app",
        githubUrl: "https://github.com/johndoe/social-dashboard",
        featured: false
      }
    ],
  
    // Experience
    experience: [
      {
        id: 1,
        title: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        period: "2022 - Present",
        description: "Lead development of web applications using React and Node.js. Mentored junior developers and improved team productivity by 30%.",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
      },
      {
        id: 2,
        title: "Frontend Developer",
        company: "Digital Agency",
        period: "2020 - 2022",
        description: "Developed responsive web applications and improved website performance by 40%. Collaborated with designers to implement pixel-perfect UI/UX.",
        technologies: ["React", "JavaScript", "SASS", "Webpack"]
      }
    ],
  
    // Contact form configuration
    contact: {
      formspreeEndpoint: "https://formspree.io/f/your-form-id", // Replace with your Formspree endpoint
      message: "Let's work together! I'm always open to discussing new opportunities and interesting projects."
    },
  
    // Theme colors (optional - for future customization)
    theme: {
      primary: "#667eea",
      secondary: "#764ba2",
      accent: "#f093fb"
    }
  };