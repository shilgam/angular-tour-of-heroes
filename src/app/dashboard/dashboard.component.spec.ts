/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { click } from 'src/utils';
import { Router } from '@angular/router';
import { defer } from 'rxjs';
import { By } from '@angular/platform-browser';
import DashboardComponent from './dashboard.component';
import DashboardHeroComponent from '../dashboard-hero/dashboard-hero.component';
import HeroService from '../hero.service';
import heroesClone from '../mock-heroes';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

////////  Deep  ////////////////

let comp: DashboardComponent;
let fixture: ComponentFixture<DashboardComponent>;

describe('DashboardComponent (deep)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, DashboardHeroComponent]
    }).compileComponents();
  });

  compileAndCreate();

  tests(clickForDeep);

  function clickForDeep() {
    /** get first <div class="hero"> */
    const heroEl: HTMLElement = fixture.nativeElement.querySelector('.hero');
    click(heroEl);
  }
});

//////////  Shallow ////////////////

describe('DashboardComponent(shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, DashboardHeroComponent]
    });
  });

  compileAndCreate();

  tests(clickForShallow);

  function clickForShallow() {
    /** get first <dashboard-hero> DebugElement */
    const heroDe = fixture.debugElement.query(By.css('dashboard-hero'));
    heroDe.triggerEventHandler('selected', comp.heroes[0]);
  }
});

/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHeroes']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);

    comp = fixture.componentInstance;

    /** getHeroes spy returns observable of test heroes */
    heroServiceSpy.getHeroes.and.returnValue(asyncData(heroesClone()));
  });
}

/**
 * The (almost) same tests for both ('Deep' and 'Shallow')
 * Only change: the way that the first hero is clicked
 */
function tests(heroClick: () => void) {
  it('should NOT have heroes before ngOnInit', () => {
    expect(comp.heroes.length).toBe(0, 'should not have heroes before ngOnInit');
  });

  it('should NOT have heroes immediately after ngOnInit', () => {
    fixture.detectChanges(); /** runs initial lifecycle hooks */

    expect(comp.heroes.length).toBe(0, 'should not have heroes until service promise resolves');
  });

  describe('after get dashboard heroes', () => {
    let router: Router;

    /** Trigger component so it gets heroes and binds to them */
    beforeEach(async () => {
      router = fixture.debugElement.injector.get(Router);
      fixture.detectChanges(); /** runs ngOnInit -> getHeroes */
      await fixture.whenStable();
      fixture.detectChanges(); /** bind to heroes */
    });

    it('should HAVE heroes', () => {
      expect(comp.heroes.length).toBeGreaterThan(
        0,
        'should have heroes after service promise resolves'
      );
    });

    it('should DISPLAY heroes', () => {
      /** Find and examine the displayed heroes */
      /** Look for them in the DOM by css class */
      const heroes = fixture.nativeElement.querySelectorAll('dashboard-hero');

      expect(heroes.length).toBe(4, 'should display 4 heroes');
    });

    it('should tell ROUTER to navigate when hero clicked', () => {
      heroClick(); /** trigger click on first inner <div class="hero"> */

      /** args passed to router.navigateByUrl() spy */
      const spy = router.navigateByUrl as jasmine.Spy;
      const navArgs = spy.calls.first().args[0];

      /** expecting to navigate to id of the component's first hero */
      const { id } = comp.heroes[0];

      expect(navArgs).toBe(`/detail/${id}`, 'should nav to HeroDetail for first hero');
    });
  });
}

/**
 * Create async observable that emits-once and completes
 * after a JS engine turn
 */

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
