# Byamugisha Alban | Software Engineer Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-0.183.1-000000?style=flat-square&logo=three.js)

**Designing and developing scalable, secure software systems & modern web applications**

[🌐 Live Demo](https://www.albanbyamugisha.vercel.app) • [📧 Contact](mailto:albanbyamugisha@gmail.com) • [👤 GitHub](https://github.com/albanbyamugisha) • [💼 LinkedIn](https://www.linkedin.com/in/byamugisha-alban-3140bb37a)

</div>

---

## 🎯 About the Portfolio

This is a **production-grade, full-stack portfolio website** showcasing professional software engineering expertise, system design philosophy, and modern web development capabilities. Built with cutting-edge technologies, this portfolio demonstrates:

- **Architectural Excellence**: From responsive design to 3D graphics and complex state management
- **Engineering Discipline**: Type-safe, well-structured, and maintainable codebase
- **Modern Web Standards**: Server-side rendering, client-side interactivity, and SEO optimization
- **Visual Craftsmanship**: Polished interfaces with smooth animations, theme switching, and accessibility

**Target Audience**: Recruiters, clients, and technical teams seeking a software engineer who combines systems thinking with hands-on implementation expertise.

---

## ✨ Key Features

- **🎨 Multi-Theme Support**: Gold, Dark, and Light theme modes with persisted user preference
- **📊 GitHub Integration**: Real-time GitHub contributions graph visualization
- **🔍 SEO Optimized**: Structured data (Schema.org), Open Graph metadata, and Twitter Card support
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices
- **✍️ Markdown Blog**: Native markdown rendering with syntax highlighting and GitHub Flavored Markdown support
- **🎭 Interactive 3D**: Three.js integration for immersive visual components (certifications scene, background effects)
- **🎬 Smooth Animations**: Framer Motion for polished, performant animations and micro-interactions
- **⚡ Performance Focus**: Image optimization, code splitting, lazy loading, and production-ready build configuration
- **🔐 Live Status Indicator**: Real-time availability status display
- **🧭 Scroll-Based Navigation**: Context-aware section navigation for enhanced UX
- **🤖 AI Assistant Robot**: Interactive assistant component for user engagement

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6 (React 19.2.3) – Server-side rendering with App Router
- **Language**: TypeScript 5 – Strict mode for type safety and developer experience
- **Styling**: Tailwind CSS 4 with PostCSS – Utility-first, responsive design
- **Animations**: Framer Motion 12.34.3 – Production-ready animation library
- **3D Graphics**: Three.js 0.183.1 + react-three/fiber 9.5.0 – WebGL rendering
- **Icons**: React Icons 5.5.0 – Comprehensive icon library
- **Markdown**: React Markdown 10.1.0 with remark-gfm and rehype-highlight – Blog support

### Development Tools
- **Linting**: ESLint 9 with Next.js config – Code quality enforcement
- **Type Checking**: TypeScript with strict mode
- **Build**: Next.js production build optimization
- **Package Manager**: npm (lock file included)

---

## 📁 Project Structure

```
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout with theme provider & metadata
│   ├── page.tsx                     # Home page (hero, skills, education, certs)
│   ├── about/                       # About page
│   ├── skills/                      # Skills showcase page
│   ├── projects/                    # Projects portfolio page
│   ├── blog/                        # Blog with markdown support
│   ├── architecture/                # System architecture insights
│   ├── security/                    # Security-focused content
│   ├── devops/                      # DevOps practices & tools
│   ├── open-source/                 # Open source contributions
│   ├── contact/                     # Contact form page
│   └── api/
│       └── github/
│           └── contributions/       # GitHub contributions API route
│
├── components/                       # Reusable React components
│   ├── Navbar.tsx                   # Navigation with responsive menu
│   ├── Footer.tsx                   # Footer with links
│   ├── ThemeSwitcher.tsx            # Theme toggle (Gold/Dark/Light)
│   ├── AnimatedText.tsx             # Animated text component
│   ├── AssistantRobot.tsx           # Interactive AI assistant
│   ├── Certifications3DScene.tsx    # 3D certifications visualization
│   ├── CertificationsSection.tsx    # Certifications display
│   ├── EducationSection.tsx         # Education history
│   ├── GitHubGraph.tsx              # GitHub contributions heatmap
│   ├── IntroBoomImage.tsx           # Hero image/intro
│   ├── LiveStatus.tsx               # Live availability indicator
│   ├── MatrixBackground.tsx         # Animated background
│   ├── ProfileReveal.tsx            # Profile animation reveal
│   ├── ScrollSectionNav.tsx         # Scroll-aware section nav
│   ├── SectionOrbit.tsx             # Orbital animation component
│   ├── SkillsSection.tsx            # Technical skills showcase
│   └── SocialLinks.tsx              # Social media links
│
├── context/
│   └── ThemeContext.tsx             # Theme state management
│
├── lib/
│   ├── constants.ts                 # Site-wide constants, copy, metadata
│   └── github.ts                    # GitHub API type definitions
│
├── styles/
│   └── globals.css                  # Global styles, theme variables, animations
│
├── public/
│   └── images/                      # Static image assets
│
├── types/                           # TypeScript type definitions
│
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript compiler options
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS plugins
├── eslint.config.mjs                # ESLint rules
└── package.json                     # Dependencies & scripts
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Git for version control
- A terminal or command prompt

### Step 1: Clone the Repository
```bash
git clone https://github.com/albanbyamugisha/albanbyamugisha.dev.git
cd albanbyamugisha.dev
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio in action.

### Step 4: Build for Production
```bash
npm run build
npm start
```

### Step 5: Linting
```bash
npm run lint
```

---

## 🌍 Environment Variables

The portfolio runs with minimal external dependencies. However, if you plan to customize it with external integrations (e.g., contact form backend, analytics), create a `.env.local` file:

```env
# Example: GitHub API (for enhanced contributions data)
# NEXT_PUBLIC_GITHUB_USERNAME=your-github-username

# Example: Form submission backend
# NEXT_PUBLIC_FORM_API_URL=https://your-api.com/contact

# Example: Analytics
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Note**: Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Use server-only variables for sensitive data.

---

## 📖 Usage Guide

### Navigating the Portfolio
1. **Home** – Hero section, mission statement, GitHub activity, skills, education, certifications
2. **About** – Detailed background and professional journey
3. **Skills** – Technical expertise across programming languages and frameworks
4. **Projects** – Showcase of completed projects and case studies
5. **Blog** – Articles on software engineering, architecture, and best practices
6. **Architecture** – System design patterns and architectural decisions
7. **Security** – Security practices, threat modeling, and secure design principles
8. **DevOps** – Infrastructure, deployment, and operations insights
9. **Open Source** – Contributions to open-source projects
10. **Contact** – Get in touch for opportunities and collaboration

### Theme Switching
Click the theme switcher in the top navigation to cycle between **Gold**, **Dark**, and **Light** modes. Your preference is saved to local storage.

### GitHub Integration
The GitHub contributions graph auto-fetches data from the last 365 days. It updates in real-time when you visit the home page.

---

## 🚀 Deployment

### Vercel (Recommended)
This portfolio is optimized for **Vercel** deployment:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **New Project** and select your repository
4. Vercel auto-detects Next.js configuration
5. Deploy with a single click

```bash
# No additional configuration needed—Vercel handles:
# - Next.js build optimization
# - Automatic image optimization
# - Edge caching & CDN distribution
# - Environment variable management
# - Preview deployments for pull requests
```

### Self-Hosted (Docker, Ubuntu, etc.)
```bash
# Build the application
npm run build

# Start the production server
npm start

# Server runs on http://localhost:3000
```

### Build Configuration (next.config.ts)
The minimal Next.js configuration ensures fast builds and optimal runtime performance.

---

## ⚡ Performance & Optimization

### Frontend Optimizations
- **Image Optimization**: Next.js Image component with automatic optimization and responsive sizing
- **Code Splitting**: Automatic route-based code splitting via Next.js App Router
- **Lazy Loading**: Components load on-demand, reducing initial bundle size
- **CSS Optimization**: Tailwind CSS purging unused styles in production
- **3D Asset Optimization**: Three.js with efficient scene management

### SEO Best Practices
- **Metadata**: Dynamic meta tags for all pages
- **Structured Data**: Schema.org JSON-LD for rich snippets
- **Open Graph**: Optimized sharing on social media (Twitter, LinkedIn, Facebook)
- **Sitemap-Ready**: Standard Next.js routing for automatic sitemap generation
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

### Build Metrics
- **Type Safety**: Zero TypeScript errors (strict mode)
- **Code Quality**: ESLint configuration enforcing best practices
- **Bundle Analysis**: Next.js built-in bundling visualization

---

## 🤝 Contributing

This is a personal portfolio project, but contributions and suggestions are welcome!

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request with a clear description

### Contribution Guidelines
- Follow the existing code style and structure
- Ensure TypeScript strict mode compliance
- Update documentation if adding new features
- Test responsiveness across devices
- Maintain performance and accessibility standards

---

## 📄 License

This project is proprietary and personal. All content, design, and code are the intellectual property of **Byamugisha Alban**.

If you'd like to use this portfolio as a template for your own, feel free to fork and adapt it with your own content. Please credit the original design if you do.

---

## 👨‍💻 Author

**Byamugisha Alban**

Principal-level software engineer focused on designing scalable systems, secure architectures, and modern web applications.

### Connect With Me
- **Portfolio**: [albanbyamugisha.vercel.app](https://www.albanbyamugisha.vercel.app)
- **GitHub**: [@albanbyamugisha](https://github.com/albanbyamugisha)
- **LinkedIn**: [Byamugisha Alban](https://www.linkedin.com/in/byamugisha-alban-3140bb37a)
- **Email**: [albanbyamugisha@gmail.com](mailto:albanbyamugisha@gmail.com)
- **Phone**: +256 748 611 252
- **Location**: Western Region, Uganda

### Areas of Expertise
- **Backend Systems**: Java, Spring Boot, microservices, API design
- **Frontend Engineering**: React, Next.js, TypeScript, modern web standards
- **System Design**: Scalability, reliability, security, performance optimization
- **DevOps & Infrastructure**: Deployment pipelines, containerization, cloud platforms
- **Security**: Threat modeling, secure coding, compliance, defense-in-depth
- **AI & Intelligent Systems**: LLM integration, intelligent features, adaptive systems

---

<div align="center">

### 🌟 If you find this portfolio valuable, consider giving it a star!

**Made with ❤️ and engineered with intention.**

**⚡ Crafted with a gold-standard engineering mindset.**

</div>
