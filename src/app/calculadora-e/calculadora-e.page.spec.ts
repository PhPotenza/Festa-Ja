import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraEPage } from './calculadora-e.page';

describe('CalculadoraEPage', () => {
  let component: CalculadoraEPage;
  let fixture: ComponentFixture<CalculadoraEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraEPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
