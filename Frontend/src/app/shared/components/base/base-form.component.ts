import { Directive, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { BaseComponent } from "./base.component";
@Directive({})
export class BaseFormComponent extends BaseComponent {
    protected readonly _authService = inject(AuthService);
    protected readonly _formBuilder=inject(FormBuilder);

    getErrors(formGroup: FormGroup, formControlName: string, formGroupName?: string): any|null|undefined {
        if (!formGroup.get(formControlName)?.touched) return null; 
        let errors;
        if (!formGroupName) errors=formGroup.get(formControlName)?.errors;
        else errors=formGroup.get(formGroupName)?.get(formControlName)?.errors;
        if (!errors) return null;
        var keys=Object.keys(errors);
        var error=errors[keys[0]];
        return error;
    }
}