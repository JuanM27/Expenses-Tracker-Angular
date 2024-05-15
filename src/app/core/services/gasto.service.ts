import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class GastoService {

  private idUsuario: number = parseInt(sessionStorage.getItem("usuario") || "0");
  private token: string = localStorage.getItem("token") ?? '';

  private apiUrl = environment.urlNode + 'gastos';
  private apiUrl1 = environment.urlNode+'gastos-categoria'

  constructor(private http: HttpClient, private router: Router) { }

  gastosUsuario(): Observable<any> {
    // Configurar las cabeceras de la petición con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${this.idUsuario}`, { headers });
  }

  obtenerGastosPorCategoria(idCategoria:number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${idCategoria}`, { headers });
  }
}
