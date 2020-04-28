import { Injectable } from '@angular/core';
import { Departement } from '../models/departement.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor() { }

  getAll(): Promise<Array<Departement>> {
    const departements = new Array<Departement>();
    const dg = new Departement('Direction Générale', '0', null);
    const dt = new Departement('Direction Technique', '1', dg);
    const drh = new Departement('Direction Générale', '2', dg);
    const dfc = new Departement('Direction Générale', '3', dg);
    departements.push(dg);
    departements.push(dt);
    departements.push(drh);
    departements.push(dfc);

    return new Promise((resolve, reject) => {
      resolve(departements);
    });
  }
}
