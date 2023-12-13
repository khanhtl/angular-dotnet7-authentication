import { inject } from "@angular/core";
import { AbstractControl, ValidatorFn } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core'
export function requiredValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let controlVal=control.value?.toString();
      let isWhitespace = (controlVal || '').trim().length === 0;
      let isValid = !isWhitespace;
        return isValid? null:
        {
                required: true,
            errorMessage: inject(TranslateService).instant('REQUIRED')
        };
    };
  }