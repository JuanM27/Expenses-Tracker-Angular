import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-recuperar-contrasena-correo',
  templateUrl: './recuperar-contrasena-correo.component.html',
  styleUrls: ['./recuperar-contrasena-correo.component.css']
})
export class RecuperarContrasenaCorreoComponent {
  correo: string = "";
  errorFormato: boolean = false;
  mensaje: string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,) {
  }

  onRecuperarContrasena(){
    this.errorFormato = false;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.correo)) {
      this.errorFormato = true; // Establecer errorFormato a true si el formato del correo electrónico es inválido
      this.mensaje = "Por favor, introduce un correo electrónico válido.";
      return; // Detener la ejecución de la función
    }

    this.usuarioService.recuperarContrasenaCorreo(this.correo).subscribe(
      (response) => {
        console.log(response);
         if(response && response.message === 'Correo para recuperar contraseña enviado') {
          this.toastr.success('Correo enviado correctamente. Revisa tu bandeja de entrada.');
          // Restablecer el formulario o realizar otras acciones necesarias
        } else {
          this.mensaje = "Ocurrió un error. Por favor, inténtalo de nuevo.";
        }
      },
      (error) => {
        if(error.status === 404) {
          this.toastr.error('El correo electrónico no está registrado.');
        }else{
          this.mensaje = "Ocurrió un error. Por favor, inténtalo de nuevo.";
        }
      }
    );

  }
}
