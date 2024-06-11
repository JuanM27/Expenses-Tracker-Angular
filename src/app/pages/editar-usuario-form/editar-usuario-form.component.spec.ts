import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioFormComponent } from './editar-usuario-form.component';

describe('EditarUsuarioFormComponent', () => {
  let component: EditarUsuarioFormComponent;
  let fixture: ComponentFixture<EditarUsuarioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarUsuarioFormComponent]
    });
    fixture = TestBed.createComponent(EditarUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
