import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { PortfolioStore } from '../../state/portfolio.store';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [PortfolioStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create contact component', () => {
    expect(component).toBeTruthy();
  });

  it('should render 4 direct contact cards: Email, LinkedIn, GitHub, Location', () => {
    const emailLink = compiled.querySelector('a[href^="mailto:vishnuv2754@gmail.com"]');
    expect(emailLink).toBeTruthy();

    const linkedInLink = compiled.querySelector('a[href="https://www.linkedin.com/in/vishnu-v-40a0/"]');
    expect(linkedInLink).toBeTruthy();

    const githubLink = compiled.querySelector('a[href="https://github.com/Vishnu1562"]');
    expect(githubLink).toBeTruthy();

    expect(compiled.textContent).toContain('Kerala, India');
  });

  it('should NOT render a contact form or phone number', () => {
    expect(compiled.querySelector('form')).toBeNull();
    expect(compiled.textContent).not.toContain('8078854995');
    expect(compiled.querySelector('a[href^="tel:"]')).toBeNull();
  });
});
