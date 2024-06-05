import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filtrar-gasto-fecha-form',
  templateUrl: './filtrar-gasto-fecha-form.component.html',
  styleUrls: ['./filtrar-gasto-fecha-form.component.css']
})
export class FiltrarGastoFechaFormComponent {
  filtrarGastoFechaForm: FormGroup;

  @Output() filtrarFechaEvent = new EventEmitter<{ Fecha1: string, Fecha2: string }>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FiltrarGastoFechaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filtrarGastoFechaForm = this.fb.group({
      Fecha1: ['', Validators.required],
      Fecha2: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.filtrarGastoFechaForm.valid) {
      this.dialogRef.close(this.filtrarGastoFechaForm.value);
      const { Fecha1, Fecha2 } = this.filtrarGastoFechaForm.value;
      this.filtrarFechaEvent.emit({ Fecha1, Fecha2 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
