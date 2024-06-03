import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  isLoggedIn(): boolean {
    // Obtener el token almacenado en localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token está presente y no es nulo
    if (token) {
      // Decodificar el token para obtener la fecha de expiración
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      
      // Obtener la fecha de expiración del token
      const expirationDate = new Date(tokenPayload.exp * 1000); // Multiplicado por 1000 para convertir segundos a milisegundos
      
      // Verificar si la fecha de expiración es posterior a la fecha actual
      const isTokenValid = expirationDate > new Date();

      // Devolver true si el token es válido
      return isTokenValid;
    }

    // Devolver false si no hay token o si ha expirado
    return false;
  }

  logout(): void {
    // Eliminar el token almacenado en localStorage
    localStorage.removeItem('token');

    this.router.navigate(['/login']); // Si estás utilizando Angular Router
  }

  async isAdmin(): Promise<boolean> {
    const usuarioId = Number(sessionStorage.getItem("usuario"));
    try {
      const response = await this.usuarioService.buscarUsuario(usuarioId).toPromise();
      console.log("Response", response.data.Administrador);
      if (response.data.Administrador === true) {
        return true;
      }else{
        console.log("No es administrador");
        return false;
      }
    } catch (error) {
      console.error("Error verificando si es administrador", error);
      return false;
    }
  }

}
