/* globals Ember */

import Rx from "rxjs";
import buildKey from "../utils/internal-key";

/**
  Creates a property that accepts Rx.Observables
  and returns a single observable that represents the latest observable
  passed.

  This can be used for any input to a component that is an observable.

  @method observable
  @return Ember.ComputedProperty
*/

export default function observable() {
  return Ember.computed({
    get(key) {
      let backingField = buildKey(key);
      if(!this[backingField]) {
        this[backingField] = new Rx.BehaviorSubject(Rx.Observable.empty());
      }
      return this[backingField]['switch']();
    },
    set(key, value) {
      let backingField = buildKey(key);
      if(!this[backingField]) {
        this[backingField] = new Rx.BehaviorSubject(Rx.Observable.empty());
      }
      var next = value && value instanceof Rx.Observable ? value : Rx.Observable.empty();
      this[backingField].onNext(next);
    }
  })
}
