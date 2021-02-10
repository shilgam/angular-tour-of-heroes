import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let compiled: any;
  let heroService: any;
  let heroServiceStub: Partial<HeroService>;

  heroServiceStub = {
    getHeroes(): Observable<Hero[]> {
      return of(HEROES);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ HeroesComponent, HeroDetailComponent ],
      providers: [{
        provide: HeroService,
        useValue: heroServiceStub
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    heroService = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a hero`, () => {
    expect(component.heroes).toBeDefined();
    expect(component.heroes.length).toEqual(10);
  });

  it('should have a list of heroes', () => {
    const heroes = fixture.debugElement.queryAll(By.css('.heroes > li'));
    HEROES.forEach((hero, index) => {
      expect(heroes[index].nativeElement.textContent).toContain(hero.id);
      expect(heroes[index].nativeElement.textContent).toContain(hero.name);
    });
  });

  it(`should have 'heroes/:id'`, () => {
    const heroes = fixture.debugElement.queryAll(By.css('.heroes > li > a'));
    HEROES.forEach((hero, index) => {
      expect(heroes[index].nativeElement.getAttribute('href'))
        .toContain(`detail`);
    });
  });
});
