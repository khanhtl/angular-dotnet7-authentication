import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDto, RegisterDto } from '@shared/dtos';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/User';
import { ServiceResponse } from './../shared/models/ServiceResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _loginUser = localStorage.getItem('user');
  private _userSource = new BehaviorSubject<User | null>(
    this._loginUser ? JSON.parse(this._loginUser) : null
  );
  user$ = this._userSource.asObservable();

  private _registerUrl = `${environment.baseUrl}/Auth/register`;
  private _loginUrl = `${environment.baseUrl}/Auth/login`;
  register(registerDto: RegisterDto) {
    return this._http.post<ServiceResponse>(this._registerUrl, registerDto);
  }
  login(loginDto: LoginDto) {
    return this._http.post<ServiceResponse>(this._loginUrl, loginDto).pipe(
      tap((res) => {
        if (res.Success && res.Data) {
          this.setUser(res.Data);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this._userSource.next(null);
    this._router.navigate(['/auth/login']);
  }

  private setUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this._userSource.next(user);
  }
}
