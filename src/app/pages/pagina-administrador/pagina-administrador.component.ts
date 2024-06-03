import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/core/services/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioFormComponent } from '../editar-usuario-form/editar-usuario-form.component';

@Component({
  selector: 'app-pagina-administrador',
  templateUrl: './pagina-administrador.component.html',
  styleUrls: ['./pagina-administrador.component.css']
})
export class PaginaAdministradorComponent {

  usuarios:Usuario[] = [];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog
  ) { }

  cerrarSesion(){

    this.authService.logout();

  }

  ngOnInit(){
    this.usuarioService.obtenerUsuarios().subscribe(response => {
      this.usuarios = response.usuarios;
    });
  }

  abrirModalEditarUsuario(usuario:Usuario){
        // Abre el modal
        const dialogRef = this.dialog.open(EditarUsuarioFormComponent, {
          width: '400px', // Establece el ancho del modal
          data: { Usuario: usuario } // Pasa cualquier dato necesario al modal
        });
    
        // Escucha el evento de cierre del modal (puede ser útil si necesitas hacer algo después de cerrar el modal)
        dialogRef.afterClosed().subscribe(result => {
        });
  }


}
