import { Injectable } from '@angular/core';
import { Dossier } from '../models/dossier.model';
import { Fichier } from '../models/fichier.model';
import { Utilisateur } from '../models/utilisateur.model';

@Injectable({
  providedIn: 'root'
})
export class FichierService {

  constructor() { }

  getFichiersDuDossier(dossier: Dossier): Promise<Array<Fichier>> {
    return new Promise((resolve, reject) => {

    });
  }

  getFichiersDelUtilisateur(utilisateur: Utilisateur): Promise<Array<Fichier>> {
    return new Promise((resolve, reject) => {

    });
  }

  getDossiersDelUtilisateur(utilisateur: Utilisateur): Promise<Array<Dossier>> {
    return new Promise((resolve, reject) => {

    });
  }

  nouveauDossier(dossier: Dossier): Promise<Dossier> {
    return new Promise((resolve, reject) => {

    });
  }

  nouveauFichier(fichier: Fichier): Promise<Fichier> {
    return new Promise((resolve, reject) => {

    });
  }

  modifierFichier(fichier: Fichier): Promise<Fichier> {
    return new Promise((resolve, reject) => {

    });
  }

  modifierDossier(dossier: Dossier): Promise<Dossier> {
    return new Promise((resolve, reject) => {

    });
  }
}
