import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficaDonutComponent } from './grafica-donut.component';

describe('GraficaDonutComponent', () => {
  let component: GraficaDonutComponent;
  let fixture: ComponentFixture<GraficaDonutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficaDonutComponent]
    });
    fixture = TestBed.createComponent(GraficaDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
