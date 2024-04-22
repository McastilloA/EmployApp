import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { takeUntil } from 'rxjs';

import { Employee } from '@core/interface/employees';
import { EmployeesService } from '@core/services/employees.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import Swal from 'sweetalert2';
import { SearchPipe } from '@shared/pipes/search.pipe';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    ModalComponent,
    LoadingComponent,
    SearchPipe,
    NgFor,
    AsyncPipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  providers: [SearchPipe],
})
export class CardComponent {
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
  showSpinner = false;
  #service = inject(EmployeesService);
  searchFilter = '';

  /**
   * Filtra los datos de la tabla basándose en la entrada del usuario.
   * @param event - El objeto evento desencadenado por la entrada del usuario.
   */
  filterEmployees(name: Event): void {
    const filteredValue = (name.target as HTMLInputElement).value;
    this.searchFilter = filteredValue;

    // if (filteredValue !== '') {
    //   this.listEmployees = this.filterEmployeesByName(filteredValue);
    // }
  }

  filterEmployeesByName(name: string): Employee[] {
    return this.listEmployees.filter((employee) =>
      employee.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Abre un cuadro de diálogo modal.
   * @param data - Los datos que se pasarán al componente modal.
   * @param action - Identificador de la acción a realizar en el componente modal.
   * Finalmnete emite un evento que refresca la lista de empleados.
   */
  openDialog(data: unknown, action: number): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      panelClass: ['md:w-1/2', 'w-full'],
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
