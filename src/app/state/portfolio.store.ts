import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { SkillCategory, SkillItem } from '../core/models/skill.model';
import { ProjectItem } from '../core/models/project.model';
import { CertificationItem, EducationItem, ExperienceItem } from '../core/models/experience.model';
import { ContactFormData, PersonalInfo } from '../core/models/contact.model';

export interface PortfolioState {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  selectedCategory: SkillCategory;
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  education: EducationItem;
  certifications: CertificationItem[];
  isMobileMenuOpen: boolean;
  resumeModalOpen: boolean;
  isSubmittingContact: boolean;
  contactSuccess: boolean;
}

const initialState: PortfolioState = {
  personalInfo: {
    name: 'Vishnu V',
    headline: 'Consultant 1',
    company: 'EY GDS',
    location: 'Kochi, Kerala, India',
    status: 'Available for new opportunities',
    bio: 'Consultant 1 at EY GDS and National Sambo Champion (Gold Medalist & All-India Rank 1 Certified Referee), specializing in scalable server-side architecture, modular REST APIs, and developer productivity tooling with NestJS, TypeScript, and ASP.NET Core. Experienced in delivering enterprise web platforms for public sector clients, including initiatives for the Saudi Ministry, alongside in-IDE developer extensions across IntelliJ IDEA and Visual Studio.',
    github: 'https://github.com/Vishnu1562',
    linkedin: 'https://www.linkedin.com/in/vishnu-v-40a0/',
    email: 'vishnuv2754@gmail.com',
    phone: '+91 8078854995',
  },
  skills: [
    { name: 'Angular', category: 'Frontend', level: 'Expert', tag: 'v16 - v19', iconName: 'angular' },
    { name: 'TypeScript', category: 'Frontend', level: 'Expert', tag: 'Strict Typing', iconName: 'ts' },
    { name: 'NgRx', category: 'Frontend', level: 'Advanced', tag: 'State Management', iconName: 'ngrx' },
    { name: 'SCSS / CSS3', category: 'Frontend', level: 'Advanced', tag: 'Responsive & BEM', iconName: 'scss' },
    { name: 'HTML5', category: 'Frontend', level: 'Expert', tag: 'Semantic & A11y', iconName: 'html' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', tag: 'Utility-first', iconName: 'tailwind' },
    { name: 'ASP.NET Core', category: 'Backend', level: 'Expert', tag: 'REST & Web APIs', iconName: 'dotnet' },
    { name: 'C#', category: 'Backend', level: 'Expert', tag: '.NET 8 / 9', iconName: 'csharp' },
    { name: 'NestJS', category: 'Backend', level: 'Advanced', tag: 'Modular Architecture', iconName: 'nestjs' },
    { name: 'Node.js', category: 'Backend', level: 'Advanced', tag: 'Runtime & Tools', iconName: 'nodejs' },
    { name: 'PostgreSQL', category: 'Cloud & Tools', level: 'Intermediate', tag: 'Relational DB', iconName: 'postgres' },
    { name: 'MySQL', category: 'Cloud & Tools', level: 'Advanced', tag: 'RDBMS', iconName: 'mysql' },
    { name: 'Flutter', category: 'Mobile', level: 'Advanced', tag: 'Cross-platform', iconName: 'flutter' },
    { name: 'Dart', category: 'Mobile', level: 'Advanced', tag: 'Async & Streams', iconName: 'dart' },
    { name: 'Azure DevOps', category: 'Cloud & Tools', level: 'Advanced', tag: 'CI/CD & Boards', iconName: 'azure' },
    { name: 'Git & GitHub', category: 'Cloud & Tools', level: 'Expert', tag: 'Version Control', iconName: 'git' },
    { name: 'Postman', category: 'Cloud & Tools', level: 'Advanced', tag: 'API Testing', iconName: 'postman' },
    { name: 'IntelliJ IDEA Extension', category: 'Cloud & Tools', level: 'Advanced', tag: 'JetBrains SDK', iconName: 'intellij' },
    { name: 'Visual Studio Extension', category: 'Cloud & Tools', level: 'Advanced', tag: 'VSIX / Extensibility', iconName: 'vs' },
    { name: 'GitHub Copilot', category: 'Cloud & Tools', level: 'Certified', tag: 'Microsoft Certified', iconName: 'copilot' },
  ],
  education: {
    degree: 'Bachelor of Technology (BTech), Information Technology',
    institution: 'Government Engineering College, Barton Hill, Thiruvananthapuram',
    period: '2019 – 2023',
    location: 'Kerala, India',
    logoText: 'GEC Barton Hill',
  },
  certifications: [
    {
      title: 'GitHub Copilot',
      issuer: 'Microsoft',
      issueDate: 'Feb 2026',
      expiryDate: 'Feb 2028',
      credentialId: 'DE17740A659BDD83',
      badge: 'Microsoft Certified',
    },
  ],
  selectedCategory: 'All',
  projects: [
    {
      title: 'Saudi Public Sector, Industrial & Energy Enterprise Platforms',
      subtitle: 'EY GDS Enterprise Project • Saudi Ministry, SDAIA, MODON & Aramco',
      description:
        'Enterprise-grade government services, industrial administrative portals, and energy sector RESTful Web APIs developed for the Saudi Ministry, SDAIA, MODON, and Saudi Aramco, ensuring strict role-based data governance and high availability.',
      techStack: ['NestJS', 'ASP.NET Core', 'C#', '.NET 8/9', 'PostgreSQL', 'SQL Server', 'Clean Architecture'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Clean Architecture with repository patterns, modular domain design, and strict role-based access control.',
    },
    {
      title: 'Developer Productivity IDE Extensions (SDAIA Initiative)',
      subtitle: 'EY GDS Strategic Initiative • In-IDE Developer Tooling for SDAIA',
      description:
        'Custom developer productivity extensions engineered for IntelliJ IDEA (JetBrains Plugin SDK) and Visual Studio / VS Code for SDAIA, integrating custom code generation, templates, and intelligent code completions to accelerate developer velocity.',
      techStack: ['IntelliJ Plugin SDK', 'Visual Studio (VSIX)', 'VS Code API', 'TypeScript', 'Java'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Event-driven IDE extensibility integrating directly with editor actions and developer tooling APIs.',
    },
    {
      title: 'Martial Arts Event Manager Platform',
      subtitle: 'Personal Project • Tournament & Registration Management',
      description:
        'Full-stack web application built with NestJS, Angular, and PostgreSQL to manage tournament brackets, participant registrations, and role-based permissions across organizers. Built by National Sambo Champion (April 2026).',
      techStack: ['NestJS', 'Angular', 'TypeScript', 'TypeORM', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Entity-Attribute-Value (EAV) dynamic schemas with multi-tier jurisdictional access control.',
    },
    {
      title: 'AI Resume Tailor — Chrome Extension',
      subtitle: 'Personal Project • Chrome Side Panel & LLM Tailoring',
      description:
        'Chrome Side Panel extension that reads job postings on sites like LinkedIn and Greenhouse, highlights keyword gaps, and adapts resume bullet points using Gemini Flash and Groq APIs with client-side PDF export.',
      techStack: ['TypeScript', 'Manifest V3', 'Gemini API', 'Groq (Llama 3.3)', 'PDF.js', 'Vitest'],
      githubUrl: 'https://github.com/Vishnu1562/AI_Resume_Tailor',
      architecture: 'Manifest V3 side panel and service worker with local Chrome storage and client-side ATS PDF generation.',
    },
    {
      title: 'Multi-Profile Job Radar Bot',
      subtitle: 'Personal Project • Automated Daily Job Scanner',
      description:
        'Automated script that scrapes developer job listings daily based on configured skill profiles, avoids duplicate alerts using an embedded SQLite database, and emails a daily digest.',
      techStack: ['Node.js', 'TypeScript', 'SQLite', 'GitHub Actions', 'REST APIs', 'Nodemailer'],
      githubUrl: 'https://github.com/Vishnu1562/Job_Bot',
      architecture: 'Daily GitHub Actions cron workflow with embedded SQLite deduplication and Nodemailer digest dispatch.',
    },
  ],
  experiences: [
    {
      role: 'Consultant 1',
      company: 'EY GDS (Ernst & Young Global Delivery Services)',
      location: 'Kochi, Kerala, India',
      period: 'Oct 2023 – Present',
      badge: 'Enterprise Experience',
      summary:
        'Engineering mission-critical enterprise applications and developer productivity tooling for global clients and government ministries. Specialized in scalable backend architectures with NestJS and ASP.NET Core, paired with modern Angular SPAs.',
      points: [
        'Architected and delivered secure, high-compliance backend services and administrative portals for major public sector authorities including the Saudi Ministry, SDAIA (Saudi Data & AI Authority), and MODON (Industrial Cities & Technology Zones).',
        'Engineered high-availability enterprise services and integration APIs for tier-1 Energy & Oil/Gas clients, including Saudi Aramco and a leading UAE national energy corporation (confidential under NDA), focusing on scalable data processing in PostgreSQL and SQL Server.',
        'Engineered custom, real-time in-IDE developer productivity extensions for both IntelliJ IDEA (JetBrains Plugin SDK) and Visual Studio / VS Code as part of an enterprise initiative for SDAIA, implementing custom code generation, templates, and intelligent completions.',
        'Engineered RESTful Web APIs using ASP.NET Core (.NET 8/9) and NestJS, implementing Clean Architecture, repository patterns, and query optimizations for PostgreSQL and SQL Server.',
        'Delivered responsive Single Page Applications (SPAs) with Angular (v16–v21) and NgRx, ensuring modular component architecture and maintainable styling for enterprise client portals.',
        'Managed CI/CD release pipelines in Azure DevOps and GitHub Actions, conducted Postman API validation, performed regular code reviews, and enforced strict type-safety standards.',
      ],
      technologies: [
        'NestJS',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'ASP.NET Core',
        'C#',
        'IntelliJ IDEA Plugin SDK',
        'Visual Studio Extension (VSIX)',
        'Angular',
        'NgRx',
        'Azure DevOps',
        'GitHub Actions',
        'Tailwind CSS',
        'SCSS',
      ],
    },
  ],
  isMobileMenuOpen: false,
  resumeModalOpen: false,
  isSubmittingContact: false,
  contactSuccess: false,
};

export const PortfolioStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ skills, selectedCategory }) => ({
    filteredSkills: computed(() => {
      const category = selectedCategory();
      if (category === 'All') return skills();
      return skills().filter((skill) => skill.category === category);
    }),
    categories: computed((): SkillCategory[] => ['All', 'Frontend', 'Backend', 'Mobile', 'Cloud & Tools']),
  })),
  withMethods((store) => ({
    setCategory(category: SkillCategory): void {
      patchState(store, { selectedCategory: category });
    },
    toggleMobileMenu(): void {
      patchState(store, { isMobileMenuOpen: !store.isMobileMenuOpen() });
    },
    closeMobileMenu(): void {
      patchState(store, { isMobileMenuOpen: false });
    },
    openResumeModal(): void {
      patchState(store, { resumeModalOpen: true });
    },
    closeResumeModal(): void {
      patchState(store, { resumeModalOpen: false });
    },
    downloadResume(): void {
      const a = document.createElement('a');
      a.href = 'Vishnu_V_Resume.pdf';
      a.download = 'Vishnu_V_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      patchState(store, { resumeModalOpen: false });
    },
    submitContact(data: ContactFormData): void {
      patchState(store, { contactSuccess: true });
    },
    resetContactSuccess(): void {
      patchState(store, { contactSuccess: false });
    },
  }))
);
