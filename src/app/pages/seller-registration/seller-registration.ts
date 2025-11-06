import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoutiqueService } from '../../services/creation';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-seller-registration',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './seller-registration.html',
  styleUrls: ['./seller-registration.scss'],
})
export class SellerRegistration {
  vendeurId!: string;
  sellerForm: FormGroup;
  shopForm: FormGroup;

  constructor(private fb: FormBuilder, private sellerService: BoutiqueService) {
    // Étape 1 : Vendeur
    this.sellerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      photourl: [''],
      adresse: [''],
      email: ['',  Validators.email],
    });

    // Étape 2 : Boutique
    this.shopForm = this.fb.group({
      libelle: ['', Validators.required],
      date_creation: [''],
      logourl: [''],
    });
  }

  // Étape 1 : créer vendeur
  onSubmitSeller(stepper: any) {
    if (this.sellerForm.valid) {
      this.sellerService.creerVendeur(this.sellerForm.value).subscribe({
        next: (res: any) => {
          console.log('✅ Vendeur créé :', res);
          this.vendeurId = res.id || res.vendeur_id;
          stepper.next();
        },
        error: (err) => {
          console.error('❌ Erreur création vendeur :', err);
          alert('Erreur lors de la création du vendeur');
        },
      });
    } else {
      this.sellerForm.markAllAsTouched();
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }

  // Étape 2 : créer boutique
  onSubmitShop() {
    if (this.shopForm.valid) {
      const boutiqueData = {
        ...this.shopForm.value,
        vendeur_id: this.vendeurId,
      };

      this.sellerService.creerBoutique(boutiqueData).subscribe({
        next: (res: any) => {
          console.log('✅ Boutique créée :', res);
          alert('Boutique créée avec succès !');
        },
        error: (err) => {
          console.error('❌ Erreur création boutique :', err);
          alert('Erreur lors de la création de la boutique');
        },
      });
    } else {
      this.shopForm.markAllAsTouched();
      alert('Veuillez remplir les champs obligatoires de la boutique');
    }
  }
}
