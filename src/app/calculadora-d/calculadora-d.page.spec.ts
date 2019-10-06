import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraDPage } from './calculadora-d.page';

describe('CalculadoraDPage', () => {
  let component: CalculadoraDPage;
  let fixture: ComponentFixture<CalculadoraDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculadoraDPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculadoraDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
