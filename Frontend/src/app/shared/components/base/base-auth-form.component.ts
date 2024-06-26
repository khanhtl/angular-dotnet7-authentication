import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@/app/auth/data-access/auth.service';
import { BaseComponent } from './base.component';
import { Subject, filter, startWith, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';
@Directive({})
export class BaseAuthFormComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  protected readonly _router = inject(Router);
  protected readonly _authService = inject(AuthService);
  protected readonly _formBuilder = inject(FormBuilder);
  protected readonly submitSubject$ = new Subject<void>();

  protected formGroup: FormGroup = new FormGroup({});
  isShowPassword = false;
  isShowConfirmPassword = false;
  ngOnInit(): void {
    this.submitSubject$
      .pipe(
        tap(() => {
          this.formGroup.markAsDirty();
          this.formGroup.markAllAsTouched();
        }),
        switchMap(() =>
          this.formGroup.statusChanges.pipe(
            startWith(this.formGroup.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID'),
        tap(() => this.onSubmit())
      )
      .subscribe();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.submitSubject$.complete();
  }

  protected onSubmit() {}

  protected submitForm() {
    this.submitSubject$.next();
  }
}
