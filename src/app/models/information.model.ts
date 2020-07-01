import { Utilisateur } from './utilisateur.model';

export class Information {
    id: string;
    date: Date;
    titre: string;
    description: string;
    createur: Utilisateur;

    constructor(titre: string, description: string, utilisateur?: Utilisateur) {
        this.id = this.generateUID();
        this.date = new Date();
        if (titre) {
            this.titre = titre;
        }
        if (description) {
            this.description = description;
        }
        if (utilisateur) {
            this.createur = utilisateur;
        }
    }

    generateUID() {
        return new Date().toISOString().split('T')[0] + Math.floor(Math.random() * 1000000);
    }
}
