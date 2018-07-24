import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";

@Directive({
  selector: '[compare]',
  providers: [{provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true}]
})
export class CompareValidatorDirective implements Validator{
  @Input('compare') controlNameToCompare: string;

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const controlToCompare = control.root.get(this.controlNameToCompare);

    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      })
    }
    return controlToCompare && controlToCompare.value !== control.value ? {'compare': true} : null
  }
}
