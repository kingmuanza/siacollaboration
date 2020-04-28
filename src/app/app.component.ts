import { Component, OnInit } from '@angular/core';
import { Utilisateur } from './models/utilisateur.model';
import { Subscription } from 'rxjs';
import { UtilisateurService } from './services/utilisateur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'edfcameroun';

  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;

  constructor(private idService: UtilisateurService) {

  }

  ngOnInit() {
    this.utilisateurSubscription = this.idService.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
    });
    this.idService.emit();
  }
}
