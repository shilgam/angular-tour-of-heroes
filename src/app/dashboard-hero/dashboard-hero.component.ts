/* eslint-disable object-curly-newline */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import Hero from '../hero';

@Component({
  selector: 'dashboard-hero',
  templateUrl: './dashboard-hero.component.html',
  styleUrls: ['./dashboard-hero.component.css']
})
export default class DashboardHeroComponent {
  @Input() hero: Hero;

  @Output() selected = new EventEmitter<Hero>();

  click(): void {
    this.selected.emit(this.hero);
  }
}
