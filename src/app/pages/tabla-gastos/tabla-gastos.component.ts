import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';
import { Subscription } from 'rxjs';

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

  constructor(
    private gastoService: GastoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.obtenerGastos();
    this.obtenerCategorias();
    this.gastoAgregadoSubscription = this.gastoService.gastoAgregado().subscribe((nuevoGasto) => {
      this.gastos.unshift(nuevoGasto.data);
      this.ordenarGastos();
      this.filterGastos();
      console.log("Los gastos son: ", this.gastos);
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
}
