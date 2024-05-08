import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // Importa el componente de la página
import { LandingComponent } from './pages/landing/landing.component'; // Importa el componente de la página
import { HomeComponent } from './pages/home/home.component'; // Importa el componente de la página

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' }, // Redirige a la ruta del login al inicio
  { path: 'login', component: LoginComponent }, // Define la ruta para el componente de login
  {path: 'landing', component: LandingComponent}, // Define la ruta para el componente de landingç
  {path: 'home', component: HomeComponent} // Define la ruta para el componente de home
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
