import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './interfaces/usuario';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private usuario:Usuario | null = null;

  private apiUrl = environment.urlNode+'login';
  
  constructor(private http: HttpClient) { }

  comprobarLogin(correo: string, contrasena:string): Observable<Usuario> {
    console.log("Hemos entrado en el servicio");
    let datosCobinados = {
      Correo: correo,
      Contrasena: contrasena
    }
    return this.http.post<Usuario>(this.apiUrl, datosCobinados).pipe(
      map((response: any) => this.usuario = response['data'] as Usuario));
  }
}