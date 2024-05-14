import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
