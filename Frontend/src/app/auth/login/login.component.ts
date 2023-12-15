import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseAuthFormComponent } from 'src/app/shared/components/base/base-auth-form.component';
import { CustomValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseAuthFormComponent implements OnInit {
  override ngOnInit(): void {
    super.ngOnInit();
    this.initializeForm();
  }
  initializeForm() {
    this.formGroup = this._formBuilder.group({
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
  override onSubmit(): void {
      console.log(this.formGroup);
  }
}
