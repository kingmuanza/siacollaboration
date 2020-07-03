import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  utilisateur: Utilisateur;
  utilisateurs = new Array<Utilisateur>();
  utilisateurSubject: Subject<Utilisateur>;

  constructor() {
    this.utilisateurSubject = new Subject();
  }

  emit() {
    this.utilisateurSubject.next(this.utilisateur);
  }


  signIn(email, passe): Promise<Utilisateur> {
    const db = firebase.firestore();
    console.log('email');
    console.log(email);
    console.log('passe');
    console.log(passe);
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs')
        .where('login', '==', email)
        .where('passe', '==', passe)
        .get().then((resultats) => {
          console.log('resultats');
          console.log(resultats);
          resultats.forEach((resultat) => {
            console.log('resultat');
            console.log(resultat);
            const utilisateur = resultat.data() as Utilisateur;
            this.utilisateur = utilisateur;
            this.emit();
            resolve(utilisateur);
          });
          reject(null);
        });
    });
  }

  signOut() {
    this.utilisateur = null;
    this.emit();
  }

  getAll(): Promise<Array<Utilisateur>> {
    const utilisateurs = new Array<Utilisateur>();
    const db = firebase.firestore();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const utilisateur = resultat.data() as Utilisateur;
          utilisateurs.push(utilisateur);
        });
        resolve(utilisateurs);
      });
    });
  }
}
