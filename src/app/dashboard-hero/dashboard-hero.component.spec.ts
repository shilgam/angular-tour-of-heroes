/* eslint-disable spaced-comment */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { click } from 'src/utils';
import { Component } from '@angular/core';
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
    let selectedHero: Hero;
    beforeEach(() => {
      component.selected.subscribe((hero: Hero) => {
        selectedHero = hero;
      });
    });

    /* option #1 */
    it('should raise selected event (triggerEventHandler)', () => {
      heroDe.triggerEventHandler('click', null);

      expect(selectedHero).toBe(expectedHero);
    });

    /* option #2 */
    it('should raise selected event (element.click)', () => {
      heroEl.click();

      expect(selectedHero).toBe(expectedHero);
    });

    /* option #3: using helper function */
    it('should raise selected event (w/ helper function)', () => {
      click(heroEl); /* or click(heroDe) */

      expect(selectedHero).toBe(expectedHero);
    });
  });
});

/////////////////////////////////
////// Test Host Component //////
@Component({
  template: '<dashboard-hero [hero]="hero" (selected)="onSelected($event)"> </dashboard-hero>'
})
class TestHostComponent {
  hero: Hero = { id: 42, name: 'Hero Name' };

  selectedHero: Hero;

  onSelected(hero: Hero) {
    this.selectedHero = hero;
  }
}

describe('DashboardHeroComponent when inside a test host', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let heroEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      /** declares both the DashboardHeroComponent and the TestHostComponent */
      declarations: [DashboardHeroComponent, TestHostComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    /* create TestHostComponent instead of DashboardHeroComponent */
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    heroEl = fixture.nativeElement.querySelector('.hero');
    fixture.detectChanges();
  });

  it('should display hero name', () => {
    const expectedPipedName = testHost.hero.name.toUpperCase();

    expect(heroEl.textContent).toContain(expectedPipedName);
  });

  it('should raise selected event when clicked', () => {
    click(heroEl);

    // selected hero should be the same data bound hero
    expect(testHost.selectedHero).toBe(testHost.hero);
  });
});
