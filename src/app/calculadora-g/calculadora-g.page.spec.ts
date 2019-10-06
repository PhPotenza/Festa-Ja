import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraGPage } from './calculadora-g.page';

describe('CalculadoraGPage', () => {
  let component: CalculadoraGPage;
  let fixture: ComponentFixture<CalculadoraGPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraGPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
