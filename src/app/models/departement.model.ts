import { UUID } from 'angular2-uuid';
export class Departement {
    id: string;
    nom: string;
    parent?: Departement;

    constructor(nom: string, id?: string, parent?: Departement) {
        if (id) {
            this.id = id;
        } else {
            this.id = this.generateUID();
        }
        this.nom = nom;
        if (parent) {
            this.parent = parent;
        }
    }

    generateUID(): string {
        return 'DEPARTEMENT_' + UUID.UUID();
    }

}
