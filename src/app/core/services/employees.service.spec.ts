import { TestBed } from '@angular/core/testing';

import { EmployeesService } from './employees.service';

describe('Employees2Service', () => {
  let service: EmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
