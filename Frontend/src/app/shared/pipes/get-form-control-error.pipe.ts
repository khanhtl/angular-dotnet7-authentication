import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'err',
  pure: false
})
export class GetFormControlErrorPipe implements PipeTransform {
  transform(
    formGroup: FormGroup,
    formControlName: string,
    formGroupName?: string
  ): any {
    if (formGroupName) {
      return formGroup?.get(formGroupName)?.get(formControlName)?.errors;
    }
    return formGroup?.get(formControlName)?.errors;
  }
}
