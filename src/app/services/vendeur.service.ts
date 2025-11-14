import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendeurService {
  private apiUrl = 'http://localhost:3200/api/v1/vendeurs';

  constructor(private http: HttpClient) {}

  // ✅ Le backend attend du JSON, pas de FormData
  createVendeur(vendeurData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, vendeurData, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
