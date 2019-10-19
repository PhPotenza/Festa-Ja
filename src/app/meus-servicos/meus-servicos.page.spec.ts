import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusServicosPage } from './meus-servicos.page';

describe('MeusServicosPage', () => {
  let component: MeusServicosPage;
  let fixture: ComponentFixture<MeusServicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusServicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusServicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
