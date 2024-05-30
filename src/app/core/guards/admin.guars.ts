import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
        console.log("Es administrador en auth guard");
      return true;
    } else {
        console.log("No es administrador en auth guard");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
