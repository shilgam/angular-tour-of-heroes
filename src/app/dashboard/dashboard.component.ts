import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Hero from '../hero';
import HeroService from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export default class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private router: Router, private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe((heroes) => {
      this.heroes = heroes.slice(1, 5);
    });
  }

  gotoDetail(hero: Hero): void {
    const url = `/detail/${hero.id}`;
    this.router.navigateByUrl(url);
  }

  get title(): string {
    const cnt = this.heroes.length;
    if (cnt === 0) {
      return 'No Heroes';
    }
    return cnt === 1 ? 'Top Hero' : `Top ${cnt} Heroes`;
  }
}
