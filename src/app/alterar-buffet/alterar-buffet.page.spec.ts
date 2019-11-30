import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarBuffetPage } from './alterar-buffet.page';

describe('AlterarBuffetPage', () => {
  let component: AlterarBuffetPage;
  let fixture: ComponentFixture<AlterarBuffetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarBuffetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlterarBuffetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
