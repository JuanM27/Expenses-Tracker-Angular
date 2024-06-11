import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { Gasto } from 'src/app/core/services/interfaces/gasto';
import { GastoService } from 'src/app/core/services/gasto.service';

@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styleUrls: ['./grafica-barras.component.css']
})
export class GraficaBarrasComponent implements OnInit {

  public chart: Chart;
  gastos: Gasto[] = [];
  gastosPorMes: number[] = new Array(12).fill(0); // Array para almacenar los gastos por mes

  constructor(private gastoService: GastoService) {}

  ngOnInit(): void {
    this.gastoService.gastosUsuario().subscribe((response) => {
      this.gastos = response.data;
      console
      this.calcularGastosPorMes(); // Calcular gastos por mes después de obtener los datos
      this.actualizarGrafica(); // Actualizar la gráfica con los datos calculados
    });
  }

  calcularGastosPorMes(): void {
    // Recorrer los gastos y sumarlos por mes
    this.gastos.forEach(gasto => {
      const mes = new Date(gasto.Fecha).getMonth();
      this.gastosPorMes[mes] += gasto.Cantidad;
    });
  }

  actualizarGrafica(): void {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Gastos Mensuales (€)',
        data: this.gastosPorMes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    };

    if (this.chart) {
      this.chart.destroy(); // Destruir el gráfico anterior si existe
    }

    this.chart = new Chart("chart-barras", {
      type: 'bar' as ChartType,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
