import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VendeurService } from '../services/vendeur.service';
import { BoutiqueService } from '../services/boutique.service';
import { Vendeur } from '../models/vendeur.model';
import { Boutique } from '../models/boutique.model';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vendeur.html',
  styleUrls: ['./vendeur.scss'],
})
export class Inscription {
  successMessage = '';
  errorMessage = '';
  vendeurCree: any = null;

  // --- Formulaires ---
  sellerForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    tel: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl('', Validators.email),
    adresse: new FormControl(''),
  });

  boutiqueForm = new FormGroup({
    libelle: new FormControl('', Validators.required),
    date_creation: new FormControl(''),
  });

  constructor(private vendeurService: VendeurService, private boutiqueService: BoutiqueService) {}

  // --- Getters pour le template ---
  get nom() {
    return this.sellerForm.get('nom');
  }
  get prenom() {
    return this.sellerForm.get('prenom');
  }
  get tel() {
    return this.sellerForm.get('tel');
  }
  get email() {
    return this.sellerForm.get('email');
  }
  get adresse() {
    return this.sellerForm.get('adresse');
  }
  get libelle() {
    return this.boutiqueForm.get('libelle');
  }
  get date_creation() {
    return this.boutiqueForm.get('date_creation');
  }

  // --- Création vendeur ---
  onSubmitVendeur() {
    this.clearMessages();

    if (this.sellerForm.invalid) {
      this.sellerForm.markAllAsTouched();
      return;
    }

    const vendeur: Vendeur = {
      nom: this.nom!.value!,
      prenom: this.prenom!.value!,
      tel: this.tel!.value!,
      email: this.email?.value || undefined,
      adresse: this.adresse?.value || undefined,
    };

    this.vendeurService.createVendeur(vendeur).subscribe({
      next: (vendeurCree) => {
        this.vendeurCree = vendeurCree;
        this.successMessage = `Vendeur "${vendeurCree.nom}" créé avec succès !`;
        this.sellerForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la création du vendeur. Vérifiez les champs.';
      },
    });
  }

  // --- Création boutique ---
  onSubmitBoutique() {
    this.clearMessages();

    if (!this.vendeurCree) {
      this.errorMessage = 'Veuillez créer un vendeur avant de créer la boutique.';
      return;
    }

    if (this.boutiqueForm.invalid) {
      this.boutiqueForm.markAllAsTouched();
      return;
    }

    const boutique: Boutique & { vendeur_id: string } = {
      libelle: this.libelle!.value!,
      date_creation: this.date_creation?.value || undefined,
      vendeur_id: this.vendeurCree.vendeur_id,
    };

    this.boutiqueService.createBoutique(boutique).subscribe({
      next: (boutiqueCree) => {
        this.successMessage = `Boutique "${boutiqueCree.libelle}" créée avec succès pour le vendeur "${this.vendeurCree.nom}" !`;
        this.boutiqueForm.reset();
        this.vendeurCree = null; // reset flow pour nouveau vendeur
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la création de la boutique.';
      },
    });
  }

  // --- Helper pour nettoyer les messages ---
  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
