import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private idUsuario: number = parseInt(sessionStorage.getItem("usuario") || "0");
  private token: string = localStorage.getItem("token") ?? '';

  private apiUrl = environment.urlNode + 'gastos';
  private apiUrl1 = environment.urlNode + 'gastos-categoria'; // Endpoint corregido
  private apiUrl2 = environment.urlNode + 'nuevoGasto';
  private apiUrl3 = environment.urlNode + 'gasto';
  // Subject para emitir el nuevo gasto agregado
  private gastoAgregadoSubject: Subject<any> = new Subject<any>();
  private gastoBorradoSource = new Subject<void>();
  gastoBorrado$ = this.gastoBorradoSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  gastosUsuario(): Observable<any> {
    // Configurar las cabeceras de la petición con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${this.idUsuario}`, { headers });
  }

  obtenerGastosPorCategoria(idCategoria: number): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.get<any>(`${this.apiUrl1}/${idCategoria}`, { headers }); // Corregido el endpoint
  }

  crearGasto(gasto: any): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    // Realizar la petición para crear el gasto
    return this.http.post<any>(`${this.apiUrl2}/${this.idUsuario}`, gasto, {headers})
      .pipe(
        // Enviar el nuevo gasto emitido a través del Subject
        tap((nuevoGasto: any) => this.gastoAgregadoSubject.next(nuevoGasto))
      );
  }

  // Método para suscribirse al Observable de gasto agregado
  gastoAgregado(): Observable<any> {
    return this.gastoAgregadoSubject.asObservable();
  }

  borrarGasto(idGasto: number) {
    const headers = new HttpHeaders({
      'Authorization': `${this.token}`
    });

    return this.http.delete(`${this.apiUrl3}/${idGasto}`, {headers}).pipe(
      tap(() => this.gastoBorradoSource.next()) // Emitir evento después de borrar el gasto
    );
  }
}
