import { Injectable, inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { AuthService } from '@/app/auth/data-access/auth.service';
import { Router } from '@angular/router';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = this._authService.getJwt();
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return next
      .handle(request)
      .pipe(catchError((err) => this.handleAuthError(err)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      this._router.navigateByUrl(`/auth/login`);
      localStorage.removeItem('user');
      return of(err.message);
    }
    return throwError(err);
  }
}
