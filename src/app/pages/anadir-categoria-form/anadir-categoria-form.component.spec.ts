import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirCategoriaFormComponent } from './anadir-categoria-form.component';

describe('AnadirCategoriaFormComponent', () => {
  let component: AnadirCategoriaFormComponent;
  let fixture: ComponentFixture<AnadirCategoriaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnadirCategoriaFormComponent]
    });
    fixture = TestBed.createComponent(AnadirCategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
