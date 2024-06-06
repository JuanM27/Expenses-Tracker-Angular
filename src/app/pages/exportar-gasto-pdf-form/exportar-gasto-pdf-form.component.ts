import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';

@Component({
  selector: 'app-exportar-gasto-pdf-form',
  templateUrl: './exportar-gasto-pdf-form.component.html',
  styleUrls: ['./exportar-gasto-pdf-form.component.css']
})
export class ExportarGastoPdfFormComponent {

  exportarGastoPdfForm: FormGroup;
  categorias: Categoria[];
  meses = [
    { id: 1, nombre: 'Enero' },
    { id: 2, nombre: 'Febrero' },
    { id: 3, nombre: 'Marzo' },
    { id: 4, nombre: 'Abril' },
    { id: 5, nombre: 'Mayo' },
    { id: 6, nombre: 'Junio' },
    { id: 7, nombre: 'Julio' },
    { id: 8, nombre: 'Agosto' },
    { id: 9, nombre: 'Septiembre' },
    { id: 10, nombre: 'Octubre' },
    { id: 11, nombre: 'Noviembre' },
    { id: 12, nombre: 'Diciembre' }
  ];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExportarGastoPdfFormComponent>,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private gastoService: GastoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.exportarGastoPdfForm = this.fb.group({
      ID_Categoria: [null],
      Mes: [null],
    });
    
  }

  ngOnInit():void{
    this.categoriaService.obtenerCategorias().subscribe((response) => {
      this.categorias = response.data;
    });
  }

  exportarPdf() {
    if (this.exportarGastoPdfForm.valid) {
      this.gastoService.exportarGastoPdfFormComponent(this.exportarGastoPdfForm.value).subscribe((response) => {
        this.toastr.success('Gastos exportados correctamente');
      });

      this.dialogRef.close(this.exportarGastoPdfForm.value);
    } else {
      this.toastr.error('Por favor, rellene todos los campos');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
