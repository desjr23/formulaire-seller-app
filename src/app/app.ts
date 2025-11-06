import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SellerRegistration } from './pages/seller-registration/seller-registration';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-root',
  standalone : true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatStepperModule,
    SellerRegistration
    
],


  
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('formulaire_seller_app');
}
