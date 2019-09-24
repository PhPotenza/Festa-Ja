import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivulgarEventoPage } from './divulgar-evento.page';

describe('DivulgarEventoPage', () => {
  let component: DivulgarEventoPage;
  let fixture: ComponentFixture<DivulgarEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivulgarEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivulgarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
