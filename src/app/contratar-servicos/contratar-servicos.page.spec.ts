import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratarServicosPage } from './contratar-servicos.page';

describe('ContratarServicosPage', () => {
  let component: ContratarServicosPage;
  let fixture: ComponentFixture<ContratarServicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratarServicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratarServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
