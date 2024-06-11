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
  
  // getMenu(menuId: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/menu/${menuId}`);
  // }

    getMenu(): Observable<any> {
    return this.http.get(`${this.apiUrl}/menu`);
  }


  vote(dishId: number, menuId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/vote`, { dishId, menuId });
  }

  getResults(menuId: number): Observable<any> {
    console.log('getResults');
    return this.http.get(`${this.apiUrl}/results/${menuId}`);
  }
}
