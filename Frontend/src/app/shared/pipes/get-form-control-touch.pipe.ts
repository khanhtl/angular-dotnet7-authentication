import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'touched',
  pure: false
})
export class GetFormControlTouchPipe implements PipeTransform {
  transform(
    formGroup: FormGroup,
    formControlName: string,
    formGroupName?: string
  ): any {
    if (formGroupName) {
      return formGroup?.get(formGroupName)?.get(formControlName)?.touched;
    }
    return formGroup?.get(formControlName)?.touched;
  }
}
