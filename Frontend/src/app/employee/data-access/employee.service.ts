import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDto, RegisterDto } from '@shared/dtos';
import { BehaviorSubject, Subject, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/User';
import { ServiceResponse } from '../../shared/models/ServiceResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _http = inject(HttpClient);
  private _employeeUrl = `${environment.baseUrl}/Employees`;

  get() {
    return this._http.get<ServiceResponse>(this._employeeUrl);
  }
}
