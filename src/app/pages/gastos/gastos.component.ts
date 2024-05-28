import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';


@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

  gastoForm: FormGroup;
  categorias : Categoria[] = [];
  searchQuery: string = '';

  constructor(
    private fb: FormBuilder,
    private gastoService: GastoService,
    private categoriaService: CategoriaService,
  ) {
    this.gastoForm = this.fb.group({
      Descripcion: ['', Validators.required],
      Cantidad: [0, [Validators.required, Validators.min(0.01)]],
      Fecha: ['', Validators.required],
      ID_Categoria: [0, Validators.required],
    });
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }
  onSubmit(): void {
    const nuevoGasto = this.gastoForm.value;
    this.gastoService.crearGasto(nuevoGasto).subscribe(response => {
      console.log('Gasto creado exitosamente', response);
    }, error => {
      console.error('Error al crear el gasto', error);
    });
  }

  ngOnInit() : void {
      /**Obtenemos las categorias */
      this.categoriaService.obtenerCategorias().subscribe((response) => { 
        this.categorias = response.data;
      });
    }
  }
  




  /* onSubmit() {
    console.log(this.gastoForm);
    if (this.gastoForm.valid) {
      console.log(this.gastoForm.value);
      // Aquí puedes añadir la lógica para enviar los datos a tu servicio
      // this.gastoService.añadirGasto(this.gastoForm.value).subscribe();
    } else {
      console.log('Formulario no válido');
    }
  } */
