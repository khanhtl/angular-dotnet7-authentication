import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseFormComponent } from 'src/app/shared/components/base/base-form.component';
import { CustomValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  loginForm: FormGroup=new FormGroup({});
  isShowPassword=false;
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this._formBuilder.group({
      email: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.email(),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          CustomValidators.required(),
          CustomValidators.password(),
        ]),
      ],
    });
  }
  submitForm() {
    console.log(this.loginForm);
  }
}
