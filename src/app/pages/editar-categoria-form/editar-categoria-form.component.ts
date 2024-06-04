import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';

@Component({
  selector: 'app-editar-categoria-form',
  templateUrl: './editar-categoria-form.component.html',
  styleUrls: ['./editar-categoria-form.component.css']
})
export class EditarCategoriaFormComponent {

  editarCategoriaForm: FormGroup;
  categoria: Categoria;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarCategoriaFormComponent>,
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.categoria = data.Categoria;

    this.editarCategoriaForm = this.fb.group({
      ID_Categoria: [this.categoria.ID_Categoria, Validators.required],
      Nombre: [this.categoria.Nombre, Validators.required],
      Descripcion: [this.categoria.Descripcion, Validators.required],
    });
    
  }

  editarCategoria(): void {
    const categoriaEditada = this.editarCategoriaForm.value;
    this.categoriaService.editarCategoria(categoriaEditada).subscribe(response => {
      this.editarCategoriaForm.reset();
      this.toastr.success('Categoria editada correctamente', 'Categoria editada')
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Error al editar la categoria', 'Error')
      console.error('Error al editar la categoria', error);
    });
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
