import { TestBed } from '@angular/core/testing';
import { PortfolioStore } from './portfolio.store';

describe('PortfolioStore (NgRx SignalStore)', () => {
  let store: InstanceType<typeof PortfolioStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortfolioStore],
    });
    store = TestBed.inject(PortfolioStore);
  });

  it('should initialize with default Vishnu V portfolio data', () => {
    expect(store.personalInfo().name).toBe('Vishnu V');
    expect(store.personalInfo().company).toBe('EY GDS');
    expect(store.selectedCategory()).toBe('All');
    expect(store.skills().length).toBeGreaterThan(10);
    expect(store.projects().length).toBe(4);
    expect(store.isMobileMenuOpen()).toBe(false);
    expect(store.resumeModalOpen()).toBe(false);
  });

  it('should update selectedCategory and computed filteredSkills', () => {
    store.setCategory('Backend');
    expect(store.selectedCategory()).toBe('Backend');
    const filtered = store.filteredSkills();
    expect(filtered.every((s) => s.category === 'Backend')).toBe(true);
    expect(filtered.some((s) => s.name === 'ASP.NET Core')).toBe(true);
  });

  it('should toggle and close mobile menu', () => {
    expect(store.isMobileMenuOpen()).toBe(false);
    store.toggleMobileMenu();
    expect(store.isMobileMenuOpen()).toBe(true);
    store.closeMobileMenu();
    expect(store.isMobileMenuOpen()).toBe(false);
  });

  it('should open and close resume modal', () => {
    expect(store.resumeModalOpen()).toBe(false);
    store.openResumeModal();
    expect(store.resumeModalOpen()).toBe(true);
    store.closeResumeModal();
    expect(store.resumeModalOpen()).toBe(false);
  });

  it('should handle contact submission and reset', () => {
    expect(store.contactSuccess()).toBe(false);
    store.submitContact({
      name: 'John',
      email: 'john@example.com',
      subject: 'Opportunity',
      message: 'Great profile!',
    });
    expect(store.contactSuccess()).toBe(true);
    store.resetContactSuccess();
    expect(store.contactSuccess()).toBe(false);
  });
});
