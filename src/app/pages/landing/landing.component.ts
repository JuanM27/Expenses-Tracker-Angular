import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  menuHamburguesa() {
    const enlaces = document.getElementById("barraNavegacion__enlaces");
    if (enlaces) {
      enlaces.style.display = enlaces.style.display === "block" ? "none" : "block";
    }
  }

}
