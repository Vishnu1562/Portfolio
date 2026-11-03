import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly store = inject(PortfolioStore);
}
