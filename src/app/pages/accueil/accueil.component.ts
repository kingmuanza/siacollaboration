import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { metro } from 'metro4';
import { Dossier } from 'src/app/models/dossier.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Information } from 'src/app/models/information.model';
import * as firebase from 'firebase';
import { ActivityService } from 'ng-metro4';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  @ViewChild('dialogCreation', { static: true }) dialogCreation: metro.DialogComponent;
  @ViewChild('dialogModification', { static: true }) dialogModification: metro.DialogComponent;
  @ViewChild('dialogPartage', { static: true }) dialogPartage: metro.DialogComponent;
  nomDossier = '';
  dossiers = new Array<Dossier>();
  dossier: Dossier;
  form: FormGroup;
  utilisateurs: Array<Utilisateur>;
  informations = new Array<Information>();

  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    public activityService: ActivityService,
    private formBuilder: FormBuilder
  ) {
    for (let i = 0; i < 5; i++) {
      this.informations.push(new Information('Exemple de titre', 'Exemple de description', new Utilisateur('Pierre', 'Emmanuel')));
    }

  }

  ngOnInit(): void {
    this.getDossiers();
    this.initForm();
    this.utilisateurService.getAll().then((utilisateurs) => {
      this.utilisateurs = utilisateurs;
    });
  }

  importer() {

  }

  ouvrirInformation(sujet) {

  }

  nouveauDossier() {
    this.dialogCreation.open();
  }

  dossierExist(nom: string): boolean {
    let existe = false;
    this.dossiers.forEach((dossier) => {
      if (dossier.nom === nom) {
        existe = true;
      }
    });
    return existe;
  }

  creerDossier() {
    console.log('Création du dossier');
    this.dialogCreation.close();
    if (this.nomDossier) {
      if (!this.dossierExist(this.nomDossier)) {
        const dossier = new Dossier(this.nomDossier);
        const db = firebase.firestore();
        db.collection('dossiers').doc(dossier.id).set(JSON.parse(JSON.stringify(dossier))).then(() => {
          this.getDossiers();
          this.nomDossier = '';
        });
      } else {
        alert('Le dossier existe');
      }
    } else {
      alert('Veuillez entrer le nom du dossier');
    }
  }

  getDossiers() {
    const activity = this.activityService.open({
      style: 'color',
      text: 'Loading ...',
      type: 'simple'
    });
    this.dossiers = new Array<Dossier>();
    const db = firebase.firestore();
    db.collection('dossiers').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const dossier = resultat.data() as Dossier;
        if (dossier.dossierParent) {

        } else {
          this.dossiers.push(dossier);
        }
      });
      this.activityService.close(activity);
    });
  }

  ouvrir(dossier: Dossier) {
    this.router.navigate(['dossier', 'view', dossier.id]);
  }

  renommer(dossier: Dossier) {
    console.log('dossier');
    console.log(dossier);
    this.dossier = dossier;
    this.initForm();
    this.dialogModification.open();
  }
  renommerBD(dossier: Dossier) {
    this.dialogModification.close();
  }

  partager(dossier: Dossier) {
    console.log('dossier');
    console.log(dossier);
    this.dossier = dossier;
    this.dialogPartage.open();
  }
  partagerBD(dossier: Dossier) {
    this.dialogPartage.open();
  }

  supprimer(dossier: Dossier) {
    const oui = confirm('Etes-vous sûr de vouloir supprimer le dossier ?');
    if (oui) {
      const db = firebase.firestore();
      db.collection('dossiers').doc(dossier.id).delete().then(() => {
        this.getDossiers();
      });
    }
  }


  initForm() {
    this.form = this.formBuilder.group({
      nom: [this.dossier ? this.dossier.nom : '', Validators.required]
    });

  }

  onSubmitForm() {
    const value = this.form.value;
    this.dossier.nom = value.nom;
    console.log(this.dossier);
    const db = firebase.firestore();
    db.collection('dossiers').doc(this.dossier.id).set(JSON.parse(JSON.stringify(this.dossier))).then(() => {
      this.dialogModification.close();
    });
  }

}
