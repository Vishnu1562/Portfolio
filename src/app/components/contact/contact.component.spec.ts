import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact.component';
import { PortfolioStore } from '../../state/portfolio.store';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;
  let store: InstanceType<typeof PortfolioStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent, ReactiveFormsModule],
      providers: [PortfolioStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(PortfolioStore);
    fixture.detectChanges();
  });

  it('should create contact component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form submitted and block invalid input', () => {
    component.onSubmitContact();
    expect(component.formSubmitted()).toBe(true);
    expect(component.contactForm.invalid).toBe(true);
    expect(store.contactSuccess()).toBe(false);
  });

  it('should submit valid data to store and reset form', () => {
    component.contactForm.setValue({
      name: 'Alice',
      email: 'alice@example.com',
      subject: 'Consulting Inquiry',
      message: 'Looking to hire an Angular and .NET specialist.',
    });

    component.onSubmitContact();
    expect(store.contactSuccess()).toBe(true);
    expect(component.contactForm.get('name')?.value).toBeFalsy();
  });
});
