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
import { CompteEditComponent } from './pages/compte/compte-edit/compte-edit.component';
import { CompteViewComponent } from './pages/compte/compte-view/compte-view.component';
import { BlancheComponent } from './pages/blanche/blanche.component';
import { InfoListComponent } from './pages/info/info-list/info-list.component';
import { InfoEditComponent } from './pages/info/info-edit/info-edit.component';
import { InfoViewComponent } from './pages/info/info-view/info-view.component';
import { InfoMesComponent } from './pages/info/info-mes/info-mes.component';
import { DepartementListComponent } from './pages/departement/departement-list/departement-list.component';
import { DepartementEditComponent } from './pages/departement/departement-edit/departement-edit.component';
import { DepartementViewComponent } from './pages/departement/departement-view/departement-view.component';
import { PosteListComponent } from './pages/poste/poste-list/poste-list.component';
import { PosteEditComponent } from './pages/poste/poste-edit/poste-edit.component';
import { PosteViewComponent } from './pages/poste/poste-view/poste-view.component';


const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: BlancheComponent },
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
  { path: 'dossierrecents', component: DossierRecentComponent },
  { path: 'dossier/edit', component: DossierEditComponent },
  { path: 'dossier/edit/:id', component: DossierEditComponent },
  { path: 'dossier/view/:id', component: DossierViewComponent },

  { path: 'groupe', component: GroupeListComponent },
  { path: 'groupe/edit', component: GroupeEditComponent },
  { path: 'groupe/edit/:id', component: GroupeEditComponent },
  { path: 'groupe/view/:id', component: GroupeViewComponent },

  { path: 'poste', component: PosteListComponent },
  { path: 'poste/edit', component: PosteEditComponent },
  { path: 'poste/edit/:id', component: PosteEditComponent },
  { path: 'poste/view/:id', component: PosteViewComponent },

  { path: 'compte', component: CompteListComponent },
  { path: 'compte/edit', component: CompteEditComponent },
  { path: 'compte/edit/:id', component: CompteEditComponent },
  { path: 'compte/view/:id', component: CompteViewComponent },

  { path: 'departement', component: DepartementListComponent },
  { path: 'departement/edit', component: DepartementEditComponent },
  { path: 'departement/edit/:id', component: DepartementEditComponent },
  { path: 'departement/view/:id', component: DepartementViewComponent },

  { path: 'info', component: InfoListComponent },
  { path: 'info/edit', component: InfoEditComponent },
  { path: 'info/edit/:id', component: InfoEditComponent },
  { path: 'infomiennes', component: InfoMesComponent },
  { path: 'infomiennes/:id', component: InfoMesComponent },
  { path: 'info/view/:id', component: InfoViewComponent },

  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
