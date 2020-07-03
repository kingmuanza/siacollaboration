import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Utilisateur } from './models/utilisateur.model';
import { Subscription } from 'rxjs';
import { UtilisateurService } from './services/utilisateur.service';
import * as firebase from 'firebase';
import { metro } from 'metro4';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('dialogConnexion', { static: false }) dialogConnexion: metro.DialogComponent;

  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;

  constructor(private idService: UtilisateurService, private router: Router) {

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

  ouvrirDialogue() {
    this.dialogConnexion.open();
  }

  ngOnInit() {
    console.log('this.dialogConnexion');
    console.log(this.dialogConnexion);
  }

  ngAfterViewInit() {
    console.log('this.dialogConnexion1');
    console.log(this.dialogConnexion);
    this.utilisateurSubscription = this.idService.utilisateurSubject.subscribe((utilisateur) => {
      if (utilisateur) {
        this.utilisateur = utilisateur;
        this.dialogConnexion.close();
      } else {
        console.log('this.dialogConnexion2');
        console.log(this.dialogConnexion);
        this.dialogConnexion.open();
      }
    });
    this.idService.emit();
  }

  deconnexion() {
    this.router.navigate(['']);
    this.idService.signOut();
  }
}
