import { UUID } from 'angular2-uuid';
import { Utilisateur } from './utilisateur.model';
export class Fichier {
    id: string;
    url: string;
    taille: string;
    extension: string;
    nom: string;
    utilisateurs: Array<Utilisateur>;
    createur: Utilisateur;

    constructor() {
        this.id = this.generateUID();
    }

    generateUID(): string {
        return 'FICHIER_' + UUID.UUID();
    }
}
