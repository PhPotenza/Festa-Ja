import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraFPage } from './calculadora-f.page';

describe('CalculadoraFPage', () => {
  let component: CalculadoraFPage;
  let fixture: ComponentFixture<CalculadoraFPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraFPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraFPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
