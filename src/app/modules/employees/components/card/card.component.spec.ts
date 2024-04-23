/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmployeesService } from '@core/services/employees.service';
import { Employee } from '@core/interface/employees';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let service: EmployeesService;
  let mockapi: Employee;
  let error: Error;

  beforeEach(async () => {
    mockapi = {
      id: '1',
      name: 'test',
      lastName: 'test',
      position: 'test',
      dateBirth: '00/00/00',
    };
    error = {
      message: 'Error',
      name: 'Error server'
    };


    await TestBed.configureTestingModule({
      imports: [CardComponent, HttpClientTestingModule],
      providers: [EmployeesService],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    service = TestBed.inject(EmployeesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
