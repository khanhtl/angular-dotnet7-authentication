import { FormGroup } from '@angular/forms';
export function matchValidator(
  firstControlName: string,
  secondControlName: string
) {
  return function (fg: FormGroup) {
    const firstValue = fg.get(firstControlName)?.value;
    const secondValue = fg.get(secondControlName)?.value;
    if (firstValue === secondValue) return null;
    fg.get(secondControlName)?.setErrors({
      valueNotMatch: {
        firstValue,
        secondValue,
      },
    });
    return {
      valueNotMatch: {
        firstValue,
        secondValue,
      },
    };
  };
}
