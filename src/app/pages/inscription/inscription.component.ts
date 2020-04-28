import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  inscriptionForm: FormGroup;
  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;

  constructor(private router: Router, private idService: UtilisateurService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initInscriptionForm();
    this.utilisateurSubscription = this.idService.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.idService.emit();
    this.idService.signIn('email', 'passe').then(() => {
      console.log('Authentification réussie');
      this.router.navigate(['inscription']);
    });
  }

  initInscriptionForm() {
    this.inscriptionForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      passe: ['', [Validators.required]]
    });
  }

  onInscriptionFormSubmit() {
    const valueForm = this.inscriptionForm.value;
    const email = valueForm.login;
    const passe = valueForm.passe;
    this.idService.signIn(email, passe).then(() => {
      console.log('Authentification réussie');
      this.router.navigate(['inscription']);
    });
  }

}
