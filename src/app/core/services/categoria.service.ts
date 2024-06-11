import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Categoria } from './interfaces/categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private apiUrl = environment.urlNode+'categoria';

  private categoriaAnadidaSource = new Subject<void>();
  private categoriaEditadaSource = new Subject<void>();
  private categoriaBorradaSource = new Subject<void>();

  categoriaAnadida$ = this.categoriaAnadidaSource.asObservable();
  categoriaEditada$ = this.categoriaEditadaSource.asObservable();
  categoriaBorrada$ = this.categoriaBorradaSource.asObservable();

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  obtenerCategorias(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }

  crearCategoria(categoria: Categoria): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    });

    return this.http.post<any>(this.apiUrl, categoria, { headers }).pipe(
      tap(() => {
        this.categoriaAnadidaSource.next();
      })
    );
  }

  editarCategoria(categoria: Categoria): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    });

    return this.http.put<any>(this.apiUrl+"/"+categoria.ID_Categoria, categoria, { headers }).pipe(
      tap(() => {
        this.categoriaEditadaSource.next();
      })
    );
  }

  borrarCategoria(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    });

    return this.http.delete<any>(this.apiUrl+"/"+id, { headers }).pipe(
      tap(() => {
        this.categoriaBorradaSource.next();
      })
    );
  }
}
