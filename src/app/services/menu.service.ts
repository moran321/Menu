import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = environment.apiUrl; // Use the environment variable

  constructor(private http: HttpClient) {}

  vote(dish: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, { id: dish });
  }

  getResults(): Observable<any> {
    return this.http.get(`${this.apiUrl}/results`);
  }
}
