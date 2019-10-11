import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarServicoPage } from './pesquisar-servico.page';

describe('PesquisarServicoPage', () => {
  let component: PesquisarServicoPage;
  let fixture: ComponentFixture<PesquisarServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisarServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
