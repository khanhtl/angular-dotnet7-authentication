import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetFormControlErrorPipe } from './pipes/get-form-control-error.pipe';
import { GetErrorMessagePipe } from './pipes/get-error-message.pipe';
import { GetFormControlTouchPipe } from './pipes/get-form-control-touch.pipe';

@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    GetFormControlErrorPipe,
    GetErrorMessagePipe,
    GetFormControlTouchPipe,
  ],

  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslateModule],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    GetFormControlErrorPipe,
    GetErrorMessagePipe,
    TranslateModule,
    GetFormControlTouchPipe,
  ],
})
export class SharedModule {}
