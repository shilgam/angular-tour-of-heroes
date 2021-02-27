/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */

/* src: https://indepth.dev/posts/1283/testing-routed-angular-components-with-the-routertestingmodule */

import { ActivatedRouteSnapshot, convertToParamMap, ParamMap, Params } from '@angular/router';
import { ReplaySubject } from 'rxjs';

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export default class ActivatedRouteStub {
  private _paramMap: ParamMap;

  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();

  paramMap = this.subject.asObservable();

  get snapshot(): ActivatedRouteSnapshot {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      paramMap: this._paramMap
    };

    return snapshot as ActivatedRouteSnapshot;
  }

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  setParamMap(params?: Params): void {
    const paramMap = convertToParamMap(params);
    this._paramMap = paramMap;
    this.subject.next(paramMap);
  }
}
