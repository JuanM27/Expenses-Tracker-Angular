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

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  async onLogin(){
    this.usuarioService.comprobarLogin(this.correo,this.contrasena).subscribe(
      (response) => {
        if(response.ok===true&&response.mensaje==="Login correcto"){
          this.router.navigate(["/home"])
        }else if(response.ok===false&&response.mensaje==="Error de login, usuario o contraseña incorrecto"){
          //Poner un div de usuario y contraseña incorrectos
          console.log("Usuario o contraseña incorrectos")
        }else{
          //Poner un div de error de servidor
        }
      }
    );
  }
}
