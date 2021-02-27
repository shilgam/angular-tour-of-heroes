/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
/* eslint-disable spaced-comment */
/* eslint-disable jasmine/no-unsafe-spy */
/* eslint-disable @typescript-eslint/no-use-before-define */

/* Tests can explore how the HeroDetailComponent responds to different
 * id parameter values by manipulating the ActivatedRoute injected
 * into the component's constructor. **/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import ActivatedRouteStub from 'src/testing/activated-route-stub';
import FakeHeroService from 'src/testing/fake-hero.service';
import HeroDetailComponent from './hero-detail.component';
import HeroService from '../hero.service';
import getTestHeroes from '../mock-heroes';
import Hero from '../hero';

let component: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;
const firstHero = getTestHeroes()[0];

describe('HeroDetailComponent: navigation', () => {
  let activatedRoute: ActivatedRouteStub;
  // let page: Page;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  beforeEach(async () => {
    const routerSpy = createRouterSpy();

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: HeroService, useClass: FakeHeroService },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;
    beforeEach(async () => {
      expectedHero = firstHero;

      activatedRoute.setParamMap({ id: expectedHero.id });
      await createComponent();
    });

    it("should display that hero's name", () => {
      expect(page.nameDisplay.textContent).toContain(expectedHero.name.toUpperCase());
    });

    // it('should navigate when click cancel', () => {
    //   click(page.cancelBtn);

    //   expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
    // });

    // it('should save when click save but not navigate immediately', () => {
    //   // Get service injected into component and spy on its`saveHero` method.
    //   // It delegates to fake `HeroService.updateHero` which delivers a safe test result.
    //   const hds = fixture.debugElement.injector.get(HeroService);
    //   const saveSpy = spyOn(hds, 'updateHero').and.callThrough();

    //   click(page.saveBtn);

    //   expect(saveSpy.calls.any()).toBe(true, 'HeroService.updateHero called');
    //   expect(page.navigateSpy.calls.any()).toBe(false, 'router.navigate not called');
    // });

    // it('should navigate when click save and save resolves', fakeAsync(() => {
    //   click(page.saveBtn);
    //   tick();

    //   expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
    // }));
  });

  // describe('when navigate with no hero id', () => {
  //   beforeEach(async () => {
  //     await createComponent();
  //   });

  //   it('should have hero.id === 0', () => {
  //     expect(component.hero.id).toBe(0);
  //   });

  //   it('should display empty hero name', () => {
  //     expect(page.nameDisplay.textContent).toBe('');
  //   });
  // });

  // describe('when navigate to non-existent hero id', () => {
  //   beforeEach(async () => {
  //     activatedRoute.setParamMap({ id: 99999 });
  //     await createComponent();
  //   });

  //   it('should try to navigate back to hero list', () => {
  //     expect(page.gotoListSpy.calls.any()).toBe(true, 'comp.gotoList called');
  //     expect(page.navigateSpy.calls.any()).toBe(true, 'router.navigate called');
  //   });
  // });
});

/// / query helpers ////
function createRouterSpy() {
  return jasmine.createSpyObj('Router', ['navigate']);
}

/////////// Helpers /////

/** Create the HeroDetailComponent, initialize it, set test variables  */

// SAME AS SOURCE
async function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  component = fixture.componentInstance;
  page = new Page(fixture);

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  await fixture.whenStable();
  // 2nd change detection displays the async-fetched hero
  fixture.detectChanges();
}

class Page {
  // getter properties wait to query the DOM until called.
  get buttons() {
    return this.queryAll<HTMLButtonElement>('button');
  }

  get saveBtn() {
    return this.buttons[1];
  }

  get cancelBtn() {
    return this.buttons[0];
  }

  get nameDisplay() {
    return this.query<HTMLElement>('h2');
  }

  get nameInput() {
    return this.query<HTMLInputElement>('input');
  }

  gotoListSpy: jasmine.Spy;

  navigateSpy: jasmine.Spy;

  constructor(someFixture: ComponentFixture<HeroDetailComponent>) {
    // get the navigate spy from the injected router spy object
    const routerSpy = someFixture.debugElement.injector.get(Router) as any;
    this.navigateSpy = routerSpy.navigate;

    // spy on component's `gotoList()` method
    // const someComponent = someFixture.componentInstance;
    // this.gotoListSpy = spyOn(someComponent, 'gotoList').and.callThrough();
  }

  //// query helpers ////
  private query<T>(selector: string): T {
    return fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return fixture.nativeElement.querySelectorAll(selector);
  }
}
