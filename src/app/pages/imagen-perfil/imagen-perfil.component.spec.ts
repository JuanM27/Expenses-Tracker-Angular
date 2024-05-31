import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenPerfilComponent } from './imagen-perfil.component';

describe('ImagenPerfilComponent', () => {
  let component: ImagenPerfilComponent;
  let fixture: ComponentFixture<ImagenPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenPerfilComponent]
    });
    fixture = TestBed.createComponent(ImagenPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
