import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAdmin = await this.authService.isAdmin();
    if (isAdmin) {
      console.log("Usuario es administrador");
      return true;
    } else {
      console.log("Usuario no es administrador");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
