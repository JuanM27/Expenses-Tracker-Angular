import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'; // Importa el componente de la página

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a la ruta del login al inicio
  { path: 'login', component: LoginComponent }, // Define la ruta para el componente de login
  //
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
