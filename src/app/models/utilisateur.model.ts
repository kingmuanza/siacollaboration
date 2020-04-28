import { UUID } from 'angular2-uuid';
import { Departement } from './departement.model';

export class Utilisateur {
    id: string;
    login: string;
    passe: string;
    noms: string;
    prenoms: string;
    poste: string;
    photoURL: string;
    role: string;
    date: string;
    departement: Departement;
    connecteAuMoinsUneFois: boolean;

    constructor() {
        this.id = this.generateUID();
        this.connecteAuMoinsUneFois = false;
    }

    generateUID(): string {
        return 'UTILISATEUR_' + UUID.UUID();
    }
}
