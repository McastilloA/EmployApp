/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { EmployeesService } from '@core/services/employees.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Dialog } from '@core/interface/employees';
import { MockEmployees } from '@assets/test/mockEmployees';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockEmployees: MockEmployees;
  let mockDialogData: Dialog;
  let service: EmployeesService;

  beforeEach(async () => {
    mockDialogData = {
      data: {
        id: '1',
        name: 'test',
        lastName: 'test',
        position: 'test',
        dateBirth: '00/00/00',
      },
      action: 0,
    };

    await TestBed.configureTestingModule({
      imports: [ModalComponent, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
        EmployeesService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    service = TestBed.inject(EmployeesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
