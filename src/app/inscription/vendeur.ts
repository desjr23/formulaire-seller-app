
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VendeurService } from '../services/vendeur.service';
import { Vendeur } from '../models/vendeur.model';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vendeur.html',
  styleUrls: ['./vendeur.scss'],
})
export class Inscription {
  successMessage: string = '';
  errorMessage: string = '';

  sellerForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    email: new FormControl(''),
    adresse: new FormControl(''),
    photo: new FormControl(''),
  });

  constructor(private VendeurService: VendeurService) {}

  // getters pour le template
  get nom() {
    return this.sellerForm.get('nom');
  }
  get prenom() {
    return this.sellerForm.get('prenom');
  }
  get telephone() {
    return this.sellerForm.get('telephone');
  }
  get email() {
    return this.sellerForm.get('email');
  }
  get adresse() {
    return this.sellerForm.get('adresse');
  }
  get photo() {
    return this.sellerForm.get('photo');
  }

  onSubmit() {
    if (this.sellerForm.valid) {
      const vendeur: Vendeur = {
        nom: this.nom!.value!,
        prenom: this.prenom!.value!,
        telephone: this.telephone!.value!,
        email: this.email!.value?.trim() || undefined,
        adresse: this.adresse!.value?.trim() || undefined,
        photo: this.photo!.value?.trim() || undefined,
      };

      this.VendeurService.createVendeur(vendeur).subscribe({
        next: (res: Vendeur) => {
          console.log('Vendeur créé', res);
          this.successMessage = 'Vendeur créé avec succès !';

          this.sellerForm.reset(); // réinitialise le formulaire
        },
        error: (err: any) => {
          console.log('Erreur', err);
          this.errorMessage = 'Erreur lors de la création du vendeur.';
        },
      });
    } else {
      this.sellerForm.markAllAsTouched();
    }
  }
}
