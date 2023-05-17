import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motivation } from '../models/Motivation.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MotivationService {
  CREATE_MOTIVATION: string = 'http://localhost:8000/api/motivation';

  constructor(public http: HttpClient) {}

  // Création d'un observable qui va émettre une motivation qui sera souscris dans le composant motivation
  insertMotivation(motivation: Motivation): Observable<Motivation> {
    return this.http.post<Motivation>(this.CREATE_MOTIVATION, motivation);
  }

  // Création d'un observable qui va émettre un tableau de motivation qui sera souscris dans le composant motivation
  loadMotivation(): Observable<Motivation[]> {
    return this.http.get<Motivation[]>(this.CREATE_MOTIVATION);
  }

  // Création d'un observable qui va émettre une motivation
  updateMotivation(id: number, motivation: Motivation): Observable<Motivation> {
    const url = `${this.CREATE_MOTIVATION}/${id}`;
    return this.http.put<Motivation>(url, motivation);
  }

  // Création d'un observable qui va émettre une motivation qui sera souscris dans le composant motivation
  getMotivationById(id: number): Observable<Motivation> {
    return this.http.get<Motivation>(`${this.CREATE_MOTIVATION}/${id}`);
  }

  // Suppression d'une motivation grace a son id
  deleteMotivation(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.CREATE_MOTIVATION}/${id}`);
  }
}
