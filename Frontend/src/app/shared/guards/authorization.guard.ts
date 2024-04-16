import { AuthService } from '@/app/auth/data-access/auth.service';
import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { PopupNotifyService } from '../services/popup-notify.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationGuard implements CanActivate {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _popupNotifyService = inject(PopupNotifyService);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._authService.user$.pipe(
      map((user) => {
        if (user) {
          return true;
        }
        this._popupNotifyService.show(
          'Warning',
          'Restricted area, leave imediately!',
          false
        );
        this._router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
