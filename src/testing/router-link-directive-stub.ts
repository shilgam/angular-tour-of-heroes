import { Directive, Input, HostListener } from '@angular/core';

/* Replaces the real directive with an alternative version
 * designed to validate the kind of anchor tag wiring seen
 * in the AppComponent template.
 */
@Directive({
  selector: '[routerLink]'
})
export default class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;

  navigatedTo = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}
