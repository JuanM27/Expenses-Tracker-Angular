import { Component, Inject } from '@angular/core';
import { PerfilComponent } from '../perfil/perfil.component';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/core/services/interfaces/usuario';

@Component({
  selector: 'app-imagen-perfil',
  templateUrl: './imagen-perfil.component.html',
  styleUrls: ['./imagen-perfil.component.css']
})
export class ImagenPerfilComponent {

  constructor(
    private usuarioService: UsuarioService,
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

}
