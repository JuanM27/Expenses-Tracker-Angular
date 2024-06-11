import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  private apiUrl = environment.urlNode + 'gastos';
  private apiUrl1 = environment.urlNode + 'gastos-categoria';
  private apiUrl2 = environment.urlNode + 'nuevoGasto';
  private apiUrl3 = environment.urlNode + 'gasto';
  private apiUrl4 = environment.urlNode + 'exportarpdf';
  private apiUrl5 = environment.urlNode + 'exportarexcel';
  private apiUrl6 = environment.urlNode + 'exportarcsv';

  // Subject para emitir el nuevo gasto agregado
  private gastoAgregadoSubject: Subject<any> = new Subject<any>();
  private gastoBorradoSource = new Subject<void>();
  private gastoEditadoSource = new Subject<void>();

  gastoBorrado$ = this.gastoBorradoSource.asObservable();
  gastoEditado$ = this.gastoEditadoSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  gastosUsuario(): Observable<any> {
    const idUsuario = parseInt(sessionStorage.getItem("usuario") || "0");
    const token = localStorage.getItem("token") ?? '';
    
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/${idUsuario}`, { headers });
  }

  obtenerGastosPorCategoria(idCategoria: number): Observable<any>{
    const idUsuario = parseInt(sessionStorage.getItem("usuario") || "0");
    const token = localStorage.getItem("token") ?? '';

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<any>(`${this.apiUrl1}/${idCategoria}`, { headers });
  }

  crearGasto(gasto: any): Observable<any>{
    const idUsuario = parseInt(sessionStorage.getItem("usuario") || "0");
    const token = localStorage.getItem("token") ?? '';

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.post<any>(`${this.apiUrl2}/${idUsuario}`, gasto, {headers})
      .pipe(
        tap((nuevoGasto: any) => this.gastoAgregadoSubject.next(nuevoGasto))
      );
  }

  gastoAgregado(): Observable<any> {
    return this.gastoAgregadoSubject.asObservable();
  }

  borrarGasto(idGasto: number) {
    const token = localStorage.getItem("token") ?? '';
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.delete(`${this.apiUrl3}/${idGasto}`, {headers}).pipe(
      tap(() => this.gastoBorradoSource.next())
    );
  }

  obtenerGastoPorId(idGasto: number): Observable<any> {
    const token = localStorage.getItem("token") ?? '';
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<any>(`${this.apiUrl3}/${idGasto}`, {headers});
  }

  editarGasto (gasto: any): Observable<any> {
    const token = localStorage.getItem("token") ?? '';
    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.put(`${this.apiUrl3}/${gasto.ID_Gasto}`, gasto, {headers}).pipe(
      tap(() => {
        this.gastoEditadoSource.next();
      })
    );
  }

  exportarGastoPdfFormComponent(datos: any): Observable<Blob> {
    const idUsuario = parseInt(sessionStorage.getItem("usuario") || "0");
    const token = localStorage.getItem("token") ?? '';

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.post(`${this.apiUrl4}/${idUsuario}`, datos, {
      headers: headers,
      responseType: 'blob'
    });
  }

  exportarGastoExcelFormComponent(datos: any): Observable<Blob> {
    const idUsuario = parseInt(sessionStorage.getItem("usuario") || "0");
    const token = localStorage.getItem("token") ?? '';

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.post(`${this.apiUrl5}/${idUsuario}`, datos, {
      headers: headers,
      responseType: 'blob'
    });
  }

  exportarGastoCSVFormComponent(datos: any): Observable<Blob> {
    const idUsuario = parseInt(sessionStorage.getItem("usuario") || "0");
    const token = localStorage.getItem("token") ?? '';

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.post(`${this.apiUrl6}/${idUsuario}`, datos, {
      headers: headers,
      responseType: 'blob'
    });
  }
}
