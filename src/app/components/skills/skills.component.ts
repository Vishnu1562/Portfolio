import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio.store';
import { SkillCategory } from '../../core/models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  readonly store = inject(PortfolioStore);

  onSelectCategory(category: SkillCategory): void {
    this.store.setCategory(category);
  }
}
