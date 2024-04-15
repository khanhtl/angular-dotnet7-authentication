import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseAuthFormComponent } from 'src/app/shared/components/base/base-auth-form.component';
import { CustomValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseAuthFormComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeForm();
  }
  isPending = false;
  serverErrorMessages: string[] = [];
  initializeForm() {
    this.formGroup = this._formBuilder.group({
      Email: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.email(),
        ]),
      ],
      Password: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.password(),
        ]),
      ],
    });
  }

  override onSubmit(): void {
    this.isPending = true;
    this._authService.login(this.formGroup.value).subscribe(
      (res) => {
        this.isPending = false;
        if (res.Success) {
          this._router.navigateByUrl('/');
          return;
        }
        if (res.Errors.length) {
          res.Errors.forEach((error) => {
            const formControl = this.formGroup.get(error.Field);
            if (formControl) {
              formControl.setErrors({
                serverValidateError: {
                  errorMessage: '',
                },
              });
            }

            this.serverErrorMessages = Array.from(
              new Set([...res.Errors.map((err) => err.ErrorMessage)])
            );
          });
          this._cdr.detectChanges();
          return;
        }
      },
      (error) => (this.isPending = false)
    );
  }
}
