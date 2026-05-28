import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {
  static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      return { notOnlyWhiteSpace: true };
    }
    return null;
  }

  static uniqueValidator(names: string[], oldName?: string): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      console.log(
        'Validating unique value: ',
        control.value,
        ' against names: ',
        names,
        ' oldName: ',
        oldName,
      );
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
