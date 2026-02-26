export const SITE_URL = "https://www.albanbyamugisha.dev";

export const GITHUB_USERNAME = "albanbyaugisha";

export const PROFILE = {
  name: "Byamugisha Alban",
  title:
    "Software Engineer | Designing and Developing Scalable Software Systems & Modern Web Applications",
  subtitle:
    "Delivering Secure, Efficient, and User-Centric Digital Solutions across Africa and beyond.",
  location: "Western Region, Uganda",
  phone: "+256 748 611 252",
};

export const HERO_MISSION_PARAGRAPHS: string[] = [
  "I approach software engineering as a discipline of deliberate architecture, not just code. For me, great systems are those that gracefully handle complexity, scale under real-world load, and remain a pleasure to work with years after their first deployment. I am obsessed with understanding business context, translating it into clear technical boundaries, and designing systems where every module has a strong reason to exist.",
  "Scalability is not only about handling millions of users; it is about designing systems that can evolve. I place a strong emphasis on clean separations of concern, explicit contracts between services, and predictable performance characteristics. Whether I am modelling a database schema, designing an API surface, or shaping a front‑end architecture, I ask: how will this behave when traffic spikes, when requirements shift, and when the team doubles in size?",
  "Security is a first‑class requirement in every project I touch. From rigorous input validation and principle‑of‑least‑privilege authorization to secure secrets management and defense‑in‑depth, I treat every boundary as a potential attack vector. My goal is to build systems where security is not bolted on at the end but is woven into architecture decisions, coding standards, and operational workflows from day one.",
  "I am deeply passionate about intelligent systems and the role they will play in transforming how Africa builds, scales, and exports software. I believe the next generation of platforms will be adaptive, insight‑driven, and context‑aware—delivering experiences that feel tailored to the user, not just rendered for them. My vision is to contribute to this transformation by crafting robust, modern engineering foundations that empower African teams, products, and communities to compete confidently on a global stage.",
];

export const EDUCATION_HISTORY = [
  {
    institution: "Mbarara University of Science & Technology",
    qualification: "Bachelor of Science in Software Engineering",
    period: "Aug 2025 – Dec 2029",
    location: "Mbarara, Uganda",
    description:
      "At Mbarara University of Science & Technology, I am immersed in a program that balances rigorous computer science fundamentals with practical, industry‑aligned engineering skills. My focus spans algorithms, distributed systems, database design, computer security, and modern web architectures, with a deliberate emphasis on building software that is not only correct, but reliable, observable, and maintainable in production. Beyond coursework, I actively explore system design, DevOps practices, and emerging AI tooling—treating each project as an opportunity to simulate real‑world constraints such as scalability, resilience, and security hardening.",
  },
  {
    institution: "St. Balikudembe Secondary School",
    qualification: "Uganda Advanced Certificate of Education (UACE)",
    period: "Completed",
    location: "Uganda",
    description:
      "St. Balikudembe Secondary School is where my curiosity for problem solving matured into a clear direction toward engineering. I deepened my capabilities in mathematics, physics, and computer‑related disciplines, learning to break down complex problems into smaller, testable components. It was also a formative environment for leadership—participating in group projects and academic competitions that demanded discipline, focus, and the ability to communicate technical thinking to non‑technical peers.",
  },
  {
    institution: "Mwizi Secondary School",
    qualification: "Uganda Certificate of Education (UCE)",
    period: "Completed",
    location: "Uganda",
    description:
      "At Mwizi Secondary School, I built the academic foundation that underpins my work today. This is where I first encountered structured computer studies, logical reasoning, and the discipline of approaching problems with both creativity and precision. The environment encouraged consistency and resilience, values that now influence how I respond to engineering challenges, debugging sessions, and long‑running projects.",
  },
  {
    institution: "Akashabo Primary School",
    qualification: "Primary Education",
    period: "Completed",
    location: "Uganda",
    description:
      "Akashabo Primary School laid the earliest foundations of my journey—instilling curiosity, discipline, and a deep respect for learning. It is here that I first learned to see patterns, to be patient with difficult concepts, and to understand that mastery is often the result of many small, consistent steps. Those early lessons still influence how I approach new technologies and complex system designs today.",
  },
];

export const SKILLS = [
  {
    name: "Java",
    category: "Backend & Systems",
    narrative:
      "Java is a strongly typed, object‑oriented language that powers some of the most critical backend systems in the world. I use Java to design APIs and services where predictability, type safety, and long‑term maintainability matter more than quick experimentation. Its mature ecosystem—from Spring Boot to robust monitoring tooling—makes it a natural fit for building reliable, modular backends.",
    usage:
      "I apply Java to craft RESTful and event‑driven services, model domain‑driven designs, and implement business logic that must remain stable over time. With its threading model and mature JVM ecosystem, Java enables me to architect services that scale horizontally while remaining observably healthy under load.",
    realWorld:
      "Java is ideal for financial platforms, authentication services, and core business APIs that cannot afford unpredictable behavior. In such systems, I lean on Java’s strong typing and battle‑tested libraries to guarantee data integrity, transactional safety, and consistent performance across environments.",
    mindset:
      "When I reach for Java, I am in a systems‑thinking mode: prioritizing clear boundaries, explicit contracts, and long‑term evolution. The mindset is to optimize for readability and maintainability, knowing that these services will likely outlive any single framework trend.",
  },
  {
    name: "Python",
    category: "Automation & Intelligence",
    narrative:
      "Python is my tool of choice when I need to move quickly from idea to working proof of concept, especially for automation, data processing, or AI‑adjacent tasks. Its concise syntax and rich ecosystem make it perfect for building support systems around larger architectures.",
    usage:
      "I use Python to orchestrate scripts, ETL pipelines, and integration tooling that glue systems together: from log parsers and data quality checks to infrastructure helpers. When dealing with AI fundamentals, Python also becomes the natural environment for experimenting with models, APIs, and intelligent behavior.",
    realWorld:
      "In real projects, Python often powers internal dashboards, batch processing jobs, and automation workflows that free teams from repetitive tasks and reduce operational risk. I use it to validate assumptions quickly before committing to large‑scale, strongly typed implementations.",
    mindset:
      "My Python mindset is pragmatic: move fast, validate fast, and then decide what should be hardened into more structured services. It is about using the right level of engineering rigor for the problem at hand without sacrificing readability or reliability.",
  },
  {
    name: "C",
    category: "Foundations & Performance",
    narrative:
      "C brings me close to the metal, forcing a disciplined understanding of memory, performance, and how computers actually execute instructions. Even when I am not writing C every day, the mental model it enforces shapes how I think about efficiency in higher‑level languages.",
    usage:
      "I leverage C for scenarios that demand fine‑grained control, such as systems programming exercises, performance‑sensitive components, or understanding how operating systems and networking stacks work. It sharpens my instincts for what is cheap and what is expensive at runtime.",
    realWorld:
      "Understanding C is invaluable when debugging performance bottlenecks, reasoning about concurrency issues, or evaluating the behavior of low‑level libraries used by higher‑level frameworks. It provides the mental model needed to avoid accidental inefficiencies at scale.",
    mindset:
      "C requires a mindset of precision and accountability. There is little room for carelessness, and that discipline flows into how I design safer abstractions and guardrails in modern stacks.",
  },
  {
    name: "SQL",
    category: "Data & Persistence",
    narrative:
      "SQL is the language of structured data and reliable persistence. I treat database design as a core part of system architecture, not an afterthought. Well‑designed schemas and queries can simplify business logic dramatically.",
    usage:
      "I use SQL to model relational schemas, enforce constraints, and express complex queries that are still performant and maintainable. I pay close attention to indexing strategies, query plans, and transactional boundaries to ensure data integrity and predictable behavior.",
    realWorld:
      "In production systems, SQL underpins reporting, analytics, and mission‑critical workflows. I design schemas and queries that remain understandable to future engineers, while still handling growth in data volume and query complexity.",
    mindset:
      "My SQL mindset is to make data a first‑class citizen: explicit, well‑structured, and protected. I think in terms of entities, relationships, and invariants—ensuring that business rules are encoded as close to the data as possible.",
  },
  {
    name: "Git & GitHub",
    category: "Collaboration & Delivery",
    narrative:
      "Git and GitHub are the backbone of disciplined, collaborative software engineering. Beyond simple commits, they define how teams shape history, review work, and release reliably.",
    usage:
      "I use Git to maintain clean, comprehensible histories with feature branches, rebasing where appropriate, and clear commit messages that explain intent. On GitHub, I treat pull requests as design conversations, using code review to uphold standards, share knowledge, and reduce long‑term risk.",
    realWorld:
      "On real projects, robust Git workflows and GitHub practices are the difference between controlled progress and fragile chaos. They enable safe experimentation, rapid rollback, and continuous improvement without sacrificing stability.",
    mindset:
      "My mindset with Git and GitHub is one of traceability and respect for future maintainers. Every change should answer: why was this done, and how can someone safely modify it later?",
  },
  {
    name: "AI Fundamentals",
    category: "Intelligent Systems",
    narrative:
      "AI fundamentals guide how I think about building systems that are not just reactive, but adaptive. I am interested in how models, data, and human behavior intersect to produce meaningful outcomes.",
    usage:
      "I apply AI fundamentals when integrating recommendation logic, natural language capabilities, or intelligent assistants into products. This includes understanding data quality, inference costs, feedback loops, and the ethical dimensions of deploying intelligent systems.",
    realWorld:
      "In practice, AI‑enhanced systems must remain observable, explainable, and safe. I design integrations where AI augments human decision‑making instead of replacing it blindly, always leaving room for override and transparent auditing.",
    mindset:
      "My AI mindset combines curiosity with responsibility: use intelligence to elevate user experience and operations, but always with guardrails, monitoring, and human‑centric design.",
  },
  {
    name: "System Design",
    category: "Architecture",
    narrative:
      "System design is where engineering decisions become architecture. It is the art and science of choosing the right boundaries, protocols, and trade‑offs to solve real‑world problems under constraints.",
    usage:
      "I use system design principles to break complex requirements into cohesive services, define APIs, select data storage strategies, and reason about performance, availability, and consistency. Diagrams, sequence flows, and failure modes are part of my standard toolkit.",
    realWorld:
      "In production, good system design shows up as systems that are resilient under failure, easy to extend, and straightforward to reason about—especially during incidents. It turns chaos into predictable, observable behavior.",
    mindset:
      "My system design mindset is to think several steps ahead: assume failures, plan for growth, and design so that new capabilities can be added without destabilizing the whole.",
  },
];

export const CORE_VALUES = [
  {
    title: "Engineering Integrity",
    description:
      "I ship work that I can stand behind—measured, tested, and honest about trade‑offs. Cutting corners may feel fast, but it always slows teams down later.",
  },
  {
    title: "Clarity over Complexity",
    description:
      "I believe the most advanced systems are often the simplest to reason about. I prefer clear, composable designs over clever but fragile abstractions.",
  },
  {
    title: "Security by Design",
    description:
      "Security is not a last‑minute checklist. It is a way of thinking that runs through API contracts, data models, deployment pipelines, and incident response.",
  },
  {
    title: "Performance with Purpose",
    description:
      "I care about performance where it matters: user experience, cost efficiency, and system reliability. Micro‑optimizations are only valuable when grounded in real metrics.",
  },
  {
    title: "Documentation as a Feature",
    description:
      "Clear documentation, diagrams, and naming are not extras—they are part of the product. They enable teams to move faster without constantly rediscovering context.",
  },
];

export const WHY_WORK_WITH_ME = [
  "I bring a systems perspective that connects architecture, security, performance, and developer experience into one coherent picture.",
  "I am comfortable moving from high‑level design discussions down to implementation details, ensuring concepts translate into robust code.",
  "I care deeply about user experience and accessibility, treating front‑end engineering as a craft rather than an afterthought.",
  "I am intentional about communication—writing clear proposals, documenting decisions, and ensuring stakeholders understand both risks and opportunities.",
  "I see African engineering as globally competitive and design systems that can stand beside world‑class products in quality, reliability, and polish.",
];

export const TESTIMONIALS = [
  {
    name: "Technical Lead (Simulation Project)",
    role: "Lead Engineer, Academic Systems Lab",
    quote:
      "Alban consistently approached our simulation platform as a production‑grade system, not a temporary assignment. His focus on clear interfaces, observability, and failure modes made collaboration across the team significantly smoother.",
  },
  {
    name: "Mentor (Open Source Initiative)",
    role: "Senior Software Engineer",
    quote:
      "What stands out about Alban is his willingness to go beyond the obvious implementation. He asks why a system is designed a certain way and is not afraid to propose better patterns when the existing approach does not scale.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "What kind of work are you most excited about?",
    answer:
      "I am most energized by projects that sit at the intersection of system design, security, and thoughtful user experience—especially platforms that will serve many users over time and need to remain reliable under growth.",
  },
  {
    question: "Do you prefer frontend, backend, or full‑stack work?",
    answer:
      "I operate as a full‑stack engineer with a strong bias toward architecture and front‑end systems engineering. I enjoy designing the overall system and then implementing critical paths across both frontend and backend as needed.",
  },
  {
    question: "How do you approach learning new technologies?",
    answer:
      "I start from fundamentals and real use cases: what problem does this technology solve, what are its trade‑offs, and how does it behave under load. I prefer building small end‑to‑end experiments rather than only reading documentation.",
  },
  {
    question: "Are you open to remote collaboration?",
    answer:
      "Yes. I am comfortable working with distributed teams, asynchronous communication, and structured documentation so that progress is never blocked by time zones.",
  },
];

