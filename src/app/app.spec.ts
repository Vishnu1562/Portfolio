import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { ReactiveFormsModule } from '@angular/forms';

describe('Vishnu V - Portfolio Application (Behavioral Contract Tests)', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the portfolio component instance', () => {
    expect(component).toBeTruthy();
  });

  describe('HF-001: Navigation Bar & Anchors', () => {
    it('should render navigation links pointing to sections', () => {
      const navLinks = compiled.querySelectorAll('nav a');
      const hrefs = Array.from(navLinks).map((a) => a.getAttribute('href'));
      expect(hrefs).toContain('#about');
      expect(hrefs).toContain('#experience');
      expect(hrefs).toContain('#skills');
      expect(hrefs).toContain('#projects');
      expect(hrefs).toContain('#contact');
    });

    it('should toggle mobile menu when hamburger button is clicked (EC-001)', () => {
      expect(component.isMobileMenuOpen()).toBe(false);
      component.toggleMobileMenu();
      expect(component.isMobileMenuOpen()).toBe(true);
      component.closeMobileMenu();
      expect(component.isMobileMenuOpen()).toBe(false);
    });
  });

  describe('HF-002: Hero Section Display', () => {
    it('should display Vishnu V and Consultant 1 without inline company tag in intro', () => {
      const heroText = compiled.querySelector('#about')?.textContent || '';
      expect(heroText).toContain('Vishnu V');
      expect(heroText).toContain('Consultant 1');
      expect(compiled.querySelector('[data-testid="hero-company"]')).toBeNull();
    });

    it('should NOT display status indicator for availability', () => {
      const statusBadge = compiled.querySelector('[data-testid="status-badge"]');
      expect(statusBadge).toBeNull();
    });

    it('should render primary CTA buttons for Projects and Contact', () => {
      const projectsCTA = compiled.querySelector('a[href="#projects"]');
      const contactCTA = compiled.querySelector('a[href="#contact"]');
      expect(projectsCTA).toBeTruthy();
      expect(contactCTA).toBeTruthy();
    });
  });

  describe('HF-003: Skill Matrix & Filtering', () => {
    it('should default to "All" category and display all skills', () => {
      expect(component.selectedCategory()).toBe('All');
      expect(component.filteredSkills().length).toBeGreaterThanOrEqual(10);
    });

    it('should filter skills by Frontend category', () => {
      component.setCategory('Frontend');
      fixture.detectChanges();
      const filtered = component.filteredSkills();
      expect(filtered.every((s) => s.category === 'Frontend')).toBe(true);
      expect(filtered.some((s) => s.name === 'Angular')).toBe(true);
      expect(filtered.some((s) => s.name === 'TypeScript')).toBe(true);
    });

    it('should filter skills by Backend category', () => {
      component.setCategory('Backend');
      fixture.detectChanges();
      const filtered = component.filteredSkills();
      expect(filtered.every((s) => s.category === 'Backend')).toBe(true);
      expect(filtered.some((s) => s.name === 'ASP.NET Core')).toBe(true);
      expect(filtered.some((s) => s.name === 'NestJS')).toBe(true);
    });

    it('should filter skills by Mobile category', () => {
      component.setCategory('Mobile');
      fixture.detectChanges();
      const filtered = component.filteredSkills();
      expect(filtered.every((s) => s.category === 'Mobile')).toBe(true);
      expect(filtered.some((s) => s.name === 'Flutter')).toBe(true);
    });
  });

  describe('HF-004: Featured Projects', () => {
    it('should display industry-standard projects including Martial Arts Event Manager and Job Radar', () => {
      const projects = component.projects();
      expect(projects.length).toBeGreaterThanOrEqual(4);

      const martialArts = projects.find((p) => p.title.includes('Martial Arts Event Manager'));
      expect(martialArts).toBeDefined();
      expect(martialArts?.techStack).toContain('NestJS');
      expect(martialArts?.techStack).toContain('Angular');

      const jobRadar = projects.find((p) => p.title.includes('Job Radar') || p.title.includes('Job Bot'));
      expect(jobRadar).toBeDefined();
      expect(jobRadar?.githubUrl).toContain('Vishnu1562/Job_Bot');

      const govProject = projects.find((p) => p.title.includes('Saudi Ministry') || p.title.includes('Public Sector'));
      expect(govProject).toBeDefined();

      const ideTooling = projects.find((p) => p.title.includes('IDE Extension') || p.title.includes('Developer Productivity'));
      expect(ideTooling).toBeDefined();
    });

    it('HF-013: should display AI Resume Tailor Chrome Extension in featured projects', () => {
      const projects = component.projects();
      const aiTailor = projects.find((p) => p.title.includes('AI Resume Tailor'));
      expect(aiTailor).toBeDefined();
      expect(aiTailor?.techStack).toContain('TypeScript');
      expect(aiTailor?.techStack).toContain('Manifest V3');
      expect(aiTailor?.githubUrl).toContain('Vishnu1562/AI_Resume_Tailor');
    });

    it('should ensure all project GitHub links have rel="noopener noreferrer" and target="_blank"', () => {
      const projectLinks = compiled.querySelectorAll('#projects a[target="_blank"]');
      expect(projectLinks.length).toBeGreaterThanOrEqual(4);
      projectLinks.forEach((link) => {
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(link.getAttribute('rel')).toContain('noreferrer');
      });
    });
  });

  describe('HF-005: Resume Download / View', () => {
    it('should have a resume download action with download modal or direct download', () => {
      expect(component.resumeModalOpen()).toBe(false);
      component.triggerResumeDownload();
      expect(component.resumeModalOpen()).toBe(true);
      component.closeResumeModal();
      expect(component.resumeModalOpen()).toBe(false);
    });

    it('should link to the PDF resume document', () => {
      component.triggerResumeDownload();
      fixture.detectChanges();
      const link = compiled.querySelector('a[download="Vishnu_V_Resume.pdf"]');
      expect(link).toBeTruthy();
      expect(link?.getAttribute('href')).toContain('Vishnu_V_Resume.pdf');
    });
  });

  describe('HF-006, NF-001, NF-002: Contact Form Validation & State', () => {
    it('should initialize contact form with empty fields', () => {
      expect(component.contactForm.valid).toBe(false);
      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('subject')?.value).toBe('');
      expect(component.contactForm.get('message')?.value).toBe('');
    });

    it('NF-001: should prevent submission and mark fields touched when submitted empty', () => {
      component.onSubmitContact();
      expect(component.contactForm.invalid).toBe(true);
      expect(component.formSubmitted()).toBe(true);
      expect(component.submissionSuccess()).toBe(false);
    });

    it('NF-002: should detect invalid email format', () => {
      const emailCtrl = component.contactForm.get('email');
      emailCtrl?.setValue('not-an-email');
      expect(emailCtrl?.valid).toBe(false);
      expect(emailCtrl?.hasError('email')).toBe(true);
    });

    it('HF-006: should successfully submit valid contact form and reset form', () => {
      component.contactForm.setValue({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        subject: 'Enterprise Opportunity',
        message: 'Looking forward to connecting with you regarding full-stack roles.',
      });

      expect(component.contactForm.valid).toBe(true);
      component.onSubmitContact();

      expect(component.submissionSuccess()).toBe(true);
      expect(component.contactForm.get('name')?.value).toBeFalsy();
      expect(component.contactForm.get('email')?.value).toBeFalsy();
    });
  });

  describe('HF-007: Enterprise Career & IDE Extension Development Details', () => {
    it('should display IDE extension development and Saudi Ministry projects in the Experience section', () => {
      const expText = compiled.querySelector('#experience')?.textContent || '';
      expect(expText).toContain('IntelliJ IDEA');
      expect(expText).toContain('Visual Studio');
      expect(expText).toContain('productivity extensions');
      expect(expText).toContain('Saudi Ministry');
      expect(expText).toContain('SDAIA');
      expect(expText).toContain('MODON');
      expect(expText).toContain('Saudi Aramco');
      expect(expText).not.toContain('ADNOC');
    });

    it('should include IDE extension skills in the Cloud & Tools filter', () => {
      component.setCategory('Cloud & Tools');
      fixture.detectChanges();
      const filtered = component.filteredSkills();
      expect(filtered.some((s) => s.name === 'IntelliJ IDEA Extension')).toBe(true);
      expect(filtered.some((s) => s.name === 'Visual Studio Extension')).toBe(true);
    });

    it('HF-008: should display Honors & Athletic Leadership card in the Experience section', () => {
      const expText = compiled.querySelector('#experience')?.textContent || '';
      expect(expText).toContain('National Sambo Champion');
      expect(expText).toContain('Combat Sambo');
      expect(expText).toContain('Rank 1 Certified Referee');
      expect(expText).toContain('April 2026');
    });

    it('HF-009: should display direct verified email contact card in the Contact section', () => {
      const contactSection = compiled.querySelector('#contact');
      expect(contactSection?.textContent).toContain('vishnuv2754@gmail.com');
      const mailtoLink = contactSection?.querySelector('a[href^="mailto:vishnuv2754@gmail.com"]');
      expect(mailtoLink).toBeTruthy();
    });

    it('HF-010: should display verified Education details in the Experience section', () => {
      const expText = compiled.querySelector('#experience')?.textContent || '';
      expect(expText).toContain('Government Engineering College, Barton Hill');
      expect(expText).toContain('Information Technology');
      expect(expText).toContain('2019 – 2023');
    });

    it('HF-011: should display Microsoft GitHub Copilot certification in the Experience section', () => {
      const expText = compiled.querySelector('#experience')?.textContent || '';
      expect(expText).toContain('GitHub Copilot');
      expect(expText).toContain('Microsoft');
      expect(expText).toContain('DE17740A659BDD83');
      expect(expText).toContain('Feb 2026');
    });

    it('HF-012: should store verified phone number in personalInfo state', () => {
      expect(component.store.personalInfo().phone).toBe('+91 8078854995');
    });
  });
});
