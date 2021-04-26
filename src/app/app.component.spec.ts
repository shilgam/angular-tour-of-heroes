/* eslint-disable jasmine/no-global-setup */
/* eslint-disable spaced-comment */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-use-before-define */

/* Techniques for Shallow Component Testing
 * https://angular.io/guide/testing-components-scenarios#component-binding */

import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import RouterLinkDirectiveStub from 'src/testing/router-link-directive-stub';
import { click } from 'src/utils';
import AppComponent from './app.component';

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

//////// Testing by stubbing unneeded components //////
@Component({ selector: 'app-messages', template: '' })
class MessagesComponent {}

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

describe('AppComponent & TestModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, // comp under test
        RouterLinkDirectiveStub, // stub to test links
        MessagesComponent, // stub
        RouterOutletStubComponent // stub
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  tests();
});

//////// Testing w/ NO_ERRORS_SCHEMA //////
describe('AppComponent & NO_ERRORS_SCHEMA', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, // comp under test
        RouterLinkDirectiveStub // stub to test links
      ],
      schemas: [NO_ERRORS_SCHEMA] // tells compiler to ignore unrecognized elements and attrs
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  tests();
});

function tests() {
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(() => {
    fixture.detectChanges(); // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map((de) => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title "Tour of Heroes"', () => {
    expect(component.title).toEqual('Tour of Heroes');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('h1');

    expect(h1.textContent).toContain('Tour of Heroes');
  });

  it('can instantiate the component', () => {
    expect(component).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(5, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/dashboard');
    expect(routerLinks[1].linkParams).toBe('/heroes');
  });

  it('can click Heroes link in template', () => {
    const heroesLinkDe = linkDes[1]; // heroes link DebugElement
    const heroesLink = routerLinks[1]; // heroes link directive

    expect(heroesLink.navigatedTo).toBeNull('should not have navigated yet');

    // heroesLinkDe.triggerEventHandler('click', { button: 0 });
    click(heroesLinkDe.nativeElement);
    /* The 'click' test in this example is misleading.
     * It tests the RouterLinkDirectiveStub rather than the component.
     */

    expect(heroesLink.navigatedTo).toBe('/heroes');
    /* Whether the router is configured properly to navigate with that
     * route definition is a question for a separate set of tests.
     */
  });
}
