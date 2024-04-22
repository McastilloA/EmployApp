import { Component, OnInit, inject } from '@angular/core';
import { takeUntil } from 'rxjs';

import { TableComponent } from '@modules/employees/components/table/table.component';
import { CardComponent } from '@modules/employees/components/card/card.component';
import { TitleComponent } from '@shared/components/title/title.component';

import { EmployeesService } from '@core/services/employees.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableComponent, CardComponent, TitleComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  /** Variables globales */
  service = inject(EmployeesService);

  ngOnInit(): void {
    this.getListEmployees();
  }

  /**
   * Obtiene una lista de empleados del servicio y actualiza el estado del componente.
   */
  getListEmployees(): void {
    this.service
      .getAllEmployee()
      .pipe(takeUntil(this.service.unSubscribe$))
      .subscribe({
        next: (res) => this.service.successAll(res),
        error: (err) => this.service.handleError(err),
      });
  }

  /**
   * Actualiza la lista de empleados llamando al método `getListEmployees`.
   */
  refreshList(): void {
    this.getListEmployees();
  }
}
