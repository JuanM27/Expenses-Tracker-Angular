import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-pagina-administrador',
  templateUrl: './pagina-administrador.component.html',
  styleUrls: ['./pagina-administrador.component.css']
})
export class PaginaAdministradorComponent {
  constructor(
    private authService: AuthService
  ) { }

  cerrarSesion(){

    this.authService.logout();

  }
}
