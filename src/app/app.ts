import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Inscription } from './vendeur/vendeur';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, Inscription],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('formulaire');
}
