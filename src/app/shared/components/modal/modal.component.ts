import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { Dialog } from '@core/interface/employees';
import { EmployeesService } from '@core/services/employees.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  /** Varibales globales */
  showSpinner = false;
  formGroup!: FormGroup;
  positions = signal<string[]>([]);
  #dialogRef: MatDialogRef<ModalComponent> = inject(MatDialogRef);
  #fb: FormBuilder = inject(FormBuilder);
  #service = inject(EmployeesService);

  constructor(@Inject(MAT_DIALOG_DATA) public infoEmployee: Dialog) {}

  ngOnInit(): void {
    this.initForm();
    this.getListPositions();
    this.validateForm(this.infoEmployee);
  }

  /**
   * Inicializa el formulario con los controles y validadores necesarios.
   */
  initForm(): void {
    this.formGroup = this.#fb.group({
      id: [null],
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      position: [null, Validators.required],
      dateBirth: [null, Validators.required],
    });
  }

  /**
   * Recupera una lista de posiciones del API y actualiza el estado del componente.
   */
  getListPositions(): void {
    this.showSpinner = true;
    this.#service
      .getPostion()
      .pipe(takeUntil(this.#service.unSubscribe$))
      .subscribe({
        next: (res) => this.positions.set(res.positions),
        error: (err) => {
          this.showSpinner = false;
          this.#service.handleError(err);
        },
        complete: () => (this.showSpinner = false),
      });
  }

  /**
   * Rellena los campos del formulario con los datos del objeto empleado si la propiedad action es verdadera.
   * @param employee - Un objeto que contiene los datos del empleado y una bandera de acción.
   */
  validateForm(employee: Dialog): void {
    if (employee.action) {
      this.formGroup.patchValue(employee.data);
    }
  }

  /**
   * Determina si se crea o edita un empleado en función del valor del parámetro `action`.
   * @param action - Un parámetro que determina si crear o editar un empleado. Un valor de 0
   * indica crear un empleado, mientras que un valor de 1 indica editar un empleado.
   */
  onClickEmployee(action: number) {
    action === 0 ? this.onCreateEmployee() : this.onEditEmployee();
  }

  /**
   * Crea un nuevo empleado enviando un request al servidor con los datos del empleado del formulario.
   * Maneja las respuestas de éxito y error del servidor.
   */
  onCreateEmployee() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this.#service
        .createEmployee(this.formGroup.value)
        .pipe(takeUntil(this.#service.unSubscribe$))
        .subscribe({
          next: (res) => {
            this.#service.successCreate(res);
            this.onClose();
          },
          error: (err) => {
            this.showSpinner = false;
            this.#service.handleError(err);
          },
          complete: () => (this.showSpinner = false),
        });
    }
  }

  /**
   * Actualiza la información de un empleado haciendo una petición HTTP al servidor.
   * Comprueba si el formulario es válido, establece la variable `showSpinner` a true para mostrar un spinner de carga,
   * y llama al método `updateEmployee` del `EmployeesService` para enviar los datos actualizados del empleado al servidor.
   * A continuación, se suscribe a la respuesta y maneja los casos de éxito y error en consecuencia.
   */
  onEditEmployee() {
    if (this.formGroup.valid) {
      this.showSpinner = true;
      this.#service
        .updateEmployeeById(this.formGroup.value)
        .pipe(takeUntil(this.#service.unSubscribe$))
        .subscribe({
          next: (res) => {
            this.#service.successById(res, 'modified');
            this.onClose();
          },
          error: (err) => {
            this.showSpinner = false;
            this.#service.handleError(err);
          },
          complete: () => (this.showSpinner = false),
        });
    }
  }

  /**
   * Cierra un cuadro de diálogo modal.
   */
  onClose(): void {
    this.#dialogRef.close();
  }
}
