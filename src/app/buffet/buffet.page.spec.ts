import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffetPage } from './buffet.page';

describe('BuffetPage', () => {
  let component: BuffetPage;
  let fixture: ComponentFixture<BuffetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuffetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuffetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
