import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendeurService {
  private apiUrl = 'http://localhost:3200/api/v1/vendeurs';

  constructor(private http: HttpClient) {}

  
  createVendeur(vendeurData: any): Observable<any> {
    return this.http.post(this.apiUrl, vendeurData, {
       
    });
  }
}
