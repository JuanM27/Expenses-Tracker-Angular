import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/core/services/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarUsuarioFormComponent } from '../editar-usuario-form/editar-usuario-form.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-administrador',
  templateUrl: './pagina-administrador.component.html',
  styleUrls: ['./pagina-administrador.component.css']
})
export class PaginaAdministradorComponent {

  usuarios:Usuario[] = [];
  usuariosFiltrados:Usuario[] = [];
  usuarioEditadoSubscription: Subscription;
  usuarioBorradoSubscription: Subscription;
  palabraBusqueda:string = "";


  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  cerrarSesion(){

    this.authService.logout();

  }

  ngOnInit(){
    this.obeterUsuarios();

    this.usuarioService.usuarioEditado$.subscribe(() => {
      this.obeterUsuarios(); 
    });

    this.usuarioService.usuarioBorrado$.subscribe(() => {
      this.obeterUsuarios(); 
    });
  }

  ngOnDestroy(): void {
    if (this.usuarioEditadoSubscription) {
      this.usuarioEditadoSubscription.unsubscribe();
    }

    if (this.usuarioBorradoSubscription) {
      this.usuarioBorradoSubscription.unsubscribe();
    }
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

  obeterUsuarios(){
    this.usuarioService.obtenerUsuarios().subscribe(response => {
      this.usuarios = response.usuarios;
      this.usuariosFiltrados = this.usuarios;
    });
  }

  borrarUsuario(idUsuario:number){
    this.usuarioService.borrarUsuario(idUsuario).subscribe(
      (response: any) => {
        if(response.mensaje==="Usuario eliminado correctamente"){
          this.toastr.success('Usuario eliminado correctamente', 'Usuario eliminado');
        }else{

          this.toastr.error('Error al eliminar el usuario', 'Error');
        }
      }
    );
  }

  filterUsuarios(): void {
    if (this.palabraBusqueda !== "") {
      this.usuariosFiltrados = this.usuarios.filter(usuario =>
        usuario.Nombre.toLowerCase().includes(this.palabraBusqueda.toLowerCase()) ||
        usuario.ID_Usuario.toString().includes(this.palabraBusqueda) || usuario.Correo.toLowerCase().includes(this.palabraBusqueda.toLowerCase())||usuario.Objetivo_Gasto.toString().includes(this.palabraBusqueda)
      );
    } else {
      this.usuariosFiltrados = this.usuarios;
    }
  }

}
