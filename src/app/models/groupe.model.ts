import { UUID } from 'angular2-uuid';
import { Utilisateur } from './utilisateur.model';

export class Groupe {
    id: string;
    nom: string;
    utilisateurs: Array<Utilisateur>;
    createur: Utilisateur;
    date: Date;

    constructor() {
        this.id = this.generateUID();
    }

    generateUID(): string {
        return 'GROUPE_' + UUID.UUID();
    }
}
