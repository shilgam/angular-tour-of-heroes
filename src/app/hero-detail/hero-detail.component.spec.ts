import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import HeroDetailComponent from './hero-detail.component';
import HeroService from '../hero.service';
import heroesClone from '../mock-heroes';
import Hero from '../hero';

async function setup() {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let hostDE: any;

  const heroServiceStub: Partial<HeroService> = {
    getHero(id: number): Observable<Hero> {
      return of(heroesClone().find((hero) => hero.id === id));
    }
  };

  await TestBed.configureTestingModule({
    imports: [FormsModule, RouterTestingModule],
    declarations: [HeroDetailComponent],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: convertToParamMap({ id: 20 }) } }
      },
      {
        provide: HeroService,
        useValue: heroServiceStub
      }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(HeroDetailComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  hostDE = fixture.debugElement.nativeElement;
  TestBed.inject(HeroService);

  return { component, fixture, hostDE };
}

describe('HeroDetailComponent', () => {
  const expectedHero: Hero = { id: 20, name: 'Tornado' };
  let buttons;

  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let hostDE: any;

  beforeEach(async () => {
    ({ component, fixture, hostDE } = await setup());
    buttons = fixture.debugElement.queryAll(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title ${expectedHero.name} Details`, () => {
    expect(hostDE.querySelector('h2').textContent).toEqual(
      `${expectedHero.name.toUpperCase()} Details`
    );
  });

  it(`should have id ${expectedHero.id}`, async () => {
    expect(hostDE.querySelector('div > div:nth-child(2)').textContent).toEqual(
      `id: ${expectedHero.id}`
    );
  });

  it(`should have text '${expectedHero.name}' in the input`, async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(inputBox.value).toEqual(expectedHero.name);
  });

  it('should have go back button', () => {
    expect(buttons[0].nativeElement.textContent).toEqual('go back');
  });

  it('should have save button', () => {
    expect(buttons[1].nativeElement.textContent).toEqual('save');
  });
});

describe('HeroDetailComponent: Update', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let hostDE: any;

  beforeEach(async () => {
    ({ fixture, hostDE } = await setup());
  });

  it('input should accept new value', async () => {
    const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;

    fixture.detectChanges();
    await fixture.whenStable();

    expect(inputBox.value).toBe('Tornado');

    // simulate user entering a new name into the input box
    inputBox.value = 'Tornado Updated';

    // Dispatch a DOM event so that Angular learns of input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    inputBox.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    expect(inputBox.value).toBe('Tornado Updated');
    expect(hostDE.querySelector('h2').textContent).toEqual('TORNADO UPDATED Details');
  });
});
