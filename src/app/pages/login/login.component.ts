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
        console.log(response);
      }
    );
  }
}
