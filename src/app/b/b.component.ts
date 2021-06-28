/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { AComponent } from '../a/a.component';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {
  @Input('text') text;

  constructor(private parent: AComponent) {}

  ngOnInit(): void {
    /**
     * What happens if you update the parent props from the child component properties
     * after the synchronization operation has been performed?
     * Right, you’re left with the unstable tree and the consequences of such state is not possible
     * to predict.
     * **Most of the times you will end up with an incorrect information shown
     * on the page to the user.**
     * And this will be very difficult to debug.
     */
    this.parent.text = 'updated text';
    // this.parent.name = 'updated name';
  }
}

/**

URL: https://indepth.dev/posts/1001/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error

1. update bound properties for all child components/directives
    - check A component:

        - `text`= 'A message for the child component';
    - check B component
        - `name`= 'I am A component';
        - `text`= 'A message for the child component';
    -  Store this values on the view
       - view.oldValues[0] = 'A message for the child component';

2. call `ngOnInit`, `OnChanges` and `ngDoCheck` lifecycle hooks on all child components/directives
    - ...
        - evaluate the expression:
          `{{name}} = 'I am A component'`
3. update DOM for the current component
    - update the DOM with {{name}} value and put the evaluated value to the oldValues:
      `view.oldValues[1] = 'I am A component';`
4. run change detection for a child component:
    - Run the same check for the child B component
    - // Current digest loop is finished

5. call `ngAfterViewInit` lifecycle hook for all child components/directives

In development mode:
- Runs the second digest performing verification operations (5 steps listed above)

- Somehow, the property `text` was updated on the A component:
  `text = 'A message in the child component'`

- Runs the verification digest:
    - check that the prop `text` is not changed

      `AComponentView.instance.text === view.oldValues[0];` // false
      // 'A message for the child component' === 'updated text'; // false
      // Throw ExpressionChangedAfterItHasBeenCheckedError

    - check that the prop `name` is not changed

      AComponentView.instance.name === view.oldValues[1]; // false
      // 'I am A component' === 'updated name'; // false
      // Throw ExpressionChangedAfterItHasBeenCheckedError
 */
