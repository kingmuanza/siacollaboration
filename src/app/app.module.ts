import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMetro4Module } from 'node_modules/ng-metro4';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { MenuGaucheComponent } from './components/menu-gauche/menu-gauche.component';
import { CompteEditComponent } from './pages/compte/compte-edit/compte-edit.component';
import { CompteReninitPasseComponent } from './pages/compte/compte-reninit-passe/compte-reninit-passe.component';
import { CompteChangerPasseComponent } from './pages/compte/compte-changer-passe/compte-changer-passe.component';
import { CompteViewComponent } from './pages/compte/compte-view/compte-view.component';
import { CompteListComponent } from './pages/compte/compte-list/compte-list.component';
import { FichierEditComponent } from './pages/fichier/fichier-edit/fichier-edit.component';
import { FichierListComponent } from './pages/fichier/fichier-list/fichier-list.component';
import { FichierViewComponent } from './pages/fichier/fichier-view/fichier-view.component';
import { DossierViewComponent } from './pages/dossier/dossier-view/dossier-view.component';
import { DossierListComponent } from './pages/dossier/dossier-list/dossier-list.component';
import { DossierEditComponent } from './pages/dossier/dossier-edit/dossier-edit.component';
import { GroupeEditComponent } from './pages/groupe/groupe-edit/groupe-edit.component';
import { GroupeListComponent } from './pages/groupe/groupe-list/groupe-list.component';
import { GroupeViewComponent } from './pages/groupe/groupe-view/groupe-view.component';
import { ServeurFichierComponent } from './pages/serveur/serveur-fichier/serveur-fichier.component';
import { ServeurBdComponent } from './pages/serveur/serveur-bd/serveur-bd.component';
import { DossierRecentComponent } from './pages/dossier/dossier-recent/dossier-recent.component';
import { FichierRecentComponent } from './pages/fichier/fichier-recent/fichier-recent.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { FichierTelechargesComponent } from './pages/fichier/fichier-telecharges/fichier-telecharges.component';
import { PosteListComponent } from './pages/poste/poste-list/poste-list.component';
import { PosteEditComponent } from './pages/poste/poste-edit/poste-edit.component';
import { PosteViewComponent } from './pages/poste/poste-view/poste-view.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    MenuGaucheComponent,
    CompteEditComponent,
    CompteReninitPasseComponent,
    CompteChangerPasseComponent,
    CompteViewComponent,
    CompteListComponent,
    FichierEditComponent,
    FichierListComponent,
    FichierViewComponent,
    DossierViewComponent,
    DossierListComponent,
    DossierEditComponent,
    GroupeEditComponent,
    GroupeListComponent,
    GroupeViewComponent,
    ServeurFichierComponent,
    ServeurBdComponent,
    DossierRecentComponent,
    FichierRecentComponent,
    AccueilComponent,
    FichierTelechargesComponent,
    PosteListComponent,
    PosteEditComponent,
    PosteViewComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMetro4Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
