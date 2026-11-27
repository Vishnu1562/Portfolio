import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  // Store delegations for contract compatibility
  readonly personalInfo = this.store.personalInfo;
  readonly experiences = this.store.experiences;
  readonly categories = this.store.categories;
  readonly isMobileMenuOpen = this.store.isMobileMenuOpen;
  readonly selectedCategory = this.store.selectedCategory;
  readonly filteredSkills = this.store.filteredSkills;
  readonly projects = this.store.projects;
  readonly resumeModalOpen = this.store.resumeModalOpen;

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

  downloadPlaceholderResume(): void {
    this.store.downloadResume();
  }
}
