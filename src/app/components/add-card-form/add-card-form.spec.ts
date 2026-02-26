import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardForm } from './add-card-form';

describe('AddCardForm', () => {
  let component: AddCardForm;
  let fixture: ComponentFixture<AddCardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
