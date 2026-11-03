import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio.store';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  readonly store = inject(PortfolioStore);
}
