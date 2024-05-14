import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nombre: string = "";
  correo: string = "";
  contrasena: string = "";
  confirmarContrasena: string = "";
  objetivo!: number;
  errorFormato: boolean = false;
  mensaje: string = "";
  errorMensaje: string = '';
  campoError: boolean = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService) {
  }

  async onRegister() {
    this.errorFormato = false; // Reiniciar el valor de camposIncompletos
    this.campoError = false;

    // Verificar si algún campo está vacío
    if (!this.nombre || !this.correo || !this.contrasena || !this.confirmarContrasena) {
      this.errorFormato = true; // Establecer camposIncompletos a true si algún campo está vacío
      this.mensaje = "Por favor, completa todos los campos.";
      return; // Detener la ejecución de la función
    }

    // Verificar si las contraseñas no coinciden
    if (this.contrasena !== this.confirmarContrasena) {
      this.errorFormato = true; // Establecer contrasenasNoCoinciden a true si las contraseñas no coinciden
      this.mensaje = "Las constraseñas no coinciden";
      return; // Detener la ejecución de la función
    }

    // Verificar si el correo electrónico tiene un formato válido
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.correo)) {
      this.errorFormato = true; // Establecer errorFormato a true si el formato del correo electrónico es inválido
      this.mensaje = "Por favor, introduce un correo electrónico válido.";
      return; // Detener la ejecución de la función
    }

    this.usuarioService.registrarUsuario(this.nombre, this.correo, this.contrasena, this.objetivo).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.mensaje === "Usuario creado") {
          this.router.navigate(['/home']); // Redirigir al usuario a /home
          sessionStorage.setItem('usuario', response.data.ID_Usuario);
        }
      },
      (error) => {
        if (error.status === 409) {
          // Aquí manejas el error 409
          this.campoError = true;
          // Puedes mostrar un mensaje al usuario, por ejemplo, asignándolo a una variable en tu componente
          this.errorMensaje = 'Ya existe un usuario registrado con ese correo';
        } else {
          // Si hay otro tipo de error, puedes manejarlo aquí
          console.error('Error al registrar usuario:', error);
          // También podrías mostrar un mensaje de error genérico al usuario
          this.errorMensaje = 'Error al registrar usuario. Por favor, inténtelo de nuevo más tarde.';
        }
      }
    );

  }
}
