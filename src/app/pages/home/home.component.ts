import { Component } from '@angular/core';
import { GastoService } from 'src/app/core/services/gasto.service';
import { Gasto } from 'src/app/core/services/interfaces/gasto';
import {Usuario} from 'src/app/core/services/interfaces/usuario'
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  gastos: Gasto[] = [];
  gastoTotalMes: number = 0;
  usuario:Usuario | undefined;
  gastoTotalMesAnterior: number=0;
  porcentajeGastoExtra:number=0;

  constructor(
    private gastoService: GastoService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    /**Hacemos una petición al back para recoger todos los gastos del usuario */
    this.gastoService.gastosUsuario().subscribe((response) => {
      this.gastos = response.data;
      /**Calculamos el gasto total del mes actual y del mes anterior*/
      this.calcularGastoTotalMes();
      this.calcularGastoTotalMesAnterior();
      this.porcentajeGastoExtra = this.calcularPorcentajeGastoExtra(this.gastoTotalMes, this.gastoTotalMesAnterior);
    });

    const usuarioId = Number(sessionStorage.getItem("usuario")); // Convert the value to a number
    console.log("el id usuario es: ",usuarioId);
    this.usuarioService.buscarUsuario(usuarioId).subscribe((response) => { // Pass the converted value
      this.usuario = response.data;
      console.log("el usuario es: ",this.usuario);
    });

  }

  calcularGastoTotalMes(): void {
    // Obtener el mes y el año actual
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth();
  
    // Filtrar los gastos por el mismo mes y año actual, luego sumar sus cantidades
    this.gastoTotalMes = this.gastos
      .filter(gasto => {
        const fechaGasto = new Date(gasto.Fecha);
        const añoGasto = fechaGasto.getFullYear();
        const mesGasto = fechaGasto.getMonth();
        return añoGasto === añoActual && mesGasto === mesActual;
      })
      .reduce((total, gasto) => total + parseFloat(gasto.Cantidad), 0);
  }  

  calcularPorcentajeGastoExtra(gastoTotalMesActual: number, gastoTotalMesAnterior: number): number {
    // Calcular la diferencia entre los gastos del mes actual y del mes anterior
    const diferencia = gastoTotalMesActual - gastoTotalMesAnterior;

    // Calcular el porcentaje de diferencia en relación con los gastos del mes anterior
    const porcentaje = parseFloat(((diferencia / gastoTotalMesAnterior) * 100).toFixed(2));

    return porcentaje;
}

calcularGastoTotalMesAnterior(): void {
  // Obtener el mes y el año del mes anterior
  const fechaActual = new Date();
  fechaActual.setMonth(fechaActual.getMonth() - 1); // Retrocedemos un mes
  const añoAnterior = fechaActual.getFullYear();
  const mesAnterior = fechaActual.getMonth();
  
  // Filtrar los gastos por el mismo mes y año anterior, luego sumar sus cantidades
  this.gastoTotalMesAnterior = this.gastos
    .filter(gasto => {
      const fechaGasto = new Date(gasto.Fecha);
      const añoGasto = fechaGasto.getFullYear();
      const mesGasto = fechaGasto.getMonth();
      return añoGasto === añoAnterior && mesGasto === mesAnterior;
    })
    .reduce((total, gasto) => total + parseFloat(gasto.Cantidad), 0);
    console.log("El gasto del mes anterior es: ",this.gastoTotalMesAnterior)
}


}
