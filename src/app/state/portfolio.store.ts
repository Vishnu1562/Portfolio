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
      title: 'NestJS Enterprise API Architecture',
      subtitle: 'Scalable Modular TypeScript Backend Service',
      description:
        'Hands-on enterprise architecture implementing NestJS decorators, dependency injection containers, middleware guards, validation pipes, and structured modular service routing.',
      techStack: ['NestJS', 'TypeScript', 'Node.js', 'Express', 'JWT Auth', 'Jest'],
      githubUrl: 'https://github.com/Vishnu1562/NestJs_Learning',
      architecture: 'Modular Domain-Driven structure with Inversion of Control (IoC) and dependency injection.',
    },
    {
      title: 'StudentAdminPortal.API',
      subtitle: 'Enterprise REST Web API & Database Integration',
      description:
        'A production-ready ASP.NET Core Web API managing comprehensive student profiles, address mappings, and image storage with Entity Framework Core and SQL persistence.',
      techStack: ['ASP.NET Core', 'C#', 'EF Core', 'SQL Server / PostgreSQL', 'AutoMapper', 'FluentValidation'],
      githubUrl: 'https://github.com/Vishnu1562/StudentAdminPortal.API',
      architecture: 'Clean Architecture with Repository Pattern, DTO mapping, and RESTful specifications.',
    },
    {
      title: 'Flutter World Time App',
      subtitle: 'Real-time Cross-Platform Mobile Application',
      description:
        'A sleek mobile app built with Flutter and Dart that consumes global World Time REST APIs, displays dynamic day/night visuals based on location timestamps, and provides fluid navigational routing.',
      techStack: ['Flutter', 'Dart', 'World Time API', 'HTTP Package', 'Async/Await', 'Intl'],
      githubUrl: 'https://github.com/Vishnu1562/Flutter_world_time_app',
      architecture: 'Stateful reactive UI architecture with asynchronous network layer and location cache.',
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
        'Engineering high-impact, mission-critical enterprise applications for global clients. Focused on robust backend services, scalable API design, and developer productivity tooling, complemented by responsive client SPAs.',
      points: [
        'Architected and developed modular, enterprise-grade backend services and REST APIs using NestJS, TypeScript, and Node.js, implementing robust dependency injection, custom middleware guards, and structured validation pipes.',
        'Engineered intelligent, real-time in-IDE developer productivity extensions for both IntelliJ IDEA (JetBrains Plugin SDK) and Visual Studio / VS Code as part of a strategic client engagement. Implemented context-aware code generation, intelligent inline completions, syntax-aware analysis, and custom enterprise workflow automations directly within developers\' active editor environments.',
        'Engineered high-throughput RESTful Web APIs using ASP.NET Core and Entity Framework Core, optimizing SQL/PostgreSQL database queries, indexing, and repository patterns.',
        'Delivered responsive Single Page Applications (SPAs) with Angular, NgRx state management, and modern SCSS architecture to provide seamless client interfaces for enterprise systems.',
        'Integrated automated testing, CI/CD pipelines via Azure DevOps, and participated in regular code reviews, linting, and architectural alignment.',
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
        'Context-Aware AI Assistance',
        'Angular',
        'NgRx',
        'Azure DevOps',
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
      a.href = '/Vishnu_V_Resume.pdf';
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
