import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { heroesClone } from '../mock-heroes';
import { Hero } from '../hero';


async function setup() {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  const heroServiceStub: Partial<HeroService> = {
    getHeroes(): Observable<Hero[]> {
      return of(heroesClone());
    },
    addHero(hero: Hero): Observable<Hero> {
      return of({ name: hero.name, id: 30 });
    }
  };

  TestBed.configureTestingModule({
    imports: [ FormsModule, RouterTestingModule ],
    declarations: [ HeroesComponent, HeroDetailComponent ],
    providers: [
      {
      provide: HeroService, useValue: heroServiceStub
    }]
  });

  fixture = TestBed.createComponent(HeroesComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
  TestBed.inject(HeroService);

  return { component, fixture };
};

describe('HeroesComponent', async () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    ({ component, fixture } = await setup());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a hero', () => {
    expect(component.heroes).toBeDefined();
    expect(component.heroes.length).toEqual(10);
  });

  it('should have a list of heroes', () => {
    const heroes = fixture.debugElement.queryAll(By.css('.heroes > li'));
    heroesClone().forEach((hero, index) => {
      expect(heroes[index].nativeElement.textContent).toContain(hero.id);
      expect(heroes[index].nativeElement.textContent).toContain(hero.name);
    });
  });

  it('should have "heroes/:id"', () => {
    const heroes = fixture.debugElement.queryAll(By.css('.heroes > li > a'));
    heroes.forEach((hero, index) => {
      expect(heroes[index].nativeElement.getAttribute('href'))
        .toContain('detail');
    });
  });
});

describe('HeroesComponent: Add', async () => {
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    ({ fixture } = await setup());
  });

  it('input should accept new value', async () => {
    const nameInputBox = fixture.debugElement.query(By.css('input')).nativeElement;

    // simulate user entering a new name into the input box
    nameInputBox.value = 'Hercules';

    // Dispatch a DOM event so that Angular learns of input value change.
    // In older browsers, such as IE, you might need a CustomEvent instead. See
    // https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
    nameInputBox.dispatchEvent(new Event('input'));

    // Tell Angular to update the display binding through the title pipe
    fixture.detectChanges();

    // Assert that value entered in the input field
    expect(nameInputBox.value).toBe('Hercules');

    // click "add" button
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    addButton.click();

    // Assert that the new hero is displayed in the list
    fixture.detectChanges();
    const heroesList = fixture.debugElement.query(By.css('.heroes')).nativeElement;
    expect(heroesList.textContent).toContain('Hercules');
  });
});
