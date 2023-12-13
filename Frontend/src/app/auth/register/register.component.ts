import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from './../../shared/constants/pattern-const';
import { CustomValidators } from '../../shared/validators';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder=inject(FormBuilder);
  
  registerForm: FormGroup=new FormGroup({});
  submitted = false;
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
  }

  submitForm() {
    console.log(this.registerForm);
  }

}
