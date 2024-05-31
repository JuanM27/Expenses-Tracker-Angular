import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirFormComponent } from './anadir-form.component';

describe('AnadirFormComponent', () => {
  let component: AnadirFormComponent;
  let fixture: ComponentFixture<AnadirFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnadirFormComponent]
    });
    fixture = TestBed.createComponent(AnadirFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
