import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { initFlowbite } from 'flowbite';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarFormComponent } from '../editar-form/editar-form.component';
import { ModalBorrarComponent } from '../modal-borrar/modal-borrar.component';

@Component({
  selector: 'app-tabla-gastos',
  templateUrl: './tabla-gastos.component.html',
  styleUrls: ['./tabla-gastos.component.css']
})


export class TablaGastosComponent implements OnInit, OnDestroy, OnChanges {

  @Input() searchQuery: string = '';
  categorias: Categoria[] = [];
  gastos: Gasto[] = [];
  filteredGastos: Gasto[] = [];
  gastoAgregadoSubscription: Subscription;
  gastoBorradoSubscription: Subscription;
  gastoEditadoSubscription: Subscription;


  constructor(
    private gastoService: GastoService,
    private categoriaService: CategoriaService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { 

  }

  abrirModalEditarGasto(gasto: Gasto): void {
    // Abre el modal
    const dialogRef = this.dialog.open(EditarFormComponent, {
      width: '400px', // Establece el ancho del modal
      data: { Gasto: gasto } // Pasa cualquier dato necesario al modal
    });

    // Escucha el evento de cierre del modal (puede ser útil si necesitas hacer algo después de cerrar el modal)
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit(): void {
    this.obtenerGastos();
    this.obtenerCategorias();
    this.gastoService.gastoAgregado().subscribe((nuevoGasto) => {
      this.gastos.unshift(nuevoGasto.data);
      this.ordenarGastos();
      this.filterGastos();
    });
    
    this.gastoService.gastoBorrado$.subscribe(() => {
      this.obtenerGastos(); // Actualizar la lista de gastos después de borrar un gasto
    });

    this.gastoService.gastoEditado$.subscribe(() => {
      this.obtenerGastos(); 
    });
  }

  /**Si cambia algo en searchQuery se activa automaticamente la función de filtrado */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery']) {
      this.filterGastos();
    }
  }

  ngOnDestroy(): void {
    if (this.gastoAgregadoSubscription) {
      this.gastoAgregadoSubscription.unsubscribe();
    }
    if (this.gastoBorradoSubscription) {
      this.gastoBorradoSubscription.unsubscribe();
    }
    if (this.gastoEditadoSubscription) {
      this.gastoEditadoSubscription.unsubscribe();
    }
  }

  obtenerGastos(): void {
    this.gastoService.gastosUsuario().subscribe((response) => {
      this.gastos = response.data;
      this.ordenarGastos();
      this.filterGastos();
    });
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((response) => {
      this.categorias = response.data;
    });
  }

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.ID_Categoria == idCategoria);
    return categoria ? categoria.Nombre : 'Categoría desconocida';
  }  

  ordenarGastos(): void {
    this.gastos.sort((a, b) => {
      const dateA = new Date(a.Fecha);
      const dateB = new Date(b.Fecha);

      return dateB.getTime() - dateA.getTime();
    });
  }

  filterGastos(): void {
    if (this.searchQuery) {
      this.filteredGastos = this.gastos.filter(gasto =>
        gasto.Descripcion.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.obtenerNombreCategoria(gasto.ID_Categoria).toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        this.obtenerCategoriaPorId(gasto.ID_Categoria).Nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        gasto.Cantidad.toString().includes(this.searchQuery.toLowerCase()) ||
        this.formatearFecha(gasto.Fecha.toString()).toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredGastos = this.gastos;
    }
  }

  filtrarGastosPorFecha(fechaInicio: string, fechaFin: string): void {
    if (fechaInicio && fechaFin) {
      const fechaInicioObj = new Date(fechaInicio);
      const fechaFinObj = new Date(fechaFin);
      this.filteredGastos = this.gastos.filter(gasto => {
        const fechaGasto = new Date(gasto.Fecha);
        return fechaGasto >= fechaInicioObj && fechaGasto <= fechaFinObj;
      });
    } else {
      this.filteredGastos = this.gastos;
    }
  }
  
  
  obtenerCategoriaPorId(idCategoria: number): Categoria {
    return this.categorias.find(categoria => categoria.ID_Categoria === idCategoria);
  }
  
  formatearFecha(fecha: string): string {
    const fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate().toString().padStart(2, '0');
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaObjeto.getFullYear();
    return `${dia}/${mes}/${año}`;
  }

 /*  borrarGasto(idGasto: number): void {
    this.gastoService.borrarGasto(idGasto).subscribe(() => {
    });
  } */
  
  borrarGasto(idGasto: number): void {
    const dialogRef = this.dialog.open(ModalBorrarComponent, {
      width: '300px',
      data: { idGasto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gastoService.borrarGasto(idGasto).subscribe(() => {
        });
        console.log(`Gasto con ID ${idGasto} eliminado`);
      }
    });
  }

  showSuccess() {
    this.toastr.success('Gasto editado con éxito!', 'Operación exitosa');
  }

  showError() {
    this.toastr.error('Error al editar el gasto!', 'Operación fallida');
  }

  quitarFiltro() {
    this.obtenerGastos();
  }

}
