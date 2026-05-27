import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return { notOnlyWhiteSpace: true };
    }
    return null;
  }

  static uniqueTypeNameValidator(names: string[]): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      if (control.value != null && names.includes(control.value.trim())) {
        return { uniqueTypeName: true };
      }
      return null;
    };
  }
}
