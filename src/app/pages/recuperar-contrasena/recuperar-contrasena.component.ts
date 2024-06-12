import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent {
  contrasena: string = "";
  confirmarContrasena: string = "";
  errorFormato: boolean = false;
  mensaje: string = "";
  token: string = "";

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }


  onCambiarContrasena() {
    this.errorFormato = false;
    
    if (this.contrasena !== this.confirmarContrasena) {
      this.errorFormato = true; // Establecer contrasenasNoCoinciden a true si las contraseñas no coinciden
      this.mensaje = "Las constraseñas no coinciden";
      return; // Detener la ejecución de la función
    }

    this.usuarioService.cambiarContrasena(this.token, this.contrasena).subscribe(
      (response) => {
        if(response.mensaje==="Contraseña cambiada"){
          this.toastr.success('Contraseña cambiada correctamente');
        }
      },
      (error) => {
        // Manejar el error
        if (error.status === 400) {
          this.toastr.error('Token inválido');
        } else {
          this.toastr.error('Ocurrió un error. Por favor, inténtalo de nuevo.');
        }
      }
    );

  }
}
