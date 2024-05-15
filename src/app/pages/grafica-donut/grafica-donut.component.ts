import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { Categoria } from 'src/app/core/services/interfaces/categoria';
import { Gasto } from 'src/app/core/services/interfaces/gasto';
import { CategoriaService } from 'src/app/core/services/categoria.service';
import { GastoService } from 'src/app/core/services/gasto.service';

@Component({
  selector: 'app-grafica-donut',
  templateUrl: './grafica-donut.component.html',
  styleUrls: ['./grafica-donut.component.css']
})
export class GraficaDonutComponent implements OnInit {

  public chart: Chart;
  categorias: Categoria[] = [];
  gastos: Gasto[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private gastoService: GastoService
  ) {}

  ngOnInit(): void {
    // Obtener las categorías desde el servicio
    this.categoriaService.obtenerCategorias().subscribe((response) => { 
      this.categorias = response.data;
      console.log('Categorías:', this.categorias);
      
      // Obtener los gastos del usuario
      this.gastoService.gastosUsuario().subscribe((responseGastos) => {
        this.gastos = responseGastos.data;
        
        // Obtener los nombres de las categorías de los gastos
        const labels = this.obtenerNombresCategorias();
        
        // Obtener los datos de los gastos por categoría
        const data = this.obtenerDatosGastosPorCategoria();
        
        // Crear la gráfica de donut con los datos obtenidos
        this.chart = new Chart("chart", {
          type: 'doughnut' as ChartType,
          data: {
            labels: labels,
            datasets: [{
              label: 'Gastos Categorizados',
              data: data,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          }
        });
      });
    });
  }

  // Método para obtener los nombres de las categorías de los gastos
  obtenerNombresCategorias(): string[] {
    return this.categorias.map(categoria => categoria.Nombre);
  }

  // Método para obtener los datos de los gastos por categoría
  obtenerDatosGastosPorCategoria(): number[] {
    const datos: number[] = [];
    for (const categoria of this.categorias) {
      // Filtrar los gastos por categoría y sumar sus cantidades
      const total = this.gastos
        .filter(gasto => gasto.ID_Categoria === categoria.ID_Categoria)
        .reduce((total, gasto) => total + parseFloat(gasto.Cantidad), 0);
      datos.push(total);
    }
    return datos;
  }
}
