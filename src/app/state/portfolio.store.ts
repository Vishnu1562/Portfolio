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
    bio: 'Full Stack Developer at Ernst & Young (EY GDS) crafting scalable enterprise web and mobile applications. Focused on robust backend systems with ASP.NET Core & NestJS, and fluid reactive client experiences with Angular & Flutter.',
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
  ],
  selectedCategory: 'All',
  projects: [
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
    {
      title: 'NestJS Enterprise API Architecture',
      subtitle: 'Scalable Modular TypeScript Backend Service',
      description:
        'Hands-on enterprise architecture implementing NestJS decorators, dependency injection containers, middleware guards, validation pipes, and structured routing for microservices.',
      techStack: ['NestJS', 'TypeScript', 'Node.js', 'Express', 'JWT Auth', 'Jest'],
      githubUrl: 'https://github.com/Vishnu1562/NestJs_Learning',
      architecture: 'Modular Domain-Driven structure with Inversion of Control (IoC) and dependency injection.',
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
        'Engineering high-impact, mission-critical enterprise applications for global clients. Collaborating within agile cross-functional teams to design, architect, and deliver robust frontend interfaces and resilient backend microservices.',
      points: [
        'Architected and implemented responsive Single Page Applications (SPAs) with Angular, NgRx state management, and modern SCSS architecture.',
        'Engineered high-throughput RESTful Web APIs using ASP.NET Core and NestJS, optimizing SQL/PostgreSQL database queries and repository patterns.',
        'Integrated automated testing, CI/CD pipelines via Azure DevOps, and participated in regular code reviews, linting, and architectural alignment.',
        'Partnered with enterprise stakeholders and UX designers to translate complex business workflows into seamless, accessible web and mobile solutions.',
      ],
      technologies: ['Angular', 'TypeScript', 'NgRx', 'ASP.NET Core', 'C#', 'NestJS', 'Azure DevOps', 'PostgreSQL', 'SCSS'],
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
      const p = store.personalInfo();
      const content = `================================================
${p.name.toUpperCase()} - ${p.headline.toUpperCase()}
Current Company: ${p.company}
Location: ${p.location}
GitHub: ${p.github}
LinkedIn: ${p.linkedin}
================================================

SUMMARY:
${p.bio}

CORE SKILLS:
- Frontend: Angular (v16-v19), TypeScript, NgRx, SCSS, HTML5, Tailwind CSS
- Backend: ASP.NET Core, C#, NestJS, Node.js, Entity Framework Core
- Mobile: Flutter, Dart
- Databases: PostgreSQL, MySQL
- DevOps & Tools: Azure DevOps, Git, Postman, NPM

EXPERIENCE:
Full Stack Developer | EY GDS | Kerala, India
- Designing and developing enterprise web solutions using Angular, TypeScript, and .NET Core.
- Developing modular backend services and REST APIs with comprehensive unit tests.
- Implementing CI/CD pipelines with Azure DevOps and enforcing strict code quality.

FEATURED PROJECTS:
1. StudentAdminPortal.API (ASP.NET Core, EF Core, SQL Server, Clean Architecture)
2. Flutter World Time App (Flutter, Dart, World Time API, Async UI)
3. NestJS Enterprise API Architecture (TypeScript, NestJS, Inversion of Control)

* Official verified PDF resume is available on request.
Contact: ${p.linkedin}
================================================`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Vishnu_V_Resume_Summary.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
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
