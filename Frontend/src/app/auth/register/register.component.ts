import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../shared/validators';
import { BaseFormComponent } from './../../shared/components/base/base-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends BaseFormComponent implements OnInit {
  
  registerForm: FormGroup=new FormGroup({});
  controls=this.registerForm.controls;
  submitted = false;
  isShowPassword = false;
  isShowConfirmPassword = false;
  errorMessages: string[]=[];
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this._formBuilder.group({
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
          confirmPassword: [
            '',
          ],
        },
        { validator: CustomValidators.matchPassword('password', 'confirmPassword') }
      ),
    });
    this.controls=this.registerForm.controls;
  }

  submitForm() {
    console.log(this.registerForm);
  }

  controlErrors(formControlName: string, formGroupName?: string) {
    console.log('controlErrors');
    
    return this.getErrors(this.registerForm, formControlName, formGroupName);
  }
}
