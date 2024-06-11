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
      Formato:[null]
    });
    
  }

  ngOnInit():void{
    this.categoriaService.obtenerCategorias().subscribe((response) => {
      this.categorias = response.data;
    });
  }

  exportarPdf() {
    if (this.exportarGastoPdfForm.valid) {
      this.gastoService.exportarGastoPdfFormComponent(this.exportarGastoPdfForm.value).subscribe(
        (response) => {
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'factura.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          this.toastr.success('Gastos exportados correctamente');
        },
        (error) => {
          console.error('Error exporting PDF:', error);
          if (error.status === 400 ){
            this.toastr.warning('No hay gastos con ese mes o categoria');
          }else{
            this.toastr.error('Error al exportar los gastos');
          }
        }
      );

      this.dialogRef.close(this.exportarGastoPdfForm.value);
    } else {
      this.toastr.error('Por favor, rellene todos los campos');
    }
  }

  exportarExcel() {
    if (this.exportarGastoPdfForm.valid) {
      const formato = this.exportarGastoPdfForm.value.Formato;
      if (formato === 'xlsx') {
        this.exportarGastoExcel();
      } else if (formato === 'csv') {
        this.exportarGastoCSV();
      } else {
        console.error('Formato no válido');
        this.toastr.error('Formato de exportación no válido');
      }
    } else {
      this.toastr.error('Por favor, rellene todos los campos');
    }
  }
  
  exportarGastoExcel() {
    this.gastoService.exportarGastoExcelFormComponent(this.exportarGastoPdfForm.value).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'application/xlsx' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'excelGastos.xlsx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.toastr.success('Gastos exportados correctamente');
      },
      (error) => {
        console.error('Error exporting Excel:', error);
        if (error.status === 400) {
          this.toastr.warning('No hay gastos con ese mes o categoría');
        } else {
          this.toastr.error('Error al exportar los gastos');
        }
      }
    );
  
    this.dialogRef.close(this.exportarGastoPdfForm.value);
  }
  
  exportarGastoCSV() {
    this.gastoService.exportarGastoCSVFormComponent(this.exportarGastoPdfForm.value).subscribe(
      (response) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'excelGastos.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        this.toastr.success('Gastos exportados correctamente');
      },
      (error) => {
        console.error('Error exporting CSV:', error);
        if (error.status === 400) {
          this.toastr.warning('No hay gastos con ese mes o categoría');
        } else {
          this.toastr.error('Error al exportar los gastos');
        }
      }
    );
  
    this.dialogRef.close(this.exportarGastoPdfForm.value);
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
