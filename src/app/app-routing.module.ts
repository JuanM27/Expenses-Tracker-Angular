import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // Importa el componente de la página
import { LandingComponent } from './pages/landing/landing.component'; // Importa el componente de la página
import { HomeComponent } from './pages/home/home.component'; // Importa el componente de la página
import { GastosComponent } from './pages/gastos/gastos.component'; // Importa el componente de la página
import { RegisterComponent } from './pages/register/register.component'; // Importa el componente de la página
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AuthGuard } from './core/guards/auth.guards';
import { PaginaAdministradorComponent } from './pages/pagina-administrador/pagina-administrador.component';
import { AdminGuard } from './core/guards/admin.guars';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena/recuperar-contrasena.component';
import { RecuperarContrasenaCorreoComponent } from './pages/recuperar-contrasena-correo/recuperar-contrasena-correo.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' }, // Redirige a la ruta del login al inicio
  { path: 'login', component: LoginComponent }, // Define la ruta para el componente de login
  { path: 'landing', component: LandingComponent}, // Define la ruta para el componente de landingç
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, // Define la ruta para el componente de home
  { path: 'register', component: RegisterComponent}, // Define la ruta para el componente de register
  { path: 'gastos', component: GastosComponent,canActivate: [AuthGuard]},// Define la ruta para el componente de register
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'administrador', component: PaginaAdministradorComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [AuthGuard, AdminGuard] },
  {path: 'cambiar-contrasena/:token', component: RecuperarContrasenaComponent},
  {path: 'recuperar-contrasena-correo', component: RecuperarContrasenaCorreoComponent}

  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
