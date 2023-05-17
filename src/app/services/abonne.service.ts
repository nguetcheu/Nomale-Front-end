import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonne } from '../models/Abonne.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AbonneService {
  CREATE_ABONNE: string = 'http://localhost:8000/api/abonne';

  constructor(public http: HttpClient) {}

  // Création d'un observable qui va émettre un abonne qui sera souscris dans le composant abonne
  insertAbonne(abonne: Abonne): Observable<Abonne> {
    return this.http.post<Abonne>(this.CREATE_ABONNE, abonne);
  }

  // Création d'un observable qui va émettre un tableau abonne qui sera souscris dans le composant abonne
  loadAbonne(): Observable<Abonne[]> {
    return this.http.get<Abonne[]>(this.CREATE_ABONNE);
  }

  // Création d'un observable qui va émettre un abonne
  updateAbonne(id: number, abonne: Abonne): Observable<Abonne> {
    const url = `${this.CREATE_ABONNE}/${id}`;
    return this.http.put<Abonne>(url, abonne);
  }

  // Création d'un observable qui va émettre un abonne qui sera souscris dans le composant Editabonne
  getAbonneById(id: number): Observable<Abonne> {
    return this.http.get<Abonne>(`${this.CREATE_ABONNE}/${id}`);
  }

  // Suppression d'un client grace a son id
  deleteAbonne(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.CREATE_ABONNE}/${id}`);
  }
}
