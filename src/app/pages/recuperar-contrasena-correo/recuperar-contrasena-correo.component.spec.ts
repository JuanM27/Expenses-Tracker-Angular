import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenaCorreoComponent } from './recuperar-contrasena-correo.component';

describe('RecuperarContrasenaCorreoComponent', () => {
  let component: RecuperarContrasenaCorreoComponent;
  let fixture: ComponentFixture<RecuperarContrasenaCorreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarContrasenaCorreoComponent]
    });
    fixture = TestBed.createComponent(RecuperarContrasenaCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
