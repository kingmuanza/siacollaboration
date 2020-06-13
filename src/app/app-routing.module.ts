import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { CompteListComponent } from './pages/compte/compte-list/compte-list.component';
import { ServeurFichierComponent } from './pages/serveur/serveur-fichier/serveur-fichier.component';
import { ServeurBdComponent } from './pages/serveur/serveur-bd/serveur-bd.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { FichierTelechargesComponent } from './pages/fichier/fichier-telecharges/fichier-telecharges.component';
import { FichierListComponent } from './pages/fichier/fichier-list/fichier-list.component';
import { FichierEditComponent } from './pages/fichier/fichier-edit/fichier-edit.component';
import { FichierViewComponent } from './pages/fichier/fichier-view/fichier-view.component';
import { DossierListComponent } from './pages/dossier/dossier-list/dossier-list.component';
import { DossierEditComponent } from './pages/dossier/dossier-edit/dossier-edit.component';
import { DossierViewComponent } from './pages/dossier/dossier-view/dossier-view.component';
import { GroupeListComponent } from './pages/groupe/groupe-list/groupe-list.component';
import { GroupeEditComponent } from './pages/groupe/groupe-edit/groupe-edit.component';
import { GroupeViewComponent } from './pages/groupe/groupe-view/groupe-view.component';
import { FichierRecentComponent } from './pages/fichier/fichier-recent/fichier-recent.component';
import { DossierRecentComponent } from './pages/dossier/dossier-recent/dossier-recent.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'utilisateurs', component: CompteListComponent },
  { path: 'serveur-fichier', component: ServeurFichierComponent },
  { path: 'base-donnees', component: ServeurBdComponent },
  { path: 'notifications', component: NotificationsComponent },

  { path: 'fichier', component: FichierListComponent },
  { path: 'fichier/telechargees', component: FichierTelechargesComponent },
  { path: 'fichier/recents', component: FichierRecentComponent },
  { path: 'fichier/edit', component: FichierEditComponent },
  { path: 'fichier/edit/:id', component: FichierEditComponent },
  { path: 'fichier/view/:id', component: FichierViewComponent },

  { path: 'dossier', component: DossierListComponent },
  { path: 'dossier/recents', component: DossierRecentComponent },
  { path: 'dossier/edit', component: DossierEditComponent },
  { path: 'dossier/edit/:id', component: DossierEditComponent },
  { path: 'dossier/view/:id', component: DossierViewComponent },

  { path: 'groupe', component: GroupeListComponent },
  { path: 'groupe/edit', component: GroupeEditComponent },
  { path: 'groupe/edit/:id', component: GroupeEditComponent },
  { path: 'groupe/view/:id', component: GroupeViewComponent },

  { path: '**', redirectTo: 'connexion' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
