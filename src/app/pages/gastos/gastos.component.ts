import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

  ngAfterViewInit(){
    initFlowbite();
  }

  gastoForm: FormGroup;
  categorias : Categoria[] = [];
  searchQuery: string = '';
  editarForm: Form

  constructor(
    private fb: FormBuilder,
    private gastoService: GastoService,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  ) {
    this.gastoForm = this.fb.group({
      Descripcion: ['', Validators.required],
      Cantidad: [0, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
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
      this.gastoForm.reset();
      this.showSuccess();
    }, error => {
      this.showError();
      console.error('Error al crear el gasto', error);
    });
  }

  ngOnInit() : void {
      /**Obtenemos las categorias */
      this.categoriaService.obtenerCategorias().subscribe((response) => { 
        this.categorias = response.data;
      });
    }

    showSuccess() {
      this.toastr.success('Gasto creado con éxito!', 'Operación exitosa');
    }

    showError() {
      this.toastr.error('Error al crear el gasto!', 'Operación fallida');
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
