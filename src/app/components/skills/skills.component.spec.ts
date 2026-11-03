import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillsComponent } from './skills.component';
import { PortfolioStore } from '../../state/portfolio.store';

describe('SkillsComponent', () => {
  let fixture: ComponentFixture<SkillsComponent>;
  let component: SkillsComponent;
  let store: InstanceType<typeof PortfolioStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [PortfolioStore],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(PortfolioStore);
    fixture.detectChanges();
  });

  it('should create skills component', () => {
    expect(component).toBeTruthy();
  });

  it('should delegate category selection to store', () => {
    component.onSelectCategory('Mobile');
    expect(store.selectedCategory()).toBe('Mobile');
  });
});
