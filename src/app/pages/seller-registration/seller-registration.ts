import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoutiqueService } from '../../services/boutique.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Vendeur } from '../../models/vendeur.model';
import { Boutique } from '../../models/boutique.model';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
  vendeurId!: number;
  sellerForm: FormGroup;
  shopForm: FormGroup;
  selectedFileName: string = '';
  isSubmitting = false;
  sellerCreated = false;
  stepError:string = '';

  constructor(private fb: FormBuilder, private boutiqueService: BoutiqueService) {
    // Étape 1 : Vendeur
    this.sellerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.required],
      photo: [null],
      photourl: [''],
      adresse: [''],
      email: ['', Validators.email],
    });

    // Étape 2 : Boutique
    this.shopForm = this.fb.group({
      libelle: ['', Validators.required],
      date_creation: [''],
      logourl: [''],
      logo: [null],
    });
  }

  // Étape 1 : créer vendeur
  onSubmitSeller(stepper: any) {
    if (this.sellerForm.valid) {
      const vendeurData: Vendeur = {
        nom: this.sellerForm.value.nom,
        prenom: this.sellerForm.value.prenom,
        tel: this.sellerForm.value.tel,
        photo: this.sellerForm.value.photo,
        photourl: this.sellerForm.value.photourl,
        adresse: this.sellerForm.value.adresse,
        email: this.sellerForm.value.email || null, // optionnel
      };

      // Appel au service
      this.boutiqueService.creerVendeur(vendeurData).subscribe({
        next: (res: Vendeur) => {
          this.isSubmitting = false;
          this.vendeurId = res.id!;
          this.sellerCreated = true;
          this.stepError = '';
          console.log('✅ Vendeur créé :', res);
          stepper.next(); // passe à la 2e étape
        },
        error: (err) => {
          this.isSubmitting = false;
          this.sellerCreated = false;
          this.stepError = 'Erreur lors de la création du vendeur. Veuillez réessayer.';
          
          console.error('❌ Erreur création vendeur :', err);
          alert('Erreur lors de la création du vendeur');
        },
      });
    } else {
      this.sellerForm.markAllAsTouched();
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }

  onStepChange(event: any, stepper: any) {
    if (event.selectedIndex === 1 && !this.sellerCreated) {
      this.stepError = 'Vous devez d’abord créer le vendeur avant de passer à l’étape suivante.';
      alert('Vous devez d’abord créer le vendeur avant de passer à l’étape suivante.');
      //  setTimeout(() => {
      //    stepper.selectedIndex = 0;
      //  }

      //  )
      stepper.selectedIndex = 0;
    }else{
      this.stepError = '';
    }
  }
  //methode pour gérer l'upload de la photo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.sellerForm.patchValue({ photo: file });
      this.sellerForm.get('photo')?.updateValueAndValidity();

      console.log(' Fichier sélectionné :', file.name);
    }
  }

  //methode pour gérer le logo

  onLogoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.shopForm.patchValue({ logo: file });
      this.shopForm.get('logo')?.updateValueAndValidity();
      console.log(' Logo sélectionné :', file.name);
    }
  }

  // Étape 2 : créer boutique
  onSubmitShop() {
    if (this.shopForm.valid) {
      const boutiqueData: Boutique = {
        libelle: this.shopForm.value.libelle,
        date_creation: this.shopForm.value.date_creation || new Date().toISOString(),
        logourl: this.shopForm.value.logourl,
        vendeur_id: this.vendeurId!,
      };

      this.boutiqueService.creerBoutique(boutiqueData).subscribe({
        next: (res: Boutique) => {
          console.log('✅ Boutique créée :', res);
          alert('Boutique créée avec succès !');
        },
        error: (err) => {
          console.error('❌ Erreur création boutique :', err);
          this.stepError = 'Erreur lors de la création de la boutique. Veuillez réessayer.';
          alert('Erreur lors de la création de la boutique');
        },
      });
    }
  }
}
