import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousEnrollmentComponent } from './previous-enrollment.component';

describe('PreviousEnrollmentComponent', () => {
  let component: PreviousEnrollmentComponent;
  let fixture: ComponentFixture<PreviousEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousEnrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
