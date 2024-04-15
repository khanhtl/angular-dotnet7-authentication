import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private _authService = inject(AuthService);
  user$ = this._authService.user$;

  onLogoutBtnClick() {
    this._authService.logout();
  }
}
