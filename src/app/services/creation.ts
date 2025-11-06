import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoutiqueService {
  // URL l'API
  private apiUrl = 'http://localhost:3200/api/v1';

  constructor(private http: HttpClient) {}

  // // Créer un vendeur
  creerVendeur(vendeurData: any) {
    return this.http.post(`${this.apiUrl}/vendeurs`, vendeurData);
  }

  // // Créer une boutique
  creerBoutique(boutiqueData: any) {
    return this.http.post(`${this.apiUrl}/boutiques`, boutiqueData);
  }
}
