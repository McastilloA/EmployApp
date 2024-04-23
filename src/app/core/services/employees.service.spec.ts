/* eslint-disable @typescript-eslint/no-unused-vars */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeesService } from './employees.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [EmployeesService, HttpTestingController]
    });
    service = TestBed.inject(EmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach(() => {
  //   httpMock.verify()
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return employees', () => {
  //   const mockEmployees: Employee[] = [
  //     {
  //       id: '1',
  //       name: 'test',
  //       lastName: 'test',
  //       position: 'test',
  //       dateBirth: '00/00/00',
  //     },
  //   ];

  //   service.getAllEmployee().subscribe((employees: Employee[]) => {
  //     expect(employees.length).toBe(2);
  //     expect(employees).toEqual(mockEmployees);
  //   });

  //   const req = httpMock.expectOne(`${environment.API_URL}/api/v1/employees`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockEmployees);
  // });

  // it('It: should handle error if request fails', () => {
  //   const mockError = new Error('Failed to fetch employees');
  //   service.getAllEmployee().subscribe({
  //     error: (error) => {
  //       expect(error).toBe(mockError);
  //     },
  //   });

  //   const req = httpMock.expectOne(`${environment.API_URL}/api/v1/employees`);
  //   req.error(new ErrorEvent('error', { error: mockError }));
  // });
});
