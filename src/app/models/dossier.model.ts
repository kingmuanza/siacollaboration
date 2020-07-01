import { UUID } from 'angular2-uuid';
import { Utilisateur } from './utilisateur.model';
export class Dossier {
    id: string;
    nom: string;
    dossierParent: Dossier;
    date: Date;
    utilisateurs: Array<Utilisateur>;
    createur: Utilisateur;
    idutilisateurs: Array<string>;

    constructor(nom?: string) {
        this.id = this.generateUID();
        this.idutilisateurs = new Array<string>();
        if (nom) {
            this.nom = nom;
        }
        this.date = new Date();
    }

    generateUID(): string {
        return 'DOSSIER_' + UUID.UUID();
    }
}
