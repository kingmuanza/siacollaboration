import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import * as firebase from 'firebase';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Subscription } from 'rxjs';
import { Information } from 'src/app/models/information.model';
import { Dossier } from 'src/app/models/dossier.model';
import { Fichier } from 'src/app/models/fichier.model';
import { ContextMenuComponent } from 'ngx-contextmenu';

@Component({
  selector: 'app-compte-view',
  templateUrl: './compte-view.component.html',
  styleUrls: ['./compte-view.component.scss']
})
export class CompteViewComponent implements OnInit {


  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  informations = new Array<Information>();
  utilisateur: Utilisateur;
  dossiers = new Array<Dossier>();
  documents = new Array<Fichier>();
  edf = '../../../../assets/logoEDF.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.get(id);
        this.getDossiers(id);
        this.getInformations(id);
      }
    });
  }

  get(id: string) {
    const db = firebase.firestore();
    db.collection('utilisateurs').doc(id).get().then((resultat) => {
      const utilisateur = resultat.data() as Utilisateur;
      this.utilisateur = utilisateur;
      this.edf = utilisateur.photoURL ? utilisateur.photoURL : '../../../../assets/logoEDF.png';
    });
  }

  getInformations(id: string) {
    this.informations = new Array<Information>();
    const db = firebase.firestore();
    db.collection('informations').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const info = resultat.data() as Information;
        if (info.createur.id === id) {
          this.informations.push(info);
        }
      });
      this.informations = this.informations.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime() ? -1 : 1;
      });
    });
  }

  getDossiers(id: string) {
    this.dossiers = new Array<Dossier>();
    this.documents = new Array<Fichier>();
    const db = firebase.firestore();
    db.collection('dossiers').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const dossier = resultat.data() as Dossier;
        if (dossier.createur && dossier.createur.id === id) {
          this.dossiers.push(dossier);
        }
      });
    });
    db.collection('fichiers').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const document = resultat.data() as Fichier;
        if (document.createur && document.createur.id === id) {
          this.documents.push(document);
        }
      });
    });
  }

  ouvrirInformation(sujet) {
    this.router.navigate(['info', 'view', sujet.id]);
  }


  ouvrir(dossier: Dossier) {
    this.router.navigate(['dossier', 'view', dossier.id]);
  }


  isImage(fichier: Fichier) {
    if (fichier.nom.indexOf('.jpg') !== -1) {
      return true;
    }
    return false;
  }


  telecharger(document: Fichier) {
    alert(document.url);
  }

}
