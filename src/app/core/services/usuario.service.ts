import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './interfaces/usuario';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private usuario:Usuario | null = null;
  private token:string = "";

  private apiUrl = environment.urlNode+'login';
  private apiUrl1 = environment.urlNode+'registrar';
  private apiUrl2 = environment.urlNode+'autorizado';
  
  constructor(private http: HttpClient,
    private router: Router
  ) { }

  comprobarLogin(correo: string, contrasena:string): Observable<any> {
    let datosCobinados = {
      Correo: correo,
      Contrasena: contrasena
    }
    return this.http.post<any>(this.apiUrl, datosCobinados).pipe(
      tap((response: any) => {
        //revisar porque asi no se manjean los errores !!!!OJOOOO
        if(response.ok===true&&response.mensaje==="Login correcto"){
          // Aquí puedes almacenar el usuario y el token en tus variables respectivas
          this.usuario = response.data as Usuario;
          this.token = response.token; // Suponiendo que el token está en la propiedad 'token' de la respuesta
          // Además, puedes almacenar el token en el almacenamiento local o en la sesión del navegador
          localStorage.setItem('token', this.token); // Almacenando el token en el almacenamiento local
        }else if(response.ok===false&&response.mensaje==="Error de login, usuario o contraseña incorrecto"){
          //Poner un div de usuario y contraseña incorrectos
          console.log("Usuario o contraseña incorrectos")
        }else{
          //Poner un div de error de servidor
        }
      })
    );
  }

  registrarUsuario(nombre:string, correo:string, contrasena:string, objetivo:number){
    let datosCombinados = {
      Nombre: nombre,
      Correo: correo,
      Contrasena: contrasena,
      Objetivo: objetivo
    }
    return this.http.post<Usuario>(this.apiUrl1,datosCombinados);
  }

}