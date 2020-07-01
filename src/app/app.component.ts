import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './models/utilisateur.model';
import { Subscription } from 'rxjs';
import { UtilisateurService } from './services/utilisateur.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'edfcameroun';

  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;

  constructor(private idService: UtilisateurService) {

    const firebaseConfig = {
      apiKey: 'AIzaSyAtlfcNTGfaYN24fUO0Q3TCEcn9htCvGt4',
      authDomain: 'edfcameroun.firebaseapp.com',
      databaseURL: 'https://edfcameroun.firebaseio.com',
      projectId: 'edfcameroun',
      storageBucket: 'edfcameroun.appspot.com',
      messagingSenderId: '350356658707',
      appId: '1:350356658707:web:845476d07749d0f3993de6',
      measurementId: 'G-RYW2Q9R31J'
    };
    firebase.initializeApp(firebaseConfig);

  }

  ngOnInit() {
    this.utilisateurSubscription = this.idService.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.idService.emit();
  }
}
