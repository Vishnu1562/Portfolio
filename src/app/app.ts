import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & Tools';
  level: string;
  tag: string;
  iconName: string;
}

export interface ProjectItem {
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  architecture: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  summary: string;
  points: string[];
  technologies: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly fb = inject(FormBuilder);

  // Profile data
  readonly personalInfo = {
    name: 'Vishnu V',
    headline: 'Full Stack Developer',
    company: 'EY GDS',
    location: 'Kerala, India',
    status: 'Available for new opportunities',
    bio: 'Full Stack Developer at Ernst & Young (EY GDS) crafting scalable enterprise web and mobile applications. Focused on robust backend systems with ASP.NET Core & NestJS, and fluid reactive client experiences with Angular & Flutter.',
    github: 'https://github.com/Vishnu1562',
    linkedin: 'https://www.linkedin.com/in/vishnu-v-40a0/',
    email: 'vishnu.v.dev@outlook.com',
  };

  // State signals
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly selectedCategory = signal<'All' | 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & Tools'>('All');
  readonly resumeModalOpen = signal<boolean>(false);
  readonly formSubmitted = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly submissionSuccess = signal<boolean>(false);

  readonly categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Cloud & Tools'] as const;

  // Skills List
  readonly skills = signal<SkillItem[]>([
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
  ]);

  // Filtered skills computed signal
  readonly filteredSkills = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'All') return this.skills();
    return this.skills().filter((s) => s.category === cat);
  });

  // Projects list
  readonly projects = signal<ProjectItem[]>([
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
  ]);

  // Professional Experience
  readonly experiences = signal<ExperienceItem[]>([
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
  ]);

  // Reactive Contact Form
  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  // Navigation handlers
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  setCategory(category: 'All' | 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & Tools'): void {
    this.selectedCategory.set(category);
  }

  // Resume Modal Handlers
  triggerResumeDownload(): void {
    this.resumeModalOpen.set(true);
  }

  closeResumeModal(): void {
    this.resumeModalOpen.set(false);
  }

  downloadPlaceholderResume(): void {
    // Generate placeholder resume text file
    const content = `================================================
VISHNU V - FULL STACK DEVELOPER
Current Company: EY GDS (Ernst & Young)
Location: Kerala, India
GitHub: https://github.com/Vishnu1562
LinkedIn: https://www.linkedin.com/in/vishnu-v-40a0/
================================================

SUMMARY:
Results-driven Full Stack Developer with enterprise experience at EY GDS, 
specializing in building scalable, secure, and maintainable web and mobile applications.

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
Contact: https://www.linkedin.com/in/vishnu-v-40a0/
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
    this.closeResumeModal();
  }

  // Contact Submission
  onSubmitContact(): void {
    this.formSubmitted.set(true);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submissionSuccess.set(true);
    this.contactForm.reset();
    this.formSubmitted.set(false);
  }

  resetContactNotification(): void {
    this.submissionSuccess.set(false);
  }
}
