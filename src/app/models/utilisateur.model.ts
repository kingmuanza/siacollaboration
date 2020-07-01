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
    date: Date;
    departement: Departement;
    connecteAuMoinsUneFois: boolean;

    constructor(noms?: string, prenoms?: string) {
        if (noms) {
            this.noms = noms;
        }
        if (prenoms) {
            this.prenoms = prenoms;
        }
        this.id = this.generateUID();
        this.connecteAuMoinsUneFois = false;
    }

    generateUID(): string {
        return 'UTILISATEUR_' + UUID.UUID();
    }
}
