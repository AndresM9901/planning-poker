import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  static noLeadingTrailingSpaces(control: AbstractControl): ValidationErrors | null {
    if(control.value && control.value.trimStart() !== control.value) {
      return { noLeadingTrailingSpaces: true };
    }
    return null;
  }

  static noTrailingSpaces(control: AbstractControl): ValidationErrors | null {
    if(control.value && control.value.trimEnd() !== control.value) {
      return { noTrailingSpaces: true };
    }
    return null;
  }

  static noConsecutiveSpaces(control: AbstractControl): ValidationErrors | null {
    if(control.value && control.value !== control.value.replace(/\s{2,}/g, '')) {
      return { noConsecutiveSpaces: true };
    }
    return null;
  }

  static maxThreeNumbers(control: AbstractControl): ValidationErrors | null {
    const maxNumbers = 3;
    if (control.value) {
      const numbers = (control.value.match(/\d/g) || []).length;
      if (numbers > maxNumbers) {
        return { maxThreeNumbers: true };
      }
    }
    return null;
  }

  static noOnlyNumbers(control: AbstractControl): ValidationErrors | null {
    if(control.value && /^\d+$/.test(control.value)) {
      return { noOnlyNumbers: true };
    }
    return null;
  }

  static noStartWithNumber(control: AbstractControl): ValidationErrors | null {
    if(control.value && /^\d/.test(control.value)) {
      return { noStartWithNumber: true };
    }
    return null;
  }
}
