import { Component, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AnadirFormComponent } from '../anadir-form/anadir-form.component';
import { FiltrarGastoFechaFormComponent } from '../filtrar-gasto-fecha-form/filtrar-gasto-fecha-form.component';
import { TablaGastosComponent } from '../tabla-gastos/tabla-gastos.component';
import { ExportarGastoPdfFormComponent } from '../exportar-gasto-pdf-form/exportar-gasto-pdf-form.component';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

  @ViewChild(TablaGastosComponent) tablaGastosComponent: TablaGastosComponent;

  ngAfterViewInit(){
    initFlowbite();
  }

  gastoForm: FormGroup;
  categorias : Categoria[] = [];
  searchQuery: string = '';
  editarForm: Form

  constructor(
    private gastoService: GastoService,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }

  abrirModalAnadirGasto(): void {
    // Abre el modal
    const dialogRef = this.dialog.open(AnadirFormComponent, {
      width: '400px', // Establece el ancho del modal
    });

    // Escucha el evento de cierre del modal (puede ser útil si necesitas hacer algo después de cerrar el modal)
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  abrirModalFiltrarGasto(): void {
    const dialogRef = this.dialog.open(FiltrarGastoFechaFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { Fecha1, Fecha2 } = result;
        // Pasa los valores de Fecha1 y Fecha2 al componente TablaGastosComponent
        this.tablaGastosComponent.filtrarGastosPorFecha(Fecha1, Fecha2);
      }
    });
  }

  abrirModalExportarGastos(tipo: string): void {
    const dialogRef = this.dialog.open(ExportarGastoPdfFormComponent, {
      width: '400px',
      data: { tipo: tipo }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Acciones después de cerrar el modal
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

    quitarFiltro(){
      this.tablaGastosComponent.quitarFiltro();
    }
  }

