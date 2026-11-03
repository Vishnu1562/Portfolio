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
    it('should display Vishnu V and Full Stack Developer without inline company tag in intro', () => {
      const heroText = compiled.querySelector('#about')?.textContent || '';
      expect(heroText).toContain('Vishnu V');
      expect(heroText).toContain('Full Stack Developer');
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
    it('should display real GitHub projects with NestJS featured first', () => {
      const projects = component.projects();
      expect(projects.length).toBeGreaterThanOrEqual(3);
      expect(projects[0].title).toContain('NestJS');

      const studentPortal = projects.find((p) => p.title.includes('StudentAdminPortal'));
      expect(studentPortal).toBeDefined();
      expect(studentPortal?.githubUrl).toContain('Vishnu1562/StudentAdminPortal.API');

      const flutterApp = projects.find((p) => p.title.includes('World Time'));
      expect(flutterApp).toBeDefined();
      expect(flutterApp?.githubUrl).toContain('Vishnu1562/Flutter_world_time_app');

      const nestApp = projects.find((p) => p.title.includes('NestJS'));
      expect(nestApp).toBeDefined();
      expect(nestApp?.githubUrl).toContain('Vishnu1562/NestJs_Learning');
    });

    it('should ensure all project GitHub links have rel="noopener noreferrer" and target="_blank"', () => {
      const projectLinks = compiled.querySelectorAll('#projects a[target="_blank"]');
      expect(projectLinks.length).toBeGreaterThanOrEqual(3);
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
      expect(link?.getAttribute('href')).toBe('/Vishnu_V_Resume.pdf');
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
    it('should display IDE extension development in the Experience section', () => {
      const expText = compiled.querySelector('#experience')?.textContent || '';
      expect(expText).toContain('IntelliJ IDEA');
      expect(expText).toContain('Visual Studio');
      expect(expText).toContain('productivity extensions');
    });

    it('should include IDE extension skills in the Cloud & Tools filter', () => {
      component.setCategory('Cloud & Tools');
      fixture.detectChanges();
      const filtered = component.filteredSkills();
      expect(filtered.some((s) => s.name === 'IntelliJ IDEA Extension')).toBe(true);
      expect(filtered.some((s) => s.name === 'Visual Studio Extension')).toBe(true);
    });
  });
});
