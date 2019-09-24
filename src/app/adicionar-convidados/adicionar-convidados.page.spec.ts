import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarConvidadosPage } from './adicionar-convidados.page';

describe('AdicionarConvidadosPage', () => {
  let component: AdicionarConvidadosPage;
  let fixture: ComponentFixture<AdicionarConvidadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarConvidadosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarConvidadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
