import { UUID } from 'angular2-uuid';
import { Utilisateur } from './utilisateur.model';
import { Dossier } from './dossier.model';
export class Fichier {
    id: string;
    url: string;
    taille: number;
    extension: string;
    type: string;
    nom: string;
    utilisateurs: Array<Utilisateur>;
    createur: Utilisateur;
    date: Date;
    dossier: Dossier;
    lastModified: number;

    constructor() {
        this.id = this.generateUID();
        this.date = new Date();
    }

    generateUID(): string {
        return 'FICHIER_' + UUID.UUID();
    }
}
