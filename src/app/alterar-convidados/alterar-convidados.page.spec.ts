import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarConvidadosPage } from './alterar-convidados.page';

describe('AlterarConvidadosPage', () => {
  let component: AlterarConvidadosPage;
  let fixture: ComponentFixture<AlterarConvidadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarConvidadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarConvidadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
