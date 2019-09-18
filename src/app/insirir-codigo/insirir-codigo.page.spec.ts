import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsirirCodigoPage } from './insirir-codigo.page';

describe('InsirirCodigoPage', () => {
  let component: InsirirCodigoPage;
  let fixture: ComponentFixture<InsirirCodigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsirirCodigoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsirirCodigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
