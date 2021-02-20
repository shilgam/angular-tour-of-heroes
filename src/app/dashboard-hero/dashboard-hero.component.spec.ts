import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import DashboardHeroComponent from './dashboard-hero.component';
import Hero from '../hero';

describe('DashboardHeroComponent', () => {
  let component: DashboardHeroComponent;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroDe;
  let heroEl;
  let expectedHero: Hero;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardHeroComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeroComponent);
    component = fixture.componentInstance;

    // mock the hero supplied by the parent component
    expectedHero = { id: 42, name: 'Hero Name' };

    // simulate the parent setting the input property with that hero
    component.hero = expectedHero;

    // trigger initial data binding
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
