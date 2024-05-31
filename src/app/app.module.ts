import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { GraficaBarrasComponent } from './pages/grafica-barras/grafica-barras.component';
import { GraficaDonutComponent } from './pages/grafica-donut/grafica-donut.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { TablaGastosComponent } from './pages/tabla-gastos/tabla-gastos.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
<<<<<<< HEAD
import { PaginaAdministradorComponent } from './pages/pagina-administrador/pagina-administrador.component';

=======
import { ImagenPerfilComponent } from './pages/imagen-perfil/imagen-perfil.component';
>>>>>>> 047d96e89a353ea19471ffa41c8eb888c6039051

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    HomeComponent,
    RegisterComponent,
    GastosComponent,
    SidebarComponent,    
<<<<<<< HEAD
    GraficaBarrasComponent, GraficaDonutComponent, PerfilComponent, TablaGastosComponent, PaginaAdministradorComponent,
=======
    GraficaBarrasComponent, GraficaDonutComponent, PerfilComponent, TablaGastosComponent, ImagenPerfilComponent
    
>>>>>>> 047d96e89a353ea19471ffa41c8eb888c6039051
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ 
    provideAnimations(), 
    provideToastr(), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
