import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/core/services/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuario: Usuario | undefined;

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    const userId = Number(sessionStorage.getItem("usuario"));
    if (userId) {
      this.usuarioService.buscarUsuario(userId).subscribe((response) => {
        this.usuario = response.data;
      });
    } else {
      console.log("No se encontró el ID del usuario en la sesión.");
    }
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
