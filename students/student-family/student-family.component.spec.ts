import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFamilyComponent } from './student-family.component';

describe('StudentFamilyComponent', () => {
  let component: StudentFamilyComponent;
  let fixture: ComponentFixture<StudentFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
