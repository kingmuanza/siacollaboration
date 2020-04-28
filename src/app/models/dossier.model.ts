import { UUID } from 'angular2-uuid';
import { Utilisateur } from './utilisateur.model';
export class Dossier {
    id: string;
    nom: string;
    dossierParent: Dossier;
    date: Date;
    utilisateurs: Array<Utilisateur>;
    createur: Utilisateur;

    constructor() {
        this.id = this.generateUID();
    }

    generateUID(): string {
        return 'DOSSIER_' + UUID.UUID();
    }
}
