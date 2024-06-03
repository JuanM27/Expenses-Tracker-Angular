import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  menuHamburguesa() {
    var x = document.getElementById("barraNavegacion_enlaces");
    var computedStyle = window.getComputedStyle(x); // Obtener el estilo computado del elemento
    var display = computedStyle.getPropertyValue('display'); // Obtener el valor de la propiedad 'display'
  
    if (display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
}
