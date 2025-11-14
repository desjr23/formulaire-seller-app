import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VendeurService } from '../services/vendeur.service';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vendeur.html',
  styleUrls: ['./vendeur.scss'],
})
export class Inscription {
  successMessage = '';
  errorMessage = '';

  // Formulaire unique vendeur + boutique
  sellerBoutiqueForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    tel: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl(''),
    adresse: new FormControl(''),

    libelle: new FormControl('', Validators.required),
    date_creation: new FormControl(''),
  });

  constructor(private vendeurService: VendeurService) {}

  // Getters pour le template
  get nom() {
    return this.sellerBoutiqueForm.get('nom');
  }
  get prenom() {
    return this.sellerBoutiqueForm.get('prenom');
  }
  get tel() {
    return this.sellerBoutiqueForm.get('tel');
  }
  get email() {
    return this.sellerBoutiqueForm.get('email');
  }
  get adresse() {
    return this.sellerBoutiqueForm.get('adresse');
  }
  get libelle() {
    return this.sellerBoutiqueForm.get('libelle');
  }
  get date_creation() {
    return this.sellerBoutiqueForm.get('date_creation');
  }

  // Création vendeur et boutique
  onSubmit() {
    if (this.sellerBoutiqueForm.valid) {
      const payload = {
        nom: this.nom!.value!,
        prenom: this.prenom!.value!,
        tel: this.tel!.value!,
        email: this.email?.value || undefined,
        adresse: this.adresse?.value || undefined,
        boutique: {
          libelle: this.libelle!.value!,
          date_creation: this.date_creation?.value || undefined,
        },
      };

      this.vendeurService.createVendeur(payload).subscribe({
        next: (response) => {
          this.successMessage = 'Vendeur et boutique créés avec succès !';
          this.errorMessage = '';
          this.sellerBoutiqueForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la création du vendeur et de la boutique.';
          this.successMessage = '';
        },
      });
    } else {
      this.sellerBoutiqueForm.markAllAsTouched();
    }
  }
}
