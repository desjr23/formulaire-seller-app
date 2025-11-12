import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendeur } from '../models/vendeur.model';

@Injectable({
  providedIn: 'root',
})
export class VendeurService {
  private apiUrl = 'http://localhost:3200/api/v1';

  constructor(private http: HttpClient) {}

  createVendeur(sellerData: Vendeur): Observable<Vendeur> {
    return this.http.post<Vendeur>(`${this.apiUrl}/vendeurs`, sellerData);
  }
}
