import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaBarrasComponent } from './grafica-barras.component';

describe('GraficaBarrasComponent', () => {
  let component: GraficaBarrasComponent;
  let fixture: ComponentFixture<GraficaBarrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaBarrasComponent]
    });
    fixture = TestBed.createComponent(GraficaBarrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
