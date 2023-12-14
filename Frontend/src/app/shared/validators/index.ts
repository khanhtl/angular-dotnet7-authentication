import { EMAIL_PATTERN, PASSWORD_PATTERN } from './../constants/pattern-const';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
export class CustomValidators {
  static required(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlVal = control.value?.toString();
      let isWhitespace = (controlVal || '').trim().length === 0;
      let isValid = !isWhitespace;
      return isValid
        ? null
        : {
            required: {
              errorMessage: 'ERROR_MESSAGES.REQUIRED',
            },
          };
    };
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlVal = control.value?.toString();
      let valueLength = (controlVal || '').trim().length;
      if (!valueLength) return null;
      let isValid = valueLength >= minLength;
      return isValid
        ? null
        : {
            minlength: {
              requiredLength: minLength,
              actualLength: valueLength,
              errorMessage: 'ERROR_MESSAGES.MIN_LENGTH',
            },
          };
    };
  }
  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlVal = control.value?.toString();
      let valueLength = (controlVal || '').trim().length;
      if (!valueLength) return null;
      let isValid = valueLength <= maxLength;
      return isValid
        ? null
        : {
            maxlength: {
              requiredLength: maxLength,
              actualLength: valueLength,
              errorMessage: 'ERROR_MESSAGES.MAX_LENGTH',
            },
          };
    };
  }

  static email(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlVal = control.value?.toString();
      let isWhitespace = (controlVal || '').trim().length === 0;
      if (isWhitespace) return null;
      let isValid = RegExp(EMAIL_PATTERN).test(controlVal);
      return isValid
        ? null
        : {
            email: {
              pattern: String(EMAIL_PATTERN),
              value: controlVal,
              errorMessage: 'ERROR_MESSAGES.EMAIL',
            },
          };
    };
  }
  static password(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let controlVal = control.value?.toString();
      let isWhitespace = (controlVal || '').trim().length === 0;
      if (isWhitespace) return null;
      let isValid = controlVal.length >= 8;
      return isValid
        ? null
        : {
            password: {
              value: controlVal,
              errorMessage: 'ERROR_MESSAGES.PASSWORD',
            },
          };
    };
  }
  static matchPassword(firstControlName: string, secondControlName: string) {
    return this.match(
      firstControlName,
      secondControlName,
      'ERROR_MESSAGES.PASSWORD_NOT_MATCH'
    );
  }
  static match(
    firstControlName: string,
    secondControlName: string,
    errorMessage?: string
  ) {
    return function (fg: FormGroup) {
      const firstValue = fg.get(firstControlName)?.value;
      const secondValue = fg.get(secondControlName)?.value;
      if (firstValue === secondValue) return null;
      fg.get(secondControlName)?.setErrors({
        valueNotMatch: {
          firstValue,
          secondValue,
          errorMessage: errorMessage || 'ERROR_MESSAGES.NOT_MATCH',
        },
      });
      return {
        valueNotMatch: {
          firstValue,
          secondValue,
          errorMessage: errorMessage || 'ERROR_MESSAGES.NOT_MATCH',
        },
      };
    };
  }
}
