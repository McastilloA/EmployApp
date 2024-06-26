import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { takeUntil } from 'rxjs';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Employee } from '@core/interface/employees';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { EmployeesService } from '@core/services/employees.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    ModalComponent,
    LoadingComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  /** Variables globales */
  dialog: MatDialog = inject(MatDialog);
  @Input() listEmployees!: Employee[];
  @Output() refreshList = new EventEmitter<boolean>();
  displayedColumns: string[] = [
    'name',
    'lastName',
    'position',
    'dateBirth',
    'action',
  ];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showSpinner = false;
  #service = inject(EmployeesService);

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.listEmployees);
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Filtra los datos de la tabla basándose en la entrada del usuario.
   * @param event - El objeto evento desencadenado por la entrada del usuario.
   */
  filterEmployees(name: Event): void {
    const filteredValue = (name.target as HTMLInputElement).value;
    this.dataSource.filter = filteredValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Abre un cuadro de diálogo modal.
   * @param data - Los datos que se pasarán al componente modal.
   * @param action - Identificador de la acción a realizar en el componente modal.
   * Finalmnete emite un evento que refresca la lista de empleados.
   */
  openDialog(data: unknown, action: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: ['w-100'],
      data: { data, action },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshList.emit();
    });
  }

  /**
   * Muestra un diálogo de confirmación al usuario cuando intenta borrar un empleado.
   * Si el usuario confirma la eliminación, llama al método `confirmDelete` para eliminar al empleado.
   * @param id - El ID del empleado a borrar.
   */
  onDeleteEmployee(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563EB',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.confirmDelete(id);
      }
    });
  }

  /**
   * Borra un empleado por su ID.
   * Muestra un spinner de carga, llama al método deleteEmployeeById del EmployeesService,
   * y maneja la respuesta y el error. Finalmente, emite un evento para refrescar la lista de empleados.
   * @param id - El ID del empleado a borrar.
   */
  confirmDelete(id: string): void {
    this.showSpinner = true;
    this.#service
      .deleteEmployeeById(id)
      .pipe(takeUntil(this.#service.unSubscribe$))
      .subscribe({
        next: (res) => {
          this.#service.successById(res, 'deleted');
          this.refreshList.emit();
        },
        error: (err) => {
          this.showSpinner = false;
          this.#service.handleError(err);
        },
        complete: () => (this.showSpinner = false),
      });
  }
}
