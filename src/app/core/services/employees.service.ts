import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '@env/environment.prod';
import { Employee, Position } from '@core/interface/employees';
import { Message } from '@shared/utils/message';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  /** Variables globales */
  unSubscribe$ = new Subject<void>();
  employees = signal<Employee[]>([]);
  #http = inject(HttpClient);
  #message = inject(Message);

  /**
   * Recupera todos los empleados del punto final de la API.
   * @returns Un observable de tipo Employee[], que representa una matriz de objetos de empleado.
   */
  getAllEmployee(): Observable<Employee[]> {
    const url = `${environment.API_URL}/api/v1/employees`;
    return this.#http.get<Employee[]>(url);
  }

  /**
   * Envía una solicitud POST al punto final de la API para crear un nuevo empleado.
   * @param body Un objeto que contiene los detalles del empleado a crear.
   * Debe tener las propiedades `id`, `name`, `lastName`, `position`, y `dateBirth`.
   * @returns Un Observable que emite la respuesta de la llamada a la API.
   */
  createEmployee(body: Employee): Observable<Employee> {
    const url = `${environment.API_URL}/api/v1/employees`;
    return this.#http.post<Employee>(url, body);
  }

  /**
   * Envía una solicitud PUT al punto final de la API para actualizar un nuevo empleado.
   * @param body Un objeto que contiene los detalles del empleado a actualizar.
   * Debe tener las propiedades `id`, `name`, `lastName`, `position`, y `dateBirth`.
   * @returns Un Observable que emite la respuesta de la llamada a la API.
   */
  updateEmployeeById(body: Employee): Observable<Employee> {
    const url = `${environment.API_URL}/api/v1/employees/${body.id}`;
    return this.#http.put<Employee>(url, body);
  }

  /**
   * Borra un empleado enviando una solicitud DELETE al punto final de la API.
   * @param id - El ID del empleado a eliminar.
   * @returns Un Observable que emite la respuesta de la API, indicando si el empleado fue eliminado con éxito o no.
   */
  deleteEmployeeById(id: string): Observable<any> {
    const url = `${environment.API_URL}/api/v1/employees/${id}`;
    return this.#http.delete<any>(url);
  }

  /**
   * Recupera las posiciones de la API especificada.
   * @returns Un observable de tipo `Position` que representa las posiciones recuperadas del endpoint de la API.
   */
  getPostion(): Observable<Position> {
    const url = `${environment.API_URL_POS}/api/positions`;
    return this.#http.get<Position>(url);
  }

  /**
   * Actualiza el estado del componente después de obtener correctamente una lista de empleados del servicio.
   * @param data - La lista de empleados recibida del servicio.
   */
  successAll(data: Employee[]): void {
    this.employees.set(data);
  }

  /**
   * Actualiza el estado del componente después de obtener correctamente la lista de posiciones del servicio.
   * @param data - La lista de posiciones recibida del servicio.
   * Muestra mensaje con descripción satisfactoria.
   */
  successCreate(data: Employee): void {
    this.#message.popupWindow(
      'successfully created',
      `${data.name} was successfully created!`,
      'success'
    );
  }

  /**
   * Actualiza el estado del componente después de obtener correctamente la lista de posiciones del servicio.
   * @param data - La lista de posiciones recibida del servicio.
   * Muestra mensaje temporal con descripción satisfactoria.
   */
  successById(data: Employee, action: string): void {
    this.#message.infoToast(`${data.name} - successfully ${action}!`);
  }

  /**
   * Maneja los errores que se producen durante la petición de la lista de empleados del servicio.
   * @param err - El objeto de error que se pasa al método.
   * Muestra mensaje con descripción del error.
   */
  handleError(err: any): void {
    this.#message.popupWindow(
      'Oops...',
      `Unexpected error, please contact the technical team, error: ${err.message}`,
      'error'
    );
    console.error('Error handling in service:', err.message);
  }
}
