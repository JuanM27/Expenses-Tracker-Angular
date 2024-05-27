import { Component } from '@angular/core';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';

@Component({
  selector: 'app-tabla-gastos',
  templateUrl: './tabla-gastos.component.html',
  styleUrls: ['./tabla-gastos.component.css']
})
export class TablaGastosComponent {
  categorias : Categoria[] = [];
  gastos: Gasto[] = [];

  constructor(
    private gastoService: GastoService
  ) { }

  ngOnInit(): void {
    /**Hacemos una petición al back para recoger todos los gastos del usuario */
    this.gastoService.gastosUsuario().subscribe((response) => {
      this.gastos = response.data;
    });
  }


  /**Funcion para con el Id obtener el nombre de la categoría */
  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.ID_Categoria === idCategoria);
    return categoria ? categoria.Nombre : 'Categoría desconocida';
  }

}
