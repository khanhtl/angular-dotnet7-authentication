import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { LoginDto, RegisterDto } from '@shared/dtos';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http=inject(HttpClient);
  registerUrl=`${environment.baseUrl}/Auth/register`;
  loginUrl=`${environment.baseUrl}/Auth/login`;
  register(registerDto: RegisterDto) {
    return this._http.post(this.registerUrl, registerDto);
  }
  login(loginDto: LoginDto) {
    return this._http.post(this.loginUrl, loginDto);
  }
}
