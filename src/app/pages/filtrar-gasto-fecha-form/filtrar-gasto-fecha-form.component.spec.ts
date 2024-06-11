import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarGastoFechaFormComponent } from './filtrar-gasto-fecha-form.component';

describe('FiltrarGastoFechaFormComponent', () => {
  let component: FiltrarGastoFechaFormComponent;
  let fixture: ComponentFixture<FiltrarGastoFechaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltrarGastoFechaFormComponent]
    });
    fixture = TestBed.createComponent(FiltrarGastoFechaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
