import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/core/services/categoria.service';

@Component({
  selector: 'app-anadir-categoria-form',
  templateUrl: './anadir-categoria-form.component.html',
  styleUrls: ['./anadir-categoria-form.component.css']
})
export class AnadirCategoriaFormComponent {
  anadirCategoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnadirCategoriaFormComponent>,
    private toastr: ToastrService,
    private categoriaService: CategoriaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.anadirCategoriaForm = this.fb.group({
      ID_Categoria: [null, Validators.required],
      Nombre: ['', Validators.required],
      Descripcion: ['', Validators.required],
    });
    
  }


  anadirCategoria(): void {
    const nuevaCategoria = this.anadirCategoriaForm.value;
    this.categoriaService.crearCategoria(nuevaCategoria).subscribe(response => {
      this.anadirCategoriaForm.reset();
      this.toastr.success('Categoria creada correctamente', 'Categoria creada')
      this.dialogRef.close();
    }, error => {
      this.toastr.error('Error al crear la categoria', 'Error')
      console.error('Error al crear la categoria', error);
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  
}
