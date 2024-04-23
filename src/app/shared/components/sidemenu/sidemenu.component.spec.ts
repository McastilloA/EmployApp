/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenuComponent } from './sidemenu.component';
import { ActivatedRoute } from '@angular/router';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const activatedRouteMock = {
      snapshot: { paramMap: new Map([['id', '1']]) },
    };

    await TestBed.configureTestingModule({
      imports: [SidemenuComponent],
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidemenuComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
