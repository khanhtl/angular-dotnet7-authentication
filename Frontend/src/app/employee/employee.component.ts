import { Observable, map, of } from 'rxjs';
import { Component, inject } from '@angular/core';
import { EmployeeService } from './data-access/employee.service';
import { Employee } from '../shared/models/Employee';

@Component({
  selector: 'app-play',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  private _employeeService = inject(EmployeeService);
  employees$!: Observable<Employee[]>;

  ngOnInit() {
    this.employees$ = this._employeeService.get().pipe(
      map((res) => {
        if (res.Success) {
          return res.Data;
        }
        return of([]);
      })
    );
  }
}
