import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStore } from '../../state/portfolio.store';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  readonly store = inject(PortfolioStore);
}
