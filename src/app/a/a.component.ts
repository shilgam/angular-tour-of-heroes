/* eslint-disable import/prefer-default-export */
import { Component } from '@angular/core';

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.css']
})
export class AComponent {
  name = 'I am A component';

  text = 'A message for the child component';

  /** // Dirty hack #2
   *  // Force another change detection cycle for the parent A component
   *  // between the first one and the verification phase
   *
   * constructor(private cd: ChangeDetectorRef) {}
   *
   * ngAfterViewInit(): void {
   *   this.cd.detectChanges();
   * }
   */
}
