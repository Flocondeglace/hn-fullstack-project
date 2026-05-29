import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return { notOnlyWhiteSpace: true };
    }
    return null;
  }

  // Check if current control value is unique (not in names) and is not the previous value (oldName) in case of update
  static uniqueValidator(names: string[], oldName?: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      if (
        control.value != null &&
        control.value != oldName &&
        names.includes(control.value.trim())
      ) {
        return { unique: true };
      }
      return null;
    };
  }
}
