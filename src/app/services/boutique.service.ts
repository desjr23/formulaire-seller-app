import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueService {
  private apiUrl = 'http://localhost:3200/api/v1/boutiques';

  constructor(private http: HttpClient) {}

  createBoutique(boutiqueData: any): Observable<any> {
    return this.http.post(this.apiUrl, boutiqueData, {
       
    });
  }
}
