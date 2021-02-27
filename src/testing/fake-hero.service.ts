/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-assign */
import { Injectable } from '@angular/core';

import { defer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Hero from 'src/app/hero';
import HeroService from 'src/app/hero.service';
import getTestHeroes from 'src/app/mock-heroes';

@Injectable()
/**
 * FakeHeroService pretends to make real http requests.
 * implements only as much of HeroService as is actually consumed by the app
 */
export default class FakeHeroService extends HeroService {
  constructor() {
    super(null, null);
  }

  heroes = getTestHeroes();

  lastResult: Observable<any>; // result from last method call

  addHero(hero: Hero): Observable<Hero> {
    throw new Error('Method not implemented.');
  }

  deleteHero(hero: number | Hero): Observable<Hero> {
    throw new Error('Method not implemented.');
  }

  getHeroes(): Observable<Hero[]> {
    return (this.lastResult = asyncData(this.heroes));
  }

  getHero(id: number | string): Observable<Hero> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    const hero = this.heroes.find((h) => h.id === id);
    return (this.lastResult = asyncData(hero));
  }

  updateHero(hero: Hero): Observable<Hero> {
    return (this.lastResult = this.getHero(hero.id).pipe(
      map((h) => {
        if (h) {
          return Object.assign(h, hero);
        }
        throw new Error(`Hero ${hero.id} not found`);
      })
    ));
  }
}

/** this is duplication: IS */
function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}
