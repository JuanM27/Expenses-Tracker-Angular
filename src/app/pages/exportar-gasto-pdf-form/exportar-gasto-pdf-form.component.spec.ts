import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarGastoPdfFormComponent } from './exportar-gasto-pdf-form.component';

describe('ExportarGastoPdfFormComponent', () => {
  let component: ExportarGastoPdfFormComponent;
  let fixture: ComponentFixture<ExportarGastoPdfFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportarGastoPdfFormComponent]
    });
    fixture = TestBed.createComponent(ExportarGastoPdfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
