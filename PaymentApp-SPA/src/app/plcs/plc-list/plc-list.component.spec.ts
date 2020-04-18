/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PlcListComponent } from './plc-list.component';

describe('ProductListComponent', () => {
  let component: PlcListComponent;
  let fixture: ComponentFixture<PlcListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlcListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
