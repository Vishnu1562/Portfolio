import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio.store';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  readonly store = inject(PortfolioStore);
}
