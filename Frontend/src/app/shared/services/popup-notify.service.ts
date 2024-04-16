import { Injectable, inject } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NotificationComponent } from '../components/modals/notification/notification.component';
@Injectable({
  providedIn: 'root',
})
export class PopupNotifyService {
  bsModalRef?: BsModalRef;
  private _bsModalService = inject(BsModalService);
  show(title: string, message: string, isSuccess = true) {
    const state: ModalOptions = {
      initialState: {
        isSuccess,
        title,
        message,
      },
    };
    this.bsModalRef = this._bsModalService.show(NotificationComponent, state);
  }
}
