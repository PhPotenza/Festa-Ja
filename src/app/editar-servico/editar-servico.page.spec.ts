import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarServicoPage } from './editar-servico.page';

describe('EditarServicoPage', () => {
  let component: EditarServicoPage;
  let fixture: ComponentFixture<EditarServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
