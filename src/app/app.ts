import { Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ResumeModalComponent } from './components/resume-modal/resume-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { PortfolioStore } from './state/portfolio.store';
import { SkillCategory } from './core/models/skill.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    HeroComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    ResumeModalComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly store = inject(PortfolioStore);
  readonly contactChild = viewChild(ContactComponent);

  // Store delegations for contract compatibility
  readonly isMobileMenuOpen = this.store.isMobileMenuOpen;
  readonly selectedCategory = this.store.selectedCategory;
  readonly filteredSkills = this.store.filteredSkills;
  readonly projects = this.store.projects;
  readonly resumeModalOpen = this.store.resumeModalOpen;
  readonly submissionSuccess = this.store.contactSuccess;

  get contactForm() {
    const child = this.contactChild();
    if (!child) {
      throw new Error('ContactComponent not yet initialized');
    }
    return child.contactForm;
  }

  get formSubmitted() {
    const child = this.contactChild();
    return () => (child ? child.formSubmitted() : false);
  }

  toggleMobileMenu(): void {
    this.store.toggleMobileMenu();
  }

  closeMobileMenu(): void {
    this.store.closeMobileMenu();
  }

  setCategory(category: SkillCategory): void {
    this.store.setCategory(category);
  }

  triggerResumeDownload(): void {
    this.store.openResumeModal();
  }

  closeResumeModal(): void {
    this.store.closeResumeModal();
  }

  onSubmitContact(): void {
    this.contactChild()?.onSubmitContact();
  }
}
