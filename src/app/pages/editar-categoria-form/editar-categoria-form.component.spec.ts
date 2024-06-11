import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaFormComponent } from './editar-categoria-form.component';

describe('EditarCategoriaFormComponent', () => {
  let component: EditarCategoriaFormComponent;
  let fixture: ComponentFixture<EditarCategoriaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCategoriaFormComponent]
    });
    fixture = TestBed.createComponent(EditarCategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
