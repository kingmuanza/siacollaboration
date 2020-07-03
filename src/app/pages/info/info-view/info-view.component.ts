import { Component, OnInit } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss']
})
export class InfoViewComponent implements OnInit {

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
    });
  }

  modifier(info) {
    this.router.navigate(['info', 'edit', info.id]);
  }

}
