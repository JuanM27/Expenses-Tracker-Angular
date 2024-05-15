import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Categoria } from './interfaces/categoria';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService {

  private apiUrl = environment.urlNode+'categoria';

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  obtenerCategorias(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    });

    return this.http.get<any>(this.apiUrl, { headers });
  }
}
