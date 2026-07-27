export interface CareerStage {
  id: string;
  stageNumber: number;
  levelName: string; // e.g. "Internship & Apprentice"
  roleTitle: string; // e.g. "Associate Software Engineer"
  timeline: string; // e.g. "0 - 6 Months" or "1 - 3 Years"
  salaryRange: string; // e.g. "₹4.5 - ₹8.0 LPA"
  avgSalaryLpa: number; // for trajectory chart comparison
  keyResponsibilities: string[];
  requiredSkills: string[];
  recommendedCertifications: string[];
  proTipForFreshers: string;
}

export interface CareerTrack {
  id: string;
  trackName: string; // e.g., "Full-Stack Web Development", "AI & Machine Learning Engineering"
  description: string;
  stages: CareerStage[];
}

export interface IndustryCareerPath {
  industry: string;
  iconName: string;
  description: string;
  entryBarrier: 'Low' | 'Medium' | 'High';
  topHiringCompanies: string[];
  tracks: CareerTrack[];
}

export const CAREER_PATHS_DATA: IndustryCareerPath[] = [
  {
    industry: 'Software & IT Services',
    iconName: 'Code',
    description: 'High demand sector with rapid skill acceleration, multi-cloud platforms, and global remote & hybrid job opportunities.',
    entryBarrier: 'Medium',
    topHiringCompanies: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'TechWave', 'Amazon', 'Microsoft'],
    tracks: [
      {
        id: 'fullstack',
        trackName: 'Full-Stack Web & Cloud Track',
        description: 'End-to-end frontend, backend, database architectures, and serverless cloud deployment.',
        stages: [
          {
            id: 'fs-1',
            stageNumber: 1,
            levelName: 'Internship & Trainee',
            roleTitle: 'Software Engineering Intern',
            timeline: '0 - 6 Months',
            salaryRange: '₹15,000 - ₹35,000 / mo',
            avgSalaryLpa: 3.2,
            keyResponsibilities: [
              'Fix minor software bugs and write unit test cases',
              'Collaborate on frontend UI components using React/Tailwind',
              'Participate in daily Agile scrums and code reviews'
            ],
            requiredSkills: ['HTML/CSS/JS', 'Git/GitHub', 'DSA Basics', 'React or Node.js'],
            recommendedCertifications: ['Meta Frontend Developer Certificate', 'JavaScript FreeCodeCamp'],
            proTipForFreshers: 'Build 2 deployable full-stack side projects on GitHub with live preview links to impress recruiters.'
          },
          {
            id: 'fs-2',
            stageNumber: 2,
            levelName: 'Entry Level / Fresher',
            roleTitle: 'Associate Software Engineer',
            timeline: '0 - 2 Years',
            salaryRange: '₹4.5 LPA - ₹8.5 LPA',
            avgSalaryLpa: 6.5,
            keyResponsibilities: [
              'Develop RESTful API microservices and database queries',
              'Implement responsive web interfaces and state management',
              'Integrate third-party authentication and cloud services'
            ],
            requiredSkills: ['TypeScript', 'React/Next.js', 'Node.js/Express', 'PostgreSQL/MongoDB', 'Docker'],
            recommendedCertifications: ['AWS Certified Developer Associate', 'MongoDB Associate Developer'],
            proTipForFreshers: 'Master SQL optimization and clean async JavaScript handling—these are top interview elimination topics.'
          },
          {
            id: 'fs-3',
            stageNumber: 3,
            levelName: 'Mid-Level Engineer',
            roleTitle: 'Full-Stack Software Engineer II',
            timeline: '2 - 5 Years',
            salaryRange: '₹10.0 LPA - ₹18.0 LPA',
            avgSalaryLpa: 14.0,
            keyResponsibilities: [
              'Architect end-to-end features and system scalability',
              'Set up CI/CD build pipelines and automated testing',
              'Mentor junior developers and review pull requests'
            ],
            requiredSkills: ['System Design', 'Microservices', 'Redis Caching', 'CI/CD Pipelines', 'AWS/GCP'],
            recommendedCertifications: ['AWS Solutions Architect Associate', 'CKAD (Kubernetes Developer)'],
            proTipForFreshers: 'Focus on database indexing, system caching, and low-latency API performance tuning.'
          },
          {
            id: 'fs-4',
            stageNumber: 4,
            levelName: 'Senior / Lead',
            roleTitle: 'Senior Software Engineer / Tech Lead',
            timeline: '5 - 8 Years',
            salaryRange: '₹22.0 LPA - ₹38.0 LPA',
            avgSalaryLpa: 28.0,
            keyResponsibilities: [
              'Lead technical design and technical roadmap for product modules',
              'Drive security audits and fault-tolerant infrastructure',
              'Align engineering deliverables with product business goals'
            ],
            requiredSkills: ['Distributed Systems', 'Event-Driven Architecture', 'Team Leadership', 'Security Hardening'],
            recommendedCertifications: ['AWS Certified Solutions Architect Professional'],
            proTipForFreshers: 'Develop cross-functional communication skills; tech leads translate business requirements into tech tasks.'
          },
          {
            id: 'fs-5',
            stageNumber: 5,
            levelName: 'Leadership / Architect',
            roleTitle: 'Principal Engineer / Engineering Manager',
            timeline: '8 - 12 Years',
            salaryRange: '₹40.0 LPA - ₹75.0 LPA',
            avgSalaryLpa: 52.0,
            keyResponsibilities: [
              'Oversee multi-team engineering departments and budgets',
              'Establish company-wide technology stack and coding standards',
              'Hire, retain, and grow high-performing engineering talent'
            ],
            requiredSkills: ['Organizational Design', 'Cloud Economics', 'Strategic Tech Vision', 'People Management'],
            recommendedCertifications: ['TOGAF Enterprise Architect', 'Certified ScrumMaster (CSM)'],
            proTipForFreshers: 'Transition from writing code to multiplying team velocity and architectural resilience.'
          }
        ]
      },
      {
        id: 'ai-data',
        trackName: 'AI, Machine Learning & Data Engineering',
        description: 'Building generative AI models, data pipelines, big data infrastructure, and predictive analytics.',
        stages: [
          {
            id: 'ai-1',
            stageNumber: 1,
            levelName: 'Internship & Trainee',
            roleTitle: 'Data & AI Research Intern',
            timeline: '0 - 6 Months',
            salaryRange: '₹18,000 - ₹40,000 / mo',
            avgSalaryLpa: 3.8,
            keyResponsibilities: [
              'Data cleaning, preprocessing, and exploratory data analysis',
              'Annotate datasets for model training and fine-tuning',
              'Build basic analytics dashboards using Tableau / Power BI'
            ],
            requiredSkills: ['Python', 'Pandas/NumPy', 'SQL', 'Data Visualization'],
            recommendedCertifications: ['Google Data Analytics Professional Certificate'],
            proTipForFreshers: 'Build Kaggle notebooks or analyze real public datasets to showcase problem solving.'
          },
          {
            id: 'ai-2',
            stageNumber: 2,
            levelName: 'Entry Level / Fresher',
            roleTitle: 'Junior Data Scientist / ML Engineer',
            timeline: '0 - 2 Years',
            salaryRange: '₹6.0 LPA - ₹10.5 LPA',
            avgSalaryLpa: 8.0,
            keyResponsibilities: [
              'Develop machine learning classification and regression models',
              'Deploy REST API endpoints for ML model inference',
              'Build automated ETL data ingestion pipelines'
            ],
            requiredSkills: ['PyTorch / Scikit-Learn', 'FastAPI / Flask', 'Docker', 'SQL / Spark'],
            recommendedCertifications: ['TensorFlow Developer Certificate', 'AWS Certified Machine Learning'],
            proTipForFreshers: 'Understand MLOps fundamentals: model versioning, tracking metrics with MLflow, and cloud deployments.'
          },
          {
            id: 'ai-3',
            stageNumber: 3,
            levelName: 'Mid-Level Specialist',
            roleTitle: 'Senior Machine Learning / AI Engineer',
            timeline: '2 - 5 Years',
            salaryRange: '₹14.0 LPA - ₹25.0 LPA',
            avgSalaryLpa: 18.5,
            keyResponsibilities: [
              'Fine-tune Large Language Models (LLMs) and Vector Databases',
              'Implement scalable real-time streaming data architectures',
              'Optimize model inference speed and memory consumption'
            ],
            requiredSkills: ['LLMs & RAG', 'LangChain / LlamaIndex', 'Pinecone / Milvus', 'Kubernetes'],
            recommendedCertifications: ['Google Cloud Professional Machine Learning Engineer'],
            proTipForFreshers: 'Master Retrieval-Augmented Generation (RAG) and Agentic AI workflows.'
          }
        ]
      }
    ]
  },
  {
    industry: 'Electronics & VLSI',
    iconName: 'Cpu',
    description: 'Hardware design, chip verification, FPGA prototyping, embedded systems, and IoT solutions.',
    entryBarrier: 'High',
    topHiringCompanies: ['Qualcomm', 'Intel', 'Texas Instruments', 'NVIDIA', 'MediaTek', 'Synopsys', 'Qualisys'],
    tracks: [
      {
        id: 'vlsi-design',
        trackName: 'Semiconductor VLSI & Silicon Design',
        description: 'Physical design, RTL synthesis, DFT validation, and SoC chip architecture.',
        stages: [
          {
            id: 'vlsi-1',
            stageNumber: 1,
            levelName: 'Graduate Trainee',
            roleTitle: 'VLSI Design / Verification Intern',
            timeline: '0 - 6 Months',
            salaryRange: '₹20,000 - ₹45,000 / mo',
            avgSalaryLpa: 4.2,
            keyResponsibilities: [
              'Simulate Digital Logic circuits in Verilog/SystemVerilog',
              'Write verification testbenches for IP cores',
              'Debug timing violations using EDA tool suites'
            ],
            requiredSkills: ['Verilog / VHDL', 'Digital Electronics', 'Linux Shell Scripting'],
            recommendedCertifications: ['NPTEL VLSI Design Verification Course'],
            proTipForFreshers: 'Master Digital Logic Design principles thoroughly; chip interviews focus heavily on setup/hold times and finite state machines.'
          },
          {
            id: 'vlsi-2',
            stageNumber: 2,
            levelName: 'Entry Level / Fresher',
            roleTitle: 'Silicon Design / Verification Engineer',
            timeline: '0 - 2 Years',
            salaryRange: '₹7.0 LPA - ₹12.5 LPA',
            avgSalaryLpa: 9.5,
            keyResponsibilities: [
              'Implement UVM (Universal Verification Methodology) environments',
              'Run RTL synthesis, static timing analysis (STA), and layout checks',
              'Verify sub-system communication protocols (PCIe, AHB, AXI)'
            ],
            requiredSkills: ['SystemVerilog', 'UVM Framework', 'Synopsys / Cadence EDA Tools', 'Python/Perl'],
            recommendedCertifications: ['Certified VLSI Design Verification Engineer'],
            proTipForFreshers: 'Hands-on experience with EDA tool suites like Synopsys VCS or Cadence Xcelium is a huge plus.'
          },
          {
            id: 'vlsi-3',
            stageNumber: 3,
            levelName: 'Mid-Level Specialist',
            roleTitle: 'Senior Silicon Verification Lead',
            timeline: '2 - 5 Years',
            salaryRange: '₹15.0 LPA - ₹28.0 LPA',
            avgSalaryLpa: 21.0,
            keyResponsibilities: [
              'Lead complete SoC verification closure from spec to tapeout',
              'Optimize power, performance, and area (PPA) parameters',
              'Collaborate with post-silicon validation teams'
            ],
            requiredSkills: ['SoC Architecture', 'Low Power Design (UPF)', 'Pre-silicon Emulation', 'Post-silicon Debug'],
            recommendedCertifications: ['Advanced SystemVerilog & UVM Mastery'],
            proTipForFreshers: 'Build expertise in advanced cache coherent protocols and high-speed bus architectures.'
          }
        ]
      }
    ]
  },
  {
    industry: 'Banking, FinTech & Analytics',
    iconName: 'BarChart3',
    description: 'Financial quantitative modeling, risk analytics, algorithmic trading, payment gateway infrastructure, and Business Intelligence.',
    entryBarrier: 'Medium',
    topHiringCompanies: ['Goldman Sachs', 'JPMorgan', 'HDFC Bank', 'Razorpay', 'PhonePe', 'DataCore', 'Deloitte'],
    tracks: [
      {
        id: 'fin-analytics',
        trackName: 'Financial Data Analytics & Risk Modeling',
        description: 'Transforming raw financial datasets into strategic business forecasting models.',
        stages: [
          {
            id: 'fin-1',
            stageNumber: 1,
            levelName: 'Internship / Apprentice',
            roleTitle: 'Business Analytics Intern',
            timeline: '0 - 6 Months',
            salaryRange: '₹15,000 - ₹30,000 / mo',
            avgSalaryLpa: 3.0,
            keyResponsibilities: [
              'Maintain daily transaction dashboards in Power BI / Tableau',
              'Perform SQL queries to extract customer churn metrics',
              'Automate Excel reporting routines'
            ],
            requiredSkills: ['Advanced Excel', 'SQL', 'Power BI / Tableau', 'Basic Statistics'],
            recommendedCertifications: ['Microsoft Power BI Data Analyst Associate'],
            proTipForFreshers: 'Learn window functions and CTEs in SQL—they are tested in every fintech analytics screening round.'
          },
          {
            id: 'fin-2',
            stageNumber: 2,
            levelName: 'Entry Level / Fresher',
            roleTitle: 'Associate Data / Risk Analyst',
            timeline: '0 - 2 Years',
            salaryRange: '₹5.5 LPA - ₹9.0 LPA',
            avgSalaryLpa: 7.2,
            keyResponsibilities: [
              'Build predictive risk scoring models for credit lending',
              'Analyze payment fraud anomalies using statistical models',
              'Present executive performance reports to product stakeholders'
            ],
            requiredSkills: ['Python (NumPy/Pandas)', 'Statistical Modeling', 'SQL Optimization', 'A/B Testing'],
            recommendedCertifications: ['Google Data Analytics Certificate', 'FRM Level 1 (Optional)'],
            proTipForFreshers: 'Understand banking KPIs: Customer Acquisition Cost (CAC), Lifetime Value (LTV), and Non-Performing Assets (NPA).'
          },
          {
            id: 'fin-3',
            stageNumber: 3,
            levelName: 'Mid-Level Specialist',
            roleTitle: 'Senior Risk & Quantitative Analyst',
            timeline: '2 - 5 Years',
            salaryRange: '₹12.0 LPA - ₹22.0 LPA',
            avgSalaryLpa: 16.5,
            keyResponsibilities: [
              'Design automated algorithmic risk mitigation engines',
              'Implement real-time fraud detection pipelines',
              'Lead business growth experimentation frameworks'
            ],
            requiredSkills: ['Machine Learning (XGBoost)', 'Spark / Databricks', 'Financial Risk Frameworks'],
            recommendedCertifications: ['CFA Level 1 or Certified Analytics Professional (CAP)'],
            proTipForFreshers: 'Combine domain financial acumen with strong Python data engineering skills.'
          }
        ]
      }
    ]
  },
  {
    industry: 'Core Mechanical & Automation',
    iconName: 'Wrench',
    description: 'Robotics, CAD modeling, automotive engineering, industrial IoT, EV battery technology, and smart manufacturing.',
    entryBarrier: 'Medium',
    topHiringCompanies: ['Tata Motors', 'L&T', 'Bosch', 'Mahindra', 'Apex Motors', 'Tesla India', 'Siemens'],
    tracks: [
      {
        id: 'mech-design',
        trackName: 'Mechanical Design & EV Automation Track',
        description: 'CAD product modeling, FEA stress analysis, robotics automation, and EV powertrain design.',
        stages: [
          {
            id: 'mech-1',
            stageNumber: 1,
            levelName: 'Graduate Engineer Trainee (GET)',
            roleTitle: 'CAD Design & Simulation Trainee',
            timeline: '0 - 1 Year',
            salaryRange: '₹3.8 LPA - ₹6.0 LPA',
            avgSalaryLpa: 4.8,
            keyResponsibilities: [
              'Prepare 3D CAD assembly models in SolidWorks / CATIA',
              'Perform Finite Element Analysis (FEA) structural simulations',
              'Assist shop floor engineers in assembly line quality control'
            ],
            requiredSkills: ['SolidWorks / CATIA', 'Ansys FEA', 'GD&T Tolerancing', 'Engineering Drawing'],
            recommendedCertifications: ['SolidWorks CSWA / CSWP Certification'],
            proTipForFreshers: 'Master Geometric Dimensioning and Tolerancing (GD&T) drawing standards.'
          },
          {
            id: 'mech-2',
            stageNumber: 2,
            levelName: 'Junior Engineer',
            roleTitle: 'Mechanical Design & Automation Engineer',
            timeline: '1 - 3 Years',
            salaryRange: '₹6.5 LPA - ₹11.0 LPA',
            avgSalaryLpa: 8.5,
            keyResponsibilities: [
              'Design EV battery thermal management systems',
              'Program industrial PLC controllers and robotic arms',
              'Optimize manufacturing BOM (Bill of Materials) costs'
            ],
            requiredSkills: ['SolidWorks / Creo', 'PLC Programming', 'Thermal & CFD Analysis', 'DFM / DFA'],
            recommendedCertifications: ['Six Sigma Green Belt', 'Certified EV Powertrain Specialist'],
            proTipForFreshers: 'EV & Green Mobility is experiencing massive hiring—upskill in battery management systems (BMS).'
          }
        ]
      }
    ]
  },
  {
    industry: 'Civil & Infrastructure',
    iconName: 'Building',
    description: 'Structural engineering, BIM 3D modeling, smart city construction management, and highway/metro infrastructure.',
    entryBarrier: 'Medium',
    topHiringCompanies: ['L&T Construction', 'Shapoorji Pallonji', 'GMR Group', 'DLF', 'Tata Projects'],
    tracks: [
      {
        id: 'civil-bim',
        trackName: 'Structural Engineering & BIM Track',
        description: '3D Building Information Modeling (BIM), structural estimation, site execution, and project management.',
        stages: [
          {
            id: 'civ-1',
            stageNumber: 1,
            levelName: 'Junior Site Engineer',
            roleTitle: 'Assistant Structural / Site Engineer',
            timeline: '0 - 1 Year',
            salaryRange: '₹3.5 LPA - ₹5.5 LPA',
            avgSalaryLpa: 4.5,
            keyResponsibilities: [
              'Inspect concrete pouring and reinforcement steel quality on site',
              'Verify structural CAD blueprints against site execution',
              'Maintain daily material logs and safety compliance records'
            ],
            requiredSkills: ['AutoCAD', 'Revit BIM', 'STAAD Pro', 'Site Quantity Surveying'],
            recommendedCertifications: ['Autodesk Certified Professional: Revit Structure'],
            proTipForFreshers: 'BIM (Building Information Modeling) is replacing traditional CAD—master Revit and Navisworks early.'
          },
          {
            id: 'civ-2',
            stageNumber: 2,
            levelName: 'Structural Engineer',
            roleTitle: 'BIM Structural Engineer / Project Manager',
            timeline: '1 - 4 Years',
            salaryRange: '₹6.0 LPA - ₹12.0 LPA',
            avgSalaryLpa: 8.8,
            keyResponsibilities: [
              'Design high-rise concrete and steel structures',
              'Coordinate 3D BIM clash detection across MEP services',
              'Manage contractor billing, timelines, and Primavera schedules'
            ],
            requiredSkills: ['STAAD Pro / ETABS', 'Primavera P6', '3D BIM Coordination', 'IS Code Specifications'],
            recommendedCertifications: ['PMP (Project Management Professional)', 'BIM Manager Certification'],
            proTipForFreshers: 'Combine structural analysis expertise with project scheduling tools like Primavera P6.'
          }
        ]
      }
    ]
  }
];
