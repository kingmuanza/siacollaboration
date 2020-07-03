import { Component, OnInit } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.scss']
})
export class InfoEditComponent implements OnInit {

  info: Information;
  form: FormGroup;
  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private idService: UtilisateurService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.get(id);
      }
    });

    this.utilisateurSubscription = this.idService.utilisateurSubject.subscribe((utilisateur) => {
      if (utilisateur) {
        this.utilisateur = utilisateur;
      }
    });
  }

  get(id) {
    const db = firebase.firestore();
    db.collection('informations').doc(id).get().then((resultat) => {
      this.info = resultat.data() as Information;
      this.initForm();
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      titre: [this.info ? this.info.titre : '', [Validators.required]],
      description: [this.info ? this.info.description : '', [Validators.required]],
    });
  }

  onSubmitForm() {
    const value = this.form.value;
    console.log('value');
    console.log(value);
    const titre = value.titre;
    const description = value.description;

    const info = new Information(titre, description, this.utilisateur);

    const db = firebase.firestore();
    db.collection('informations').doc(info.id).set(JSON.parse(JSON.stringify(info))).then(() => {
      this.router.navigate(['info']);
    });
  }

}
