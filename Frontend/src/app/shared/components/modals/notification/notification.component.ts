import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  bsModalRef = inject(BsModalRef);
  isSuccess: boolean = true;
  title: string = '';
  message: string = '';
}
