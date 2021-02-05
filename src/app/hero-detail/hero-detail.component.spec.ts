import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let compiled: any;
  let heroService: any;
  let heroServiceStub: Partial<HeroService> = {
    getHero(id: number): Observable<Hero> {
      return of(HEROES.find(hero => hero.id === id));
    }
  };

  describe('main', () => {
    const expectedHero: Hero = { id: 20, name: 'Tornado' };
    let buttons;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ FormsModule, RouterTestingModule ],
        declarations: [ HeroDetailComponent ],
        providers: [
          {
            provide: ActivatedRoute, useValue:
              { snapshot: { paramMap: convertToParamMap( { id: 20 } ) } }
          },
          {
            provide: HeroService,
            useValue: heroServiceStub
          }
        ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HeroDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      heroService = TestBed.inject(HeroService);
      buttons = fixture.debugElement.queryAll(By.css('button'));
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it(`should have title ${expectedHero.name} Details`, () => {
      expect(compiled.querySelector('h2').textContent)
        .toEqual(`${(expectedHero.name).toUpperCase()} Details`);
    });

    it(`should have id ${expectedHero.id}`, async () => {
      expect(compiled.querySelector('div > div:nth-child(2)').textContent)
        .toEqual(`id: ${expectedHero.id}`);
    });

    it(`should have text '${expectedHero.name}' in the input`, async () => {
      fixture.detectChanges();
      await fixture.whenStable();

      const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputBox.value).toEqual(expectedHero.name);
    });

    it(`should have go back button`, () => {
      expect(buttons[0].nativeElement.textContent).toEqual('go back');
    });

    it(`should have save button`, () => {
      expect(buttons[1].nativeElement.textContent).toEqual('save');
    });
  })

  describe('HeroDetailComponent: input', () => {

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ FormsModule, RouterTestingModule ],
        declarations: [ HeroDetailComponent ],
        providers: [
          {
            provide: ActivatedRoute, useValue:
              { snapshot: { paramMap: convertToParamMap( { id: 19 } ) } }
          },
          {
            provide: HeroService,
            useValue: heroServiceStub
          }
        ]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HeroDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
      heroService = TestBed.inject(HeroService);
    });

    it('input should accept new value', async () => {
      const inputBox = fixture.debugElement.query(By.css('input')).nativeElement;
      inputBox.value = 'Foo';
      inputBox.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(inputBox.value).toBe('Foo');
      expect(compiled.querySelector('h2').textContent)
        .toEqual(`FOO Details`);
    });
  });
});
