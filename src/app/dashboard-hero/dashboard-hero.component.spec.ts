import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { click } from 'src/utils';
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

    heroDe = fixture.debugElement.query(By.css('.hero'));
    heroEl = heroDe.nativeElement;

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

  it('should display hero name in uppercase', () => {
    const expectedPipedName = expectedHero.name.toUpperCase();

    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  describe('Clicking the hero', () => {
    /* option #1 */
    it('should raise selected event (triggerEventHandler)', () => {
      let selectedHero: Hero;
      component.selected.subscribe((hero: Hero) => {
        selectedHero = hero;
      });

      heroDe.triggerEventHandler('click', null);

      expect(selectedHero).toBe(expectedHero);
    });

    /* option #2 */
    it('should raise selected event (element.click)', () => {
      let selectedHero: Hero;
      component.selected.subscribe((hero: Hero) => {
        selectedHero = hero;
      });

      heroEl.click();

      expect(selectedHero).toBe(expectedHero);
    });

    /* option #3: using helper function */
    it('should raise selected event (w/ helper function)', () => {
      let selectedHero: Hero;
      component.selected.subscribe((hero: Hero) => {
        selectedHero = hero;
      });

      click(heroEl); /* or click(heroDe) */

      expect(selectedHero).toBe(expectedHero);
    });
  });
});
