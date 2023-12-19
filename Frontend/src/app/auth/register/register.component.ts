import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators';
import { BaseAuthFormComponent } from 'src/app/shared/components/base/base-auth-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent extends BaseAuthFormComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeForm();
  }

  initializeForm() {
    this.formGroup = this._formBuilder.group({
      FirstName: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.minLength(2),
          CustomValidators.maxLength(20),
        ]),
      ],
      LastName: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.minLength(2),
          CustomValidators.maxLength(20),
        ]),
      ],
      Email: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.email(),
        ]),
      ],
      Passwords: this._formBuilder.group(
        {
          Password: [
            '',
            Validators.compose([
              CustomValidators.required(),
              CustomValidators.password(),
            ]),
          ],
          ConfirmPassword: [''],
        },
        {
          validator: CustomValidators.matchPassword(
            'Password',
            'ConfirmPassword'
          ),
        }
      ),
    });
  }

  override onSubmit(): void {
    const registerDto=structuredClone(this.formGroup.value);
    const { Password }=registerDto.Passwords;
    registerDto.Password=Password;
    delete registerDto.Passwords;
    this._authService.register(registerDto).subscribe(res => {
      console.log(res.Errors);

      if (res.Success) {
        this._router.navigateByUrl("/auth/login");
        return;
      }
      if (res.Errors.length) {
        res.Errors.forEach(error => {
          const formControl=this.formGroup.get(error.Field);
          if (formControl) {
            formControl.setErrors({
              serverValidateError: {
                errorMessage: error.ErrorMessage,
              },
            }) 
          }
        });
        this._cdr.detectChanges();
        return;
      }
    })
  }
}
