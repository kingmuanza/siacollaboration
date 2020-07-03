import { Component, OnInit } from '@angular/core';
import { Information } from 'src/app/models/information.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-info-list',
  templateUrl: './info-list.component.html',
  styleUrls: ['./info-list.component.scss']
})
export class InfoListComponent implements OnInit {

  informations = new Array<Information>();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInformations();
  }

  nouveau() {
    this.router.navigate(['info', 'edit']);
  }

  ouvrir(info: Information) {
    this.router.navigate(['info', 'edit', info.id]);
  }

  getInformations() {
    this.informations = new Array<Information>();
    const db = firebase.firestore();
    db.collection('informations').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const info = resultat.data() as Information;
        this.informations.push(info);
      });
      this.informations = this.informations.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime() ? -1 : 1;
      });
    });
  }

}
