import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-tabla-gastos',
  templateUrl: './tabla-gastos.component.html',
  styleUrls: ['./tabla-gastos.component.css']
})
export class TablaGastosComponent implements OnInit, OnDestroy, OnChanges {

  ngAfterViewInit(){
    initFlowbite();
  }


  @Input() searchQuery: string = '';
  categorias: Categoria[] = [];
  gastos: Gasto[] = [];
  filteredGastos: Gasto[] = [];
  gastoAgregadoSubscription: Subscription;
  gastoBorradoSubscription: Subscription;
  gastoEditadoSubscription: Subscription;
  editarForm: FormGroup;

  constructor(
    private gastoService: GastoService,
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.editarForm = this.fb.group({
      ID_Gasto: [0, Validators.required],
      Descripcion: ['', Validators.required],
      Cantidad: [0, [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(1)]],
      Fecha: ['', Validators.required],
      ID_Categoria: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerGastos();
    this.obtenerCategorias();
    this.gastoAgregadoSubscription = this.gastoService.gastoAgregado().subscribe((nuevoGasto) => {
      this.gastos.unshift(nuevoGasto.data);
      this.ordenarGastos();
      this.filterGastos();
      console.log("Los gastos son: ", this.gastos);
    });
    this.gastoBorradoSubscription = this.gastoService.gastoBorrado$.subscribe(() => {
      this.obtenerGastos(); // Actualizar la lista de gastos después de borrar un gasto
    });
    this.gastoEditadoSubscription = this.gastoService.gastoEditado$.subscribe(() => {
      this.obtenerGastos(); // Actualizar la lista de gastos después de editar un gasto
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

  borrarGasto(idGasto: number): void {
    this.gastoService.borrarGasto(idGasto).subscribe(() => {
    });
  }

  pasarInfoGasto(idGasto: number): void {
    this.gastoService.obtenerGastoPorId(idGasto).subscribe((response) => {
      this.editarForm.patchValue({
        ID_Gasto: response.data.ID_Gasto,
        Descripcion: response.data.Descripcion,
        Cantidad: response.data.Cantidad,
        Fecha: response.data.Fecha,
        ID_Categoria: response.data.ID_Categoria
      });
    });
  }

  editarGasto(): void {
    const nuevoGasto = this.editarForm.value;
    this.gastoService.editarGasto(nuevoGasto).subscribe(response => {
      console.log('Gasto editado con éxito', response);
      this.editarForm.reset();
      this.showSuccess();
    }, error => {
      this.showError();
      console.error('Error al editar el gasto', error);
    });
  }

  showSuccess() {
    this.toastr.success('Gasto editado con éxito!', 'Operación exitosa');
  }

  showError() {
    this.toastr.error('Error al editar el gasto!', 'Operación fallida');
  }

}
