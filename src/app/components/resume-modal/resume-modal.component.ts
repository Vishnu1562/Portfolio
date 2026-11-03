import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../../state/portfolio.store';

@Component({
  selector: 'app-resume-modal',
  standalone: true,
  templateUrl: './resume-modal.component.html',
})
export class ResumeModalComponent {
  readonly store = inject(PortfolioStore);
}
