import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vendeur } from '../models/vendeur.model';
import { Boutique } from '../models/boutique.model';


@Injectable({
  providedIn: 'root',
})
export class BoutiqueService {
  // URL l'API
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Créer un vendeur
  creerVendeur(vendeurData: any) {
    return this.http.post<Vendeur>(`${this.apiUrl}/vendeurs`, vendeurData);
  }

   // Créer une boutique
  creerBoutique(boutiqueData: any) {
    return this.http.post<Boutique>(`${this.apiUrl}/boutiques`, boutiqueData);
  }
}
