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
  camposIncompletos: boolean = false;
  contrasenasNoCoinciden: boolean = false;

  constructor(    
    private router: Router,
    private usuarioService: UsuarioService) { 
  }

  async onRegister(){
    this.camposIncompletos = false; // Reiniciar el valor de camposIncompletos
    this.contrasenasNoCoinciden = false; // Reiniciar el valor de contrasenasNoCoinciden

    // Verificar si algún campo está vacío
    if (!this.nombre || !this.correo || !this.contrasena || !this.confirmarContrasena) {
      this.camposIncompletos = true; // Establecer camposIncompletos a true si algún campo está vacío
      return; // Detener la ejecución de la función
    }

    // Verificar si las contraseñas no coinciden
    if (this.contrasena !== this.confirmarContrasena) {
      this.contrasenasNoCoinciden = true; // Establecer contrasenasNoCoinciden a true si las contraseñas no coinciden
      return; // Detener la ejecución de la función
    }
    console.log(this.contrasena);

    this.usuarioService.registrarUsuario(this.nombre,this.correo,this.contrasena,this.objetivo).subscribe(
      (response: any) => {
        console.log(response);
        if (response && response.mensaje === "Usuario creado") {
          this.router.navigate(['/home']); // Redirigir al usuario a /home
        }
      });
  }
}
