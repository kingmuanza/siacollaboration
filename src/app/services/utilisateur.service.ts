import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  utilisateur: Utilisateur;
  utilisateurSubject: Subject<Utilisateur>;

  constructor() {
    this.utilisateurSubject = new Subject();
  }

  emit() {
    this.utilisateurSubject.next(this.utilisateur);
  }


  signIn(email, passe): Promise<Utilisateur> {
    return new Promise((resolve, reject) => {
      const utilisateur = new Utilisateur();
      this.utilisateur = utilisateur;
      this.emit();
      resolve(utilisateur);
    });
  }

  signOut() {
    this.utilisateur = null;
  }
}
