export interface ProjectAIContext {
  architectureDiagramSummary?: string;
  keyChallengesSolved?: string[];
  systemDesignHighlights?: string[];
  sampleCodeSnippet?: string;
  suggestedQuestions?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  videoUrl?: string;
  tags: string[];
  liveDemoUrl: string;
  githubUrl: string;
  featured: boolean;
  category: 'Full Stack' | 'AI/ML' | 'Frontend' | 'Backend';
  stars?: number;
  aiContext?: ProjectAIContext;
}

export interface Skill {
  name: string;
  category: string;
  icon: string; // Icon identifier or svg path key
  level?: string;
  isFeatured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  location: string;
  logo?: string;
}



export const personalData = {
  name: "Abhinav Srivastava",
  initials: "AS",
  role: "Full Stack Developer",
  statusText: "Open to Work",
  bio: "I build scalable full stack applications and intelligent solutions that solve real world problems.",
  location: "Delhi, India",
  email: "abhinavsrivas05@gmail.com",
  phone: "+91 8738823248",
  telegram: "",
  resumeUrl: "/assets/Abhinav_Srivastava.pdf",
  resumeFilename: "Abhinav_Srivastava.pdf",
  metrics: [
    { label: "Projects Completed", value: "12+", icon: "folder" },
    { label: "Years Experience", value: "1+", icon: "user" },
    { label: "Happy Clients", value: "10+", icon: "globe" },
    { label: "Open Source Contributions", value: "8+", icon: "code" }
  ],
  socials: {
    github: "https://github.com/abhinav0510",
    linkedin: "https://www.linkedin.com/in/abhinav-srivastava-184251247/",
    twitter: "https://x.com",
    instagram: "https://instagram.com/abhinavsrivasttava",
    email: "mailto:abhinavsrivas05@gmail.com"
  }
};

export const projectsData: Project[] = [
  {
    id: "heal-me",
    title: "Heal Me",
    description: "A full stack platform for cancer patients to connect, share experiences, and receive community support.",
    longDescription: "Heal Me provides a comprehensive patient support network featuring real-time peer messaging, medical resource sharing, appointment tracking, and AI-assisted health log summarization. Designed with an empathetic UI and HIPAA-compliant data encryption practices.",
    image: "/projects/heal-me.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
    liveDemoUrl: "https://healme.demo.dev",
    githubUrl: "https://github.com/abhinavsrivastava/heal-me",
    featured: true,
    category: "Full Stack",
    stars: 24,
    aiContext: {
      architectureDiagramSummary: "Next.js 14 App Router client -> Serverless Prisma API -> Encrypted PostgreSQL database. Realtime sockets for peer-to-peer chat.",
      keyChallengesSolved: [
        "Column-level AES encryption for health data privacy",
        "Empathetic, accessible UI with sub-100ms real-time chat"
      ],
      systemDesignHighlights: [
        "Prisma ORM with strict schema validation",
        "Role-based access control (RBAC) for patients & doctors"
      ],
      suggestedQuestions: [
        "⚡ How is data privacy & encryption handled?",
        "🛠️ What were the biggest technical challenges?",
        "💼 Summarize this project in 3 sentences for a recruiter",
        "🔒 Explain the database architecture & Prisma ORM setup"
      ]
    }
  },
  {
    id: "job-tracker",
    title: "Job Application Tracker",
    videoUrl: "/assets/get-placedvideo.mp4",
    description: "Track, manage, and analyze your job search pipeline in one place with automated metrics and interview alerts.",
    longDescription: "A cockpit-inspired dashboard system built to streamline job hunts. Features include interactive Kanban board status management, automated email sync reminders, salary benchmarking analytics, and resume version matching algorithms.",
    image: "/projects/job-tracker.png",
    tags: ["React", "Spring Boot", "MySQL", "Tailwind CSS", "REST API"],
    liveDemoUrl: "https://get-placed-six.vercel.app/",
    githubUrl: "https://github.com/abhinavsrivastava/get-placed",
    featured: true,
    category: "Full Stack",
    stars: 18,
    aiContext: {
      architectureDiagramSummary: "React SPA -> Spring Boot REST Controllers -> JPA / Hibernate -> MySQL DB. Background Quartz email scheduler.",
      keyChallengesSolved: [
        "Smooth drag-and-drop state syncing without double renders",
        "Spring Quartz job scheduling for automated follow-up emails"
      ],
      systemDesignHighlights: [
        "REST API with Spring Security & JWT auth",
        "Indexed SQL queries for fast analytics calculations"
      ],
      suggestedQuestions: [
        "⚡ How does the Spring Boot backend communicate with MySQL?",
        "🛠️ How is the Kanban drag-and-drop state synchronized?",
        "💼 3-Sentence Recruiter Summary",
        "📊 How are salary analytics calculated?"
      ]
    }
  },
  {
  id: "catlin-cms",
  title: "CATLIN Pharmaceutical CMS",
  videoUrl: "/assets/CatlinCMS.mp4",
  description: "A secure full-stack content management system built for CATLIN Pharmaceuticals to manage products, media, company content, and website data through an authenticated admin dashboard.",
  longDescription: "A production-ready pharmaceutical content management platform built with React/Next.js and Spring Boot, backed by MySQL and object/file storage. Provides authenticated administration for managing products, categories, images, documents, company information, and website content, with a focus on security, validation, reliable file handling, and production deployment through Docker and Nginx.",
  image: "/projects/catlin-cms.png",
  tags: [
    "React",
    "Spring Boot",
    "Java",
    "MySQL",
    "Docker",
    "Nginx",
    "REST API",
    "JWT",
    "CMS"
  ],
  liveDemoUrl: "https://catlinpharmaceuticals.com",
  githubUrl: "https://github.com/abhinav0510/CatlinPharma",
  featured: true,
  category: "Full Stack",
  stars: 0,
  aiContext: {
    architectureDiagramSummary: "React Frontend -> Nginx Reverse Proxy -> Spring Boot REST API -> MySQL Database + File/Object Storage.",
    keyChallengesSolved: [
      "Building a secure authenticated CMS for pharmaceutical website content",
      "Managing product images and documents with reliable upload, storage, validation, and retrieval workflows",
      "Designing a clean separation between frontend, backend, database, and production infrastructure",
      "Protecting administrative APIs and sensitive configuration from unauthorized access",
      "Deploying the complete application using Docker and Nginx with HTTPS and production routing"
    ],
    systemDesignHighlights: [
      "RESTful Spring Boot backend serving authenticated CMS APIs",
      "Role-based administrative access and protected API endpoints",
      "MySQL persistence layer for structured pharmaceutical and website content",
      "Dockerized application services for consistent local and production environments",
      "Nginx reverse proxy handling production traffic and frontend/backend routing",
      "HTTPS-enabled production deployment with domain-based routing",
      "Validated file upload pipeline for CMS-managed media and documents"
    ],
    suggestedQuestions: [
      "🏗️ Explain the complete CATLIN CMS architecture",
      "🔐 How is authentication and API security implemented?",
      "📦 How does Docker + Nginx deployment work?",
      "🗄️ How does the Spring Boot backend communicate with MySQL?",
      "📁 How are uploaded images and documents stored and served?",
      "🌐 How does a request travel from catlinpharmaceuticals.com to the backend?",
      "🛡️ What security vulnerabilities should I look for in this CMS?",
      "🚀 How would you troubleshoot a production deployment issue?"
    ]
  }

  },
  // {
  //   id: "dev-portal-cms",
  //   title: "Enterprise Content Hub",
  //   description: "Headless CMS and high-speed API gateway optimized for modern web applications and micro-frontend architectures.",
  //   longDescription: "Built with Next.js App Router and Spring Boot microservices, delivering optimized dynamic pages with under 50ms response times via Redis caching and PostgreSQL query optimization.",
  //   image: "/projects/content-hub.png",
  //   tags: ["Next.js", "Spring Boot", "Redis", "Docker", "PostgreSQL"],
  //   liveDemoUrl: "https://cms.demo.dev",
  //   githubUrl: "https://github.com/abhinavsrivastava/content-hub",
  //   featured: false,
  //   category: "Backend",
  //   stars: 15,
  //   aiContext: {
  //     architectureDiagramSummary: "Next.js App Router -> Spring Boot API Gateway -> Redis Cache Cluster -> PostgreSQL Database.",
  //     keyChallengesSolved: [
  //       "Distributed cache invalidation on content publish events",
  //       "Achieving sub-50ms p99 query latency under load"
  //     ],
  //     systemDesignHighlights: [
  //       "Redis Pub/Sub cache sync",
  //       "Docker containerization for environment parity"
  //     ],
  //     suggestedQuestions: [
  //       "⚡ Explain the Redis caching strategy",
  //       "🛠️ How are microservices orchestrated?"
  //     ]
  //   }
  // },
  // {
  //   id: "realtime-chat-engine",
  //   title: "Distributed WebSockets Chat",
  //   description: "Low-latency real-time messaging engine with Redis Pub/Sub backplane and room management.",
  //   longDescription: "Engineered to handle high-throughput message streaming with connection pooling, typing indicators, end-to-end message delivery acknowledgments, and horizontally scalable socket nodes.",
  //   image: "/projects/content-hub.png",
  //   tags: ["Node.js", "Express", "WebSockets", "Redis", "React"],
  //   liveDemoUrl: "https://chat.demo.dev",
  //   githubUrl: "https://github.com/abhinavsrivastava/websocket-chat",
  //   featured: false,
  //   category: "Backend",
  //   stars: 29,
  //   aiContext: {
  //     architectureDiagramSummary: "React -> Node.js WebSocket (ws) -> Redis Pub/Sub Backplane -> MongoDB Store.",
  //     keyChallengesSolved: [
  //       "Scaling WebSockets horizontally across server nodes"
  //     ],
  //     systemDesignHighlights: [
  //       "Heartbeat ping-pong for broken connection cleanup",
  //       "Redis Pub/Sub message broker"
  //     ],
  //     suggestedQuestions: [
  //       "⚡ How does Redis Pub/Sub enable WebSocket scaling?",
  //       "🛠️ How are dropped connections handled?"
  //     ]
  //   }
  // },
  // {
  //   id: "cloud-devops-pipeline",
  //   title: "Automated K8s Deployment Pipeline",
  //   description: "Zero-downtime CI/CD deployment pipeline with Docker containerization and Kubernetes cluster management.",
  //   longDescription: "Comprehensive DevOps pipeline integrating GitHub Actions, Helm charts, Prometheus monitoring, and automated rollback triggers across multi-zone Kubernetes clusters.",
  //   image: "/projects/job-tracker.png",
  //   tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Helm"],
  //   liveDemoUrl: "https://devops.demo.dev",
  //   githubUrl: "https://github.com/abhinavsrivastava/k8s-ci-cd-pipeline",
  //   featured: false,
  //   category: "Backend",
  //   stars: 21
  // }
];

export const skillsData: Skill[] = [
  // Most Advanced (Featured)
  { name: "React", category: "Frameworks & Libraries", icon: "react", level: "Advanced", isFeatured: true },
  { name: "Spring Boot", category: "Backend", icon: "spring", level: "Advanced", isFeatured: true },
  { name: "Tailwind CSS", category: "Frameworks & Libraries", icon: "tailwind", level: "Advanced", isFeatured: true },

  // Languages
  { name: "JavaScript", category: "Languages", icon: "js", level: "Advanced" },
  { name: "TypeScript", category: "Languages", icon: "ts", level: "Advanced" },
  { name: "Python", category: "Languages", icon: "python", level: "Advanced" },
  { name: "Java", category: "Languages", icon: "java", level: "Advanced" },

  // Frameworks & Libraries
  { name: "Next.js", category: "Frameworks & Libraries", icon: "next", level: "Advanced" },
  { name: "LangChain", category: "Frameworks & Libraries", icon: "langchain", level: "Advanced" },
  { name: "LangGraph", category: "Frameworks & Libraries", icon: "langgraph", level: "Intermediate" },

  // Backend & AI
  { name: "Node.js", category: "Backend", icon: "node", level: "Advanced" },
  { name: "Express.js", category: "Backend", icon: "express", level: "Intermediate" },
  { name: "Kafka", category: "Backend", icon: "kafka", level: "Intermediate" },
  { name: "Redis", category: "Backend", icon: "redis", level: "Advanced" },
  { name: "RAG Architecture", category: "Backend", icon: "rag", level: "Advanced" },

  // Databases & Cloud
  { name: "PostgreSQL", category: "Databases & Cloud", icon: "postgres", level: "Advanced" },
  { name: "MongoDB", category: "Databases & Cloud", icon: "mongo", level: "Intermediate" },
  { name: "MySQL", category: "Databases & Cloud", icon: "mysql", level: "Advanced" },
  { name: "AWS", category: "Databases & Cloud", icon: "aws", level: "Intermediate" },

  // Tools & Platforms / DevOps
  { name: "Docker", category: "Tools & Platforms", icon: "docker", level: "Advanced" },
  { name: "Kubernetes", category: "Tools & Platforms", icon: "kubernetes", level: "Intermediate" },
  { name: "CI/CD", category: "Tools & Platforms", icon: "cicd", level: "Advanced" },
  { name: "GitHub", category: "Tools & Platforms", icon: "github", level: "Advanced" },
  { name: "VS Code", category: "Tools & Platforms", icon: "vscode", level: "Advanced" }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "cognizant",
    role: "Trainee - Cognizant GenC (TIBCO Track)",
    company: "Cognizant Technology Solutions",
    period: "Mar 2025 – May 2026",
    location: "India",
    bullets: [
      "Completed training in TIBCO BW5, Eclipse, SQL, and enterprise integration tools.",
      "Worked on integration concepts, XML/JSON parsing, and real-time microservice communication scenarios.",
      "Gained hands-on experience with enterprise middleware architecture and API security patterns."
    ],
    skills: ["TIBCO BW5", "Eclipse", "SQL", "Enterprise Integration", "REST APIs"]
  }
];

export const educationData: EducationItem[] = [
  {
    id: "btech-AI/ML",
    degree: "B.Tech in Artificial Intelligence And Machine Learning",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    period: "2022 – 2026",
    score: "CGPA: 7.2/10",
    location: "Uttar Pradesh, India",
    logo: "/assets/AKTU.png"
  }
];

