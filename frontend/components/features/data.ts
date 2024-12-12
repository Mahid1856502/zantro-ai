export const featureData = [
  {
    id: 1,
    title: "Chat with Your VMs",
    description: "Control your virtual machines through natural conversation with our AI assistant",
    videoUrl: "/webms/talktovms.webm",
    features: [
      "Run commands through natural conversation",
      "Control Chrome for OSINT research",
      "Process data and generate reports",
      "Automate repetitive tasks easily"
    ],
    icon: "MessageSquare",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: 2,
    title: "Built-in Code Editor",
    description: "Full-featured code editor with AI-powered suggestions and integrations",
    videoUrl: "/webms/spedupsetup.webm",
    features: [
      "Syntax highlighting for major languages",
      "AI-powered code suggestions",
      "File tree and quick navigation",
      "Integrated with VM file system"
    ],
    icon: "Code",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    title: "Cloud Storage",
    description: "Keep your tools and files accessible across all VMs",
    videoUrl: "/webms/storage.png",
    features: [
      "Centralized file management",
      "Easy file sharing between VMs",
      "Quick file search and preview",
      "Secure file storage"
    ],
    icon: "Cloud",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    title: "Attack Planning",
    description: "Map out your attack strategies with integrated Excalidraw",
    videoUrl: "/webms/draw.webm",
    features: [
      "Create attack flow diagrams",
      "Document network layouts",
      "Sketch out vulnerabilities",
      "Export diagrams for reports"
    ],
    icon: "Target",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: 5,
    title: "Exploit Marketplace",
    description: "Browse and deploy security tools directly to your VMs",
    videoUrl: "/webms/marketplace.png",
    features: [
      "Curated security tools",
      "One-click VM deployment",
      "Usage documentation included",
      "Regular updates"
    ],
    icon: "Store",
    color: "from-yellow-500/20 to-amber-500/20"
  },
  {
    id: 6,
    title: "Monthly CTFs & Labs",
    description: "Practice your skills and earn with our monthly challenges",
    videoUrl: "/webms/ctf.png",
    features: [
      "Fresh challenges each month",
      "Various difficulty levels",
      "Practical scenarios",
      "Learn as you hack"
    ],
    icon: "Trophy",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 7,
    title: "Notes Integration",
    description: "Keep your pentest notes organized with notion like structure",
    videoUrl: "/webms/notes.png",
    features: [
      "Structured note organization",
      "Markdown support",
      "Code block formatting",
      "Search across all notes"
    ],
    icon: "FileText",
    color: "from-indigo-500/20 to-blue-500/20"
  },
  {
    id: 8,
    title: "AI Search Engine",
    description: "Research vulnerabilities with integrated SEARX engine",
    videoUrl: "/webms/search.png",
    features: [
      "Search security databases",
      "Find exploit references",
      "Research CVEs quickly",
      "Access recent security news"
    ],
    icon: "Search",
    color: "from-teal-500/20 to-emerald-500/20"
  },
  {
    id: 9,
    title: "Report Builder",
    description: "Generate professional pentest reports with our drag-and-drop editor",
    videoUrl: "/webms/puck.png",
    features: [
      "Pre-built report sections",
      "Vulnerability templates",
      "Include screenshots easily",
      "Export to PDF"
    ],
    icon: "FileText",
    color: "from-sky-500/20 to-blue-500/20"
  }
];

export const customizationData = {
  environments: {
    title: "Environment Flexibility",
    description: "Choose from pre-configured security distros or build your custom environment",
    categories: {
      premade: {
        title: "Pre-configured Distros",
        items: ["Kali Linux", "REMnux", "ParrotOS"]
      },
      custom: {
        title: "Custom Builds",
        distributions: ["Ubuntu", "Fedora", "Debian"],
        desktopEnvs: ["XFCE", "MATE", "i3", "KDE", "Openbox"]
      }
    }
  },
  templates: {
    title: "Professional Templates",
    description: "Comprehensive report templates for various security assessments",
    categories: [
      {
        title: "Web Security",
        items: ["Web Application Assessment", "API Security Testing", "Cloud Security Review"]
      },
      {
        title: "Network Security",
        items: ["Network Infrastructure", "Wireless Assessment", "IoT Security"]
      },
      {
        title: "Special Assessments",
        items: ["Social Engineering", "Red Team Operations", "Mobile Application"]
      }
    ]
  }
};

export type Feature = typeof featureData[0]; 