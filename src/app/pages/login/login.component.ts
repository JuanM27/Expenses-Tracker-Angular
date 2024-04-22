import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  async onLogin(farmacia: any){
    this.usuarioService.comprobarLogin(farmacia).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }
}
