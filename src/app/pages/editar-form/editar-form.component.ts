import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';

@Component({
  selector: 'app-editar-form',
  templateUrl: './editar-form.component.html',
  styleUrls: ['./editar-form.component.css']
})
export class EditarFormComponent {
  editarForm: FormGroup;
  categorias: Categoria[] = [];
  gasto: Gasto;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarFormComponent>,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private gastoService: GastoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.gasto = data.Gasto;
    
    this.editarForm = this.fb.group({
      ID_Gasto: [this.gasto.ID_Gasto, Validators.required],
      Descripcion: [this.gasto.Descripcion, Validators.required],
      Cantidad: [this.gasto.Cantidad, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      Fecha: [this.gasto.Fecha, Validators.required],
      ID_Categoria: [this.gasto.ID_Categoria, Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  editarGasto(): void {
    const nuevoGasto = this.editarForm.value;
    this.gastoService.editarGasto(nuevoGasto).subscribe(response => {
      this.editarForm.reset();
      this.toastr.success('Gasto editado con éxito!', 'Operación exitosa');
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Error al editar el gasto!', 'Operación fallida');
      console.error('Error al editar el gasto', error);
    });
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((response) => {
      this.categorias = response.data;
    });
  }
}
