import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  correo: string = '';
  contrasena: string = '';
  usuarioContrasenaIncorrecto:boolean = false;
  mensajeError:string = "";

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }
  
  async onLogin() {
    this.usuarioContrasenaIncorrecto=false;
    this.usuarioService.comprobarLogin(this.correo, this.contrasena).subscribe(
      (response) => {
        if (response.ok === true && response.mensaje === "Login correcto") {
          this.router.navigate(["/home"]);
          sessionStorage.setItem('usuario', response.data.ID_Usuario);
        }
      },
      (error) => {
        if (error.status === 401) {
          this.usuarioContrasenaIncorrecto=true;
          this.mensajeError = 'Usuario y/o contraseña incorrectos';
        } else {
          this.usuarioContrasenaIncorrecto=true;
          console.error('Error al iniciar sesión:', error);
          // Por ejemplo, podrías mostrar un mensaje genérico al usuario
          this.mensajeError = 'Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
        }
      }
    );
  }
}
