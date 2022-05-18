import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDueComponent } from './fee-due.component';

describe('FeeDueComponent', () => {
  let component: FeeDueComponent;
  let fixture: ComponentFixture<FeeDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeDueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
