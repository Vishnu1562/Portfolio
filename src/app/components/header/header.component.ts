import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio.store';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly store = inject(PortfolioStore);
}
