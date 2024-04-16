import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { take } from 'rxjs';
import { BaseAuthFormComponent } from 'src/app/shared/components/base/base-auth-form.component';
import { CustomValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseAuthFormComponent implements OnInit {
  isPending = false;
  serverErrorMessages: string[] = [];
  override ngOnInit(): void {
    this._authService.user$
      .pipe(take(1))
      .subscribe((user) => user && this._router.navigateByUrl('/'));
    super.ngOnInit();
    this.initializeForm();
  }
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
