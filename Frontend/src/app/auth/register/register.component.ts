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
      firstName: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.minLength(2),
          CustomValidators.maxLength(20),
        ]),
      ],
      lastName: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.minLength(2),
          CustomValidators.maxLength(20),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.email(),
        ]),
      ],
      passwords: this._formBuilder.group(
        {
          password: [
            '',
            Validators.compose([
              CustomValidators.required(),
              CustomValidators.password(),
            ]),
          ],
          confirmPassword: [''],
        },
        {
          validator: CustomValidators.matchPassword(
            'password',
            'confirmPassword'
          ),
        }
      ),
    });
  }

  override onSubmit(): void {
    const registerDto=structuredClone(this.formGroup.value);
    const { password }=registerDto.passwords;
    registerDto.password=password;
    delete registerDto.passwords;
    this._authService.register(registerDto).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    })
  }
}
