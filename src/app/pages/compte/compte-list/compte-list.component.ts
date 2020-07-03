import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subject } from 'rxjs';
import { DATATABLES_OPTIONS_LANGUAGE } from 'src/app/data/datatable.options.language';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.scss']
})
export class CompteListComponent implements OnInit {

  dtTrigger = new Subject();
  dtOptions = {
    dom: 'Bfrtip',
    buttons: [
      {
        text: 'Nouveau',
        action: (e, dt, node, config) => {
          this.create();
        },
        className: 'button muanza'
      },
      {
        text: 'Actualiser',
        action: (e, dt, node, config) => {
          this.refresh();
        },
        className: 'button muanza'
      },
      { extend: 'print', text: 'Imprimer', className: 'button muanza' },
      { extend: 'excel', text: 'Export vers Excel', className: 'button muanza' },
    ],
    language: DATATABLES_OPTIONS_LANGUAGE
  };

  utilisateurs = new Array<Utilisateur>();

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.dtTrigger = new Subject();
    this.getAll().then(() => {
      this.dtTrigger.next();
    });
  }

  getAll() {
    const db = firebase.firestore();
    this.utilisateurs = new Array<Utilisateur>();
    return new Promise((resolve, reject) => {
      db.collection('utilisateurs').get().then((resultats) => {
        resultats.forEach((resultat) => {
          const utilisateur = resultat.data() as Utilisateur;
          this.utilisateurs.push(utilisateur);
        });
        resolve(this.utilisateurs);
      });
    });
  }

  create() {
    this.router.navigate(['compte', 'edit']);
  }

  edit(utilisateur: Utilisateur) {
    this.router.navigate(['compte', 'edit', utilisateur.id]);
  }

  view(utilisateur: Utilisateur) {
    this.router.navigate(['compte', 'view', utilisateur.id]);
  }

  delete() {
    const oui = confirm('Etes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (oui) {

    }
  }


}
