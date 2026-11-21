import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { SkillCategory, SkillItem } from '../core/models/skill.model';
import { ProjectItem } from '../core/models/project.model';
import { ExperienceItem } from '../core/models/experience.model';
import { ContactFormData, PersonalInfo } from '../core/models/contact.model';

export interface PortfolioState {
  personalInfo: PersonalInfo;
  skills: SkillItem[];
  selectedCategory: SkillCategory;
  projects: ProjectItem[];
  experiences: ExperienceItem[];
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
  ],
  selectedCategory: 'All',
  projects: [
    {
      title: 'Saudi Ministry & Government Web Applications',
      subtitle: 'EY GDS Enterprise Project • Public Sector Portals & APIs',
      description:
        'Enterprise-grade government services and RESTful Web APIs developed for the Saudi Ministry and public sector initiatives, ensuring strict role-based data governance, secure validation, and high availability.',
      techStack: ['NestJS', 'ASP.NET Core', 'C#', '.NET 8/9', 'PostgreSQL', 'SQL Server', 'Clean Architecture'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Clean Architecture with repository patterns, modular domain design, and strict role-based access control.',
    },
    {
      title: 'Developer Productivity IDE Extensions',
      subtitle: 'EY GDS Strategic Initiative • In-IDE Developer Tooling',
      description:
        'Custom developer productivity extensions engineered for IntelliJ IDEA (JetBrains Plugin SDK) and Visual Studio / VS Code, integrating custom code generation, templates, and intelligent code completions to accelerate developer velocity.',
      techStack: ['IntelliJ Plugin SDK', 'Visual Studio (VSIX)', 'VS Code API', 'TypeScript', 'Java'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Event-driven IDE extensibility integrating directly with editor actions and developer tooling APIs.',
    },
    {
      title: 'Martial Arts Event Manager Platform',
      subtitle: 'Personal Project • Tournament & Registration Management (Built by National Sambo Champion)',
      description:
        'Full-stack sports tournament platform featuring dynamic registration form builders, automated inter-regional duplicate participant detection, and hierarchical jurisdictional access control. Built with domain expertise following victory at the National Sambo Championship (Calicut, April 2026).',
      techStack: ['NestJS', 'Angular', 'TypeScript', 'TypeORM', 'PostgreSQL', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Entity-Attribute-Value (EAV) dynamic schemas with automated multi-tier jurisdictional SQL query interception.',
    },
    {
      title: 'Multi-Profile Job Radar Bot',
      subtitle: 'Personal Project • Automated Job Scanner & Cloud Dispatcher',
      description:
        'Automated scanner aggregating remote developer feeds across customizable domain profiles, performing regex skill extraction, persistent SQLite deduplication, and scheduled email digest delivery.',
      techStack: ['Node.js', 'TypeScript', 'SQLite', 'GitHub Actions', 'REST APIs', 'Nodemailer'],
      githubUrl: 'https://github.com/Vishnu1562/Job_Bot',
      architecture: 'Serverless 24/7 cron-driven automation via GitHub Actions with persistent file-backed SQLite deduplication.',
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
        'Architected and deployed secure, scalable backend services and responsive client portals for public sector initiatives, including enterprise platforms for the Saudi Ministry, adhering to strict data validation and security protocols.',
        'Engineered custom, real-time in-IDE developer productivity extensions for both IntelliJ IDEA (JetBrains Plugin SDK) and Visual Studio / VS Code as part of an enterprise initiative, implementing custom code generation, templates, and intelligent completions.',
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
