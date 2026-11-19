export const profile = {
  name: 'Jenish Patel',
  fullName: 'Jenish Jagdishkumar Patel',
  role: 'AI Engineer',
  email: 'jenish.patel00015@gmail.com',
  phone: '+91 93280 77721',
  linkedin: 'https://www.linkedin.com/in/jenish102002/',
  github: 'https://github.com/jenish102002',
  location: 'Gujarat, India',
  summary:
    'AI Engineer with an M.Tech in Computer Science, specializing in Retrieval-Augmented Generation and multi-agent LLM systems. From Intel’s internal support bot to deployed LangGraph apps, I ship pipelines that ground every answer in source content.',
}

export const stats = [
  { value: '15+', label: 'Intel teams using my APIs' },
  { value: '~20h', label: 'Manual reporting saved per week' },
  { value: '3', label: 'AI / ML projects built' },
  { value: '8.69', label: 'M.Tech CGPA, SVNIT' },
]

export const experience = [
  {
    company: 'Intel Corporation',
    role: 'Graduate Software Intern',
    period: 'Jun 2025 — May 2026',
    place: 'Bengaluru, India',
    tag: 'RAG · Ingestion · APIs',
    award: 'Intel Quarterly Recognition Award',
    points: [
      'Built an internal RAG-based support chatbot that guides employees on process and documentation queries, with answers grounded in retrieved source content.',
      'Developed an automated ingestion service with incremental sync — detects added and removed documents in a shared repository, generates embeddings, and updates the vector DB without full re-indexing.',
      'Implemented a 0.6 confidence-score threshold: low-confidence queries are not answered and the user is routed to raise a ticket with the owning team.',
      'Shipped secure REST APIs serving 15+ internal teams and dashboards that cut manual reporting by ~20 hours a week.',
    ],
  },
  {
    company: 'ISRO — Space Applications Centre',
    role: 'Research Intern',
    period: 'Dec 2022 — May 2023',
    place: 'Ahmedabad, India',
    tag: 'Full-stack · MySQL',
    points: [
      'Built a full-stack inventory management system with REST APIs and MySQL, replacing paper audits and reducing manual tracking time by 30%.',
      'Automated report and document generation, saving ~10 hours of paperwork weekly.',
    ],
  },
]

export const projects = [
  {
    id: 'docmind',
    title: 'DocMind',
    kicker: 'Multi-PDF Question Answering',
    period: 'Mar — May 2026',
    github: 'https://github.com/jenish102002/DocMind',
    live: 'https://docmind-3hi.pages.dev',
    pipeline: ['PDFs', 'PyMuPDF', 'Chunk', 'Embed', 'Qdrant', 'MMR', 'LLM', 'SSE'],
    points: [
      'End-to-end RAG pipeline: PyMuPDF extraction, semantic chunking, OpenAI embeddings and a Qdrant vector store for low-latency retrieval.',
      'Maximum Marginal Relevance retrieval plus prompt engineering to ground answers and cut hallucinations.',
      'Streaming responses (SSE) over FastAPI with JWT auth and a React frontend.',
      'Deployed on AWS EC2 with Docker Compose (Redis, Qdrant) and GitHub Actions CI/CD.',
    ],
    stack: ['FastAPI', 'React', 'Qdrant', 'Redis', 'Docker', 'AWS EC2'],
    size: 'wide',
  },
  {
    id: 'finagent',
    title: 'FinAgent AI',
    kicker: 'Multi-Agent Financial System',
    period: 'Apr — Jun 2026',
    github: 'https://github.com/jenish102002/FinAgent-AI-Multi-Agent-Financial-Intelligence-System',
    live: 'https://fin-agent-ai-multi-agent-financial.vercel.app',
    pipeline: ['Query', 'Router', ['Credit', 'Fraud', 'Compliance', 'Advisor'], 'Answer'],
    points: [
      'LangGraph application coordinating four AI agents to assess credit risk, fraud and compliance.',
      'Intent-based routing layer that sends each query to the right agent.',
      'FAISS vector store feeds the advisory agent live market data.',
    ],
    stack: ['LangGraph', 'FAISS', 'Python'],
    size: 'tall',
  },
  {
    id: 'eeg',
    title: 'EEG Brainwave Decoding',
    kicker: 'M.Tech Thesis',
    period: 'Jul 2025 — Jun 2026',
    pipeline: ['EEG', 'Clean', 'Features', 'Classify'],
    points: [
      'Python ML pipeline decoding imagined words from EEG signals, with signal cleaning and feature selection to reduce overfitting.',
      'Random Forest at 87% accuracy; Logistic Regression at 43% against a 25% baseline.',
    ],
    stack: ['Scikit-learn', 'NumPy', 'Signal processing'],
    metric: { value: '87%', label: 'Random Forest accuracy' },
    size: 'normal',
  },
]

export const skills = [
  {
    group: 'Generative AI & LLMs',
    items: ['LLMs', 'Prompt Engineering', 'RAG', 'Multi-Agent Systems', 'Function Calling', 'OpenAI', 'Claude', 'Gemini', 'Ollama'],
  },
  {
    group: 'Frameworks',
    items: ['LangChain', 'LangGraph', 'Hugging Face', 'PyTorch', 'Scikit-learn'],
  },
  {
    group: 'RAG & Vector Search',
    items: ['Qdrant', 'FAISS', 'Embeddings', 'Hybrid Search', 'Chunking', 'Incremental Indexing', 'Confidence Thresholds', 'MMR'],
  },
  {
    group: 'Backend & Deploy',
    items: ['Python', 'FastAPI', 'REST', 'SQL', 'Docker', 'Git', 'GitHub Actions', 'AWS EC2', 'Linux', 'React', 'Streamlit'],
  },
]

export const education = [
  {
    school: 'Sardar Vallabhbhai National Institute of Technology',
    short: 'SVNIT',
    degree: 'M.Tech, Computer Science & Engineering',
    score: 'CGPA 8.69 / 10',
    period: '2024 — 2026',
    place: 'Surat',
  },
  {
    school: 'Dharmsinh Desai University',
    short: 'DDU',
    degree: 'B.Tech, Information Technology',
    score: 'CPI 8.37 / 10',
    period: '2019 — 2023',
    place: 'Nadiad',
  },
]

export const certification = {
  title: 'Responsible AI',
  issuer: 'NPTEL',
  detail: 'Ethical AI, data privacy and secure model development.',
}

// Knowledge base for the "Ask my resume" console. Each chunk is retrievable by keywords.
export const chunks = [
  {
    id: 'exp/intel#1',
    source: 'experience/intel.md',
    keys: ['intel', 'job', 'chatbot', 'support', 'bot', 'internship', 'intern', 'built', 'build', 'experience', 'company', 'recent'],
    answer:
      'At Intel (Jun 2025 – May 2026) I built an internal RAG support chatbot for process and documentation questions. An incremental-sync ingestion service keeps the vector DB current without full re-indexing, and anything scoring below 0.6 confidence is routed to a ticket instead of being answered. It earned an Intel Quarterly Recognition Award.',
  },
  {
    id: 'exp/intel#2',
    source: 'experience/intel.md',
    keys: ['api', 'apis', 'rest', 'dashboard', 'dashboards', 'teams', 'award', 'impact', 'hours', 'backend'],
    answer:
      'I shipped secure REST APIs used by 15+ internal Intel teams, plus dashboards that removed roughly 20 hours of manual reporting each week.',
  },
  {
    id: 'exp/isro#1',
    source: 'experience/isro.md',
    keys: ['isro', 'sac', 'space', 'research', 'inventory', 'mysql', 'ahmedabad'],
    answer:
      'At ISRO’s Space Applications Centre I built a full-stack inventory system on REST APIs and MySQL that replaced paper audits (30% less manual tracking) and automated report generation, saving ~10 hours of paperwork weekly.',
  },
  {
    id: 'proj/docmind',
    source: 'projects/docmind.md',
    keys: ['docmind', 'pdf', 'pdfs', 'qdrant', 'mmr', 'streaming', 'sse', 'aws', 'docker', 'deploy', 'project', 'projects', 'rag'],
    answer:
      'DocMind is a multi-PDF Q&A platform: PyMuPDF extraction → semantic chunking → OpenAI embeddings → Qdrant, with MMR retrieval for grounded answers. It streams over FastAPI (SSE, JWT auth) to a React UI and runs on AWS EC2 via Docker Compose with GitHub Actions CI/CD.',
  },
  {
    id: 'proj/finagent',
    source: 'projects/finagent.md',
    keys: ['finagent', 'agent', 'agents', 'multi', 'langgraph', 'finance', 'financial', 'fraud', 'credit', 'compliance', 'faiss', 'routing', 'project'],
    answer:
      'FinAgent AI is a LangGraph system where four agents handle credit risk, fraud, compliance and advice. An intent router sends each query to the right agent, and a FAISS store gives the advisor live market data.',
  },
  {
    id: 'proj/eeg',
    source: 'projects/thesis.md',
    keys: ['eeg', 'brain', 'brainwave', 'thesis', 'ml', 'machine', 'learning', 'random', 'forest', 'classifier'],
    answer:
      'My M.Tech thesis decodes imagined words from EEG signals. With careful cleaning and feature selection, a Random Forest reached 87% accuracy and Logistic Regression 43% against a 25% baseline.',
  },
  {
    id: 'skills/stack',
    source: 'skills.md',
    keys: ['skills', 'stack', 'tools', 'vector', 'database', 'databases', 'db', 'langchain', 'python', 'fastapi', 'tech', 'use', 'know', 'languages'],
    answer:
      'Day to day: Python, FastAPI, LangChain and LangGraph. For retrieval I use Qdrant and FAISS with hybrid search, MMR and confidence thresholds. I work with OpenAI, Claude, Gemini and local models via Ollama, and ship with Docker, GitHub Actions and AWS EC2.',
  },
  {
    id: 'edu',
    source: 'education.md',
    keys: ['education', 'study', 'degree', 'svnit', 'ddu', 'mtech', 'btech', 'college', 'university', 'cgpa', 'grades', 'certification', 'nptel'],
    answer:
      'M.Tech in Computer Science & Engineering from SVNIT Surat (CGPA 8.69, 2024–2026) and B.Tech in IT from Dharmsinh Desai University (CPI 8.37, 2019–2023). I am also NPTEL-certified in Responsible AI.',
  },
  {
    id: 'contact',
    source: 'contact.md',
    keys: ['hire', 'contact', 'email', 'reach', 'available', 'open', 'role', 'roles', 'linkedin', 'github', 'why'],
    answer:
      'I’m open to AI Engineer roles focused on RAG, agents and LLM applications. The fastest way to reach me is jenish.patel00015@gmail.com, or LinkedIn at /in/jenish102002.',
  },
]

export const presetQueries = [
  'What did you build at Intel?',
  'How does DocMind work?',
  'Which vector databases do you use?',
  'Tell me about the multi-agent project',
  'Can you cook biryani?',
]
