import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';

@Component({
  selector: 'app-anadir-form',
  templateUrl: './anadir-form.component.html',
  styleUrls: ['./anadir-form.component.css']
})
export class AnadirFormComponent {
  anadirForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AnadirFormComponent>,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    private gastoService: GastoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.anadirForm = this.fb.group({
      ID_Gasto: [null, Validators.required],
      Descripcion: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      Fecha: ['', Validators.required],
      ID_Categoria: ['', Validators.required],
    });
    
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  anadirGasto(): void {
    const nuevoGasto = this.anadirForm.value;
    this.gastoService.crearGasto(nuevoGasto).subscribe(response => {
      this.anadirForm.reset();
      this.showSuccess();
      this.dialogRef.close();
    }, error => {
      this.showError();
      console.error('Error al crear el gasto', error);
    });
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((response) => {
      this.categorias = response.data;
    });
  }

  
  showSuccess() {
    this.toastr.success('Gasto añadido con éxito!', 'Operación exitosa');
  }

  showError() {
    this.toastr.error('Error al añadir el gasto!', 'Operación fallida');
  }
}
