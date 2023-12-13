import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'errMerssage',
  pure: true
})
export class GetErrorMessagePipe implements PipeTransform {
  transform(
    formGroup: FormGroup,
    formControlName: string,
    formGroupName?: string
  ): any {
    let err;
    if (formGroupName) {
      err=formGroup?.get(formGroupName)?.get(formControlName)?.errors;
    } else {
      err=formGroup?.get(formControlName)?.errors;
    }
    if (err) {
      let keys=Object.keys(err);
      if (keys.length) {
        return keys[0]
      }
    }
  }
}
