import { Component, Inject } from '@angular/core';
import { Usuario } from 'src/app/core/services/interfaces/usuario';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent {

  constructor(
    private usuarioService: UsuarioService, 
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private toastr: ToastrService
    ) {}

  usuario: Usuario | undefined;
  imagenPerfil: string | null = null; 
  

  ngOnInit(): void {
    const idUsuario = Number(sessionStorage.getItem("usuario"));
    this.usuarioService.buscarUsuario(idUsuario).subscribe(
      (usuario: any) => {
        this.usuario = usuario.data;        
        // Llamar a obtenerImagenPerfil solo después de que se haya asignado this.usuario
        this.usuarioService.obtenerImagenPerfil(this.usuario?.ImagenPerfil).subscribe(
          (imagen: Blob) => {
            // Crear una URL para la imagen Blob
            const reader = new FileReader();
            reader.onload = (event: any) => {
              this.imagenPerfil = event.target.result;
            };
            reader.readAsDataURL(imagen);
          },
          (error) => {
            console.error('Error obteniendo la imagen de perfil:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  seleccionarImagen(event: any) {
    const fotos = event.target.files;
    if (fotos && fotos.length > 0) {
      this.subirImagen(fotos[0]);
    }
  }

  subirImagen(archivo:File){
    this.usuarioService.subirImagenPerfil(archivo).subscribe(
      (response) => {
        console.log(response);
        // Recargar la página después de subir la imagen
        this.document.location.reload();
      },
      (error) => {        
        console.error('Error al subir la imagen:', error);
        this.toastr.error('Error al cambiar la imagen!', 'Operación fallida');
      }
    );
  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil(this.usuario).subscribe(
      (response) => {
        console.log(response); // Manejo de la respuesta exitosa
        this.toastr.success('Perfil actualizado con éxito', 'Operación exitosa');
      },
      (error) => {
        console.error("Ocurrió un error al actualizar el perfil:", error); // Manejo del error
        this.toastr.error('Error al actualizar el perfil!', 'Operación fallida');
      }
    );
  }
}
