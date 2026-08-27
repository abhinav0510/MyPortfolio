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
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
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
    linkedin: "https://linkedin.com",
    twitter: "https://x.com",
    instagram: "https://instagram.com",
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
    id: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Evaluate resumes using LLM APIs to receive real-time ATS compatibility scoring, skill gap detection, and feedback.",
    longDescription: "Leverages OpenAI & FastAPI to evaluate resume ATS compatibility against specific job descriptions. Highlights missing technical keywords, calculates relevance scores, and generates polished summary revisions in seconds.",
    image: "/projects/resume-analyzer.png",
    tags: ["Next.js", "FastAPI", "Python", "OpenAI API", "AI/ML"],
    liveDemoUrl: "https://resumeai.demo.dev",
    githubUrl: "https://github.com/abhinavsrivastava/ai-resume-analyzer",
    featured: true,
    category: "AI/ML",
    stars: 32,
    aiContext: {
      architectureDiagramSummary: "Next.js -> Async FastAPI -> PyPDF2 Document Parser -> OpenAI Tokenizer -> Pydantic JSON Validator.",
      keyChallengesSolved: [
        "Extracting text from complex multi-column PDFs cleanly",
        "Strict Pydantic JSON schema to prevent LLM hallucinations"
      ],
      systemDesignHighlights: [
        "Server-Sent Events (SSE) for streaming analysis output",
        "Token optimization reducing API costs by 40%"
      ],
      suggestedQuestions: [
        "⚡ How does PDF parsing work under the hood?",
        "🛠️ How do you prevent LLM hallucinations?",
        "💼 Give me a 30-second elevator pitch",
        "🧠 What embeddings/models are used?"
      ]
    }
  },
  {
    id: "dev-portal-cms",
    title: "Enterprise Content Hub",
    description: "Headless CMS and high-speed API gateway optimized for modern web applications and micro-frontend architectures.",
    longDescription: "Built with Next.js App Router and Spring Boot microservices, delivering optimized dynamic pages with under 50ms response times via Redis caching and PostgreSQL query optimization.",
    image: "/projects/content-hub.png",
    tags: ["Next.js", "Spring Boot", "Redis", "Docker", "PostgreSQL"],
    liveDemoUrl: "https://cms.demo.dev",
    githubUrl: "https://github.com/abhinavsrivastava/content-hub",
    featured: false,
    category: "Backend",
    stars: 15,
    aiContext: {
      architectureDiagramSummary: "Next.js App Router -> Spring Boot API Gateway -> Redis Cache Cluster -> PostgreSQL Database.",
      keyChallengesSolved: [
        "Distributed cache invalidation on content publish events",
        "Achieving sub-50ms p99 query latency under load"
      ],
      systemDesignHighlights: [
        "Redis Pub/Sub cache sync",
        "Docker containerization for environment parity"
      ],
      suggestedQuestions: [
        "⚡ Explain the Redis caching strategy",
        "🛠️ How are microservices orchestrated?"
      ]
    }
  },
  {
    id: "realtime-chat-engine",
    title: "Distributed WebSockets Chat",
    description: "Low-latency real-time messaging engine with Redis Pub/Sub backplane and room management.",
    longDescription: "Engineered to handle high-throughput message streaming with connection pooling, typing indicators, end-to-end message delivery acknowledgments, and horizontally scalable socket nodes.",
    image: "/projects/content-hub.png",
    tags: ["Node.js", "Express", "WebSockets", "Redis", "React"],
    liveDemoUrl: "https://chat.demo.dev",
    githubUrl: "https://github.com/abhinavsrivastava/websocket-chat",
    featured: false,
    category: "Backend",
    stars: 29,
    aiContext: {
      architectureDiagramSummary: "React -> Node.js WebSocket (ws) -> Redis Pub/Sub Backplane -> MongoDB Store.",
      keyChallengesSolved: [
        "Scaling WebSockets horizontally across server nodes"
      ],
      systemDesignHighlights: [
        "Heartbeat ping-pong for broken connection cleanup",
        "Redis Pub/Sub message broker"
      ],
      suggestedQuestions: [
        "⚡ How does Redis Pub/Sub enable WebSocket scaling?",
        "🛠️ How are dropped connections handled?"
      ]
    }
  },
  {
    id: "cloud-devops-pipeline",
    title: "Automated K8s Deployment Pipeline",
    description: "Zero-downtime CI/CD deployment pipeline with Docker containerization and Kubernetes cluster management.",
    longDescription: "Comprehensive DevOps pipeline integrating GitHub Actions, Helm charts, Prometheus monitoring, and automated rollback triggers across multi-zone Kubernetes clusters.",
    image: "/projects/job-tracker.png",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Helm"],
    liveDemoUrl: "https://devops.demo.dev",
    githubUrl: "https://github.com/abhinavsrivastava/k8s-ci-cd-pipeline",
    featured: false,
    category: "Backend",
    stars: 21
  }
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
    id: "btech-cs",
    degree: "B.Tech in Artificial Intelligence And Machine Learning",
    institution: "Dr. A.P.J. Abdul Kalam Technical University",
    period: "2022 – 2026",
    score: "CGPA: 7.2/10",
    location: "Uttar Pradesh, India"
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: "nextjs-app-router-best-practices",
    title: "Mastering Next.js App Router for High-Performance Applications",
    excerpt: "A deep dive into Server Components, streaming SSR, and asset optimization techniques.",
    date: "Aug 12, 2026",
    readTime: "5 min read",
    category: "Next.js"
  },
  {
    id: "spring-boot-react-integration",
    title: "Architecting Microservices with Spring Boot & Modern React",
    excerpt: "Best practices for JWT authentication, CORS handling, and REST API proxying in production.",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    category: "Full Stack"
  }
];
