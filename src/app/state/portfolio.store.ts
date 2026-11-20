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
    headline: 'Full Stack Developer',
    company: 'EY GDS',
    location: 'Kerala, India',
    status: 'Available for new opportunities',
    bio: 'Full Stack Developer with a primary focus on scalable backend architecture, modular REST APIs, and in-IDE developer tooling with NestJS, TypeScript, and ASP.NET Core. Experienced in robust database modeling in PostgreSQL & MySQL, complemented by end-to-end client capabilities in Angular and Flutter.',
    github: 'https://github.com/Vishnu1562',
    linkedin: 'https://www.linkedin.com/in/vishnu-v-40a0/',
    email: 'vishnu.v.dev@outlook.com',
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
      title: 'Martial Arts Event Manager Platform',
      subtitle: 'Full Stack Tournament & Sports Administration System',
      description:
        'Scalable sports tournament management system featuring dynamic registration form builders, automated inter-regional duplicate participant detection, and hierarchical jurisdictional access control.',
      techStack: ['NestJS', 'Angular', 'TypeScript', 'TypeORM', 'PostgreSQL', 'Tailwind CSS', 'Vitest'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Entity-Attribute-Value (EAV) dynamic schemas with automated multi-tier jurisdictional SQL query interception.',
    },
    {
      title: 'Multi-Profile Job Radar Bot',
      subtitle: 'Automated Job Aggregator & Serverless Cloud Dispatcher',
      description:
        'Automated scanner aggregating remote developer feeds across customizable domain profiles, performing regex skill extraction, persistent SQLite deduplication, and scheduled email digest delivery.',
      techStack: ['Node.js', 'TypeScript', 'SQLite', 'GitHub Actions', 'REST APIs', 'Nodemailer'],
      githubUrl: 'https://github.com/Vishnu1562/Job_Bot',
      architecture: 'Serverless 24/7 cron-driven automation via GitHub Actions with persistent file-backed SQLite deduplication.',
    },
    {
      title: 'Saudi Ministry & Government Web Applications',
      subtitle: 'Mission-Critical Public Sector Enterprise Portals & APIs',
      description:
        'Enterprise-grade government services and high-throughput RESTful APIs developed for the Saudi Ministry and public sector initiatives, ensuring strict multi-tenancy, regulatory compliance, and audit logging.',
      techStack: ['NestJS', 'ASP.NET Core', 'C#', '.NET 8/9', 'PostgreSQL', 'SQL Server', 'Clean Architecture'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Clean Architecture with repository patterns, domain-driven design, and strict role-based data governance.',
    },
    {
      title: 'Developer Productivity IDE Extensions',
      subtitle: 'In-IDE Code Intelligence & Workflow Automation Tooling',
      description:
        'Custom developer productivity extensions engineered for IntelliJ IDEA and Visual Studio / VS Code, integrating AST-based syntax analysis, intelligent code completions, and automated enterprise boilerplate generation.',
      techStack: ['IntelliJ Plugin SDK', 'Visual Studio (VSIX)', 'VS Code API', 'TypeScript', 'Java', 'AST Parsing'],
      githubUrl: 'https://github.com/Vishnu1562',
      architecture: 'Event-driven IDE extensibility integrating with compiler daemon hooks and editor language servers.',
    },
  ],
  experiences: [
    {
      role: 'Full Stack Developer',
      company: 'EY GDS (Ernst & Young Global Delivery Services)',
      location: 'Kerala, India',
      period: 'Present',
      badge: 'Enterprise Experience',
      summary:
        'Engineering mission-critical enterprise applications and developer productivity tooling for global clients and government ministries. Specialized in scalable backend architectures with NestJS and ASP.NET Core, paired with modern Angular SPAs.',
      points: [
        'Architected and deployed scalable backend services and secure web applications for public sector initiatives, including enterprise platforms for the Saudi Ministry, adhering to strict data compliance and security protocols.',
        'Engineered intelligent, real-time in-IDE developer productivity extensions for both IntelliJ IDEA (JetBrains Plugin SDK) and Visual Studio / VS Code as part of a strategic client engagement, integrating AST syntax inspection and automated boilerplate generation.',
        'Engineered high-throughput RESTful Web APIs using ASP.NET Core (.NET 8/9) and NestJS, implementing Clean Architecture, repository patterns, and query optimizations for PostgreSQL and SQL Server.',
        'Delivered responsive Single Page Applications (SPAs) with Angular (v16–v21), reactive state management (Signals & NgRx), and modular styling for enterprise client portals.',
        'Integrated automated testing, CI/CD pipelines via Azure DevOps and GitHub Actions, enforcing strict linting, type-safety, and code review standards.',
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
