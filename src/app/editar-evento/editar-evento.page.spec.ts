import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEventoPage } from './editar-evento.page';

describe('EditarEventoPage', () => {
  let component: EditarEventoPage;
  let fixture: ComponentFixture<EditarEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
