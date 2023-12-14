import { FormControl, AbstractControl } from '@angular/forms';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl;
  @Input() isSubmit=false;
  @HostBinding('class') class='invalid-feedback';

  get error() {
    if (this.control.errors  && (this.control.dirty || this.control.touched || this.isSubmit)) {
      return this.control.errors[Object.keys(this.control.errors)[0]]
    }
  }

}
