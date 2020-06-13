import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;

  constructor(private router: Router, private idService: UtilisateurService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initConnexionForm();
    this.utilisateurSubscription = this.idService.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.idService.emit();
  }

  initConnexionForm() {
    this.connexionForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      passe: ['', [Validators.required]]
    });
  }

  onConnexionFormSubmit() {
    const valueForm = this.connexionForm.value;
    const email = valueForm.login;
    const passe = valueForm.passe;
    this.idService.signIn(email, passe).then(() => {
      console.log('Authentification réussie');
      this.router.navigate(['accueil']);
    });
  }

}
