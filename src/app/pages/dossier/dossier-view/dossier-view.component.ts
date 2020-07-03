import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { metro } from 'metro4';
import { Dossier } from 'src/app/models/dossier.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import * as firebase from 'firebase';
import { ActivityService } from 'ng-metro4';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Fichier } from 'src/app/models/fichier.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dossier-view',
  templateUrl: './dossier-view.component.html',
  styleUrls: ['./dossier-view.component.scss']
})
export class DossierViewComponent implements OnInit {

  @ViewChild('dialogCreation', { static: true }) dialogCreation: metro.DialogComponent;
  @ViewChild('dialogModification', { static: true }) dialogModification: metro.DialogComponent;
  @ViewChild('dialogPartage', { static: true }) dialogPartage: metro.DialogComponent;

  @ViewChild('fileButton', { static: false }) fileButton;

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  nomDossier = '';
  DOSSIERS = new Array<Dossier>();
  dossiers = new Array<Dossier>();
  documents = new Array<Fichier>();
  DOCUMENTS = new Array<Fichier>();
  dossier: Dossier;
  form: FormGroup;
  utilisateurs: Array<Utilisateur>;
  utilisateur: Utilisateur;
  utilisateurSubscription: Subscription;
  arbre = new Array<Dossier>();

  fichiers: FileList;
  images = new Array<Blob>();
  liens = new Array<string>();

  recherche = '';
  totalTelecharge = 0;
  dejaTelecharge = 0;
  largeur = 0;

  constructor(
    private router: Router,
    private utilisateurService: UtilisateurService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  calculTelechargement() {
    if (this.totalTelecharge === 0) {
      this.largeur = 0;
    } else {
      if (this.largeur > 99) {
        this.largeur = 0;
      } else {
        this.largeur = Math.ceil((this.dejaTelecharge / this.totalTelecharge) * 100);
      }
    }
  }

  getArbre(dossier: Dossier): Array<Dossier> {
    console.log('get arbre');
    const arbre = new Array<Dossier>();
    let parent = dossier;
    while (parent) {
      console.log(parent.nom);
      arbre.unshift(parent);
      parent = parent.dossierParent;
    }
    return arbre;
  }

  generateLigneDossier() {
    const arbre = this.getArbre(this.dossier);
    let ligne = '';
    arbre.forEach((dossier) => {
      ligne = ligne + dossier.nom + '/';
    });
    return ligne;
  }

  ngOnInit(): void {
    this.initForm();
    this.refresh();
    this.utilisateurSubscription = this.utilisateurService.utilisateurSubject.subscribe((utilisateur) => {
      if (utilisateur) {
        this.utilisateur = utilisateur;
        this.refresh();
      } else {
      }
    });
  }

  refresh() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this.getDossier(id);
      this.getDossiers(id);
    });
    this.utilisateurService.getAll().then((utilisateurs) => {
      this.utilisateurs = utilisateurs;
    });
  }

  rechercher(event) {
    console.log(event);
    this.dossiers = this.DOSSIERS;
    this.documents = this.DOCUMENTS;
    if (event) {
      this.dossiers = this.dossiers.filter((dossier) => {
        return dossier.nom.toLowerCase().indexOf(event.toLowerCase()) !== -1;
      });
      this.documents = this.documents.filter((document) => {
        return document.nom.toLowerCase().indexOf(event.toLowerCase()) !== -1;
      });
    }
  }

  importer() {
    this.fileButton.nativeElement.click();
  }

  nouveauDossier() {
    this.dialogCreation.open();
  }

  dossierExist(nom: string): boolean {
    let existe = false;
    this.dossiers.forEach((dossier) => {
      if (dossier.nom === nom) {
        existe = true;
      }
    });
    return existe;
  }

  creerDossier() {
    console.log('Création du dossier');
    this.dialogCreation.close();
    if (this.nomDossier) {
      if (!this.dossierExist(this.nomDossier)) {
        const dossier = new Dossier(this.nomDossier);
        dossier.dossierParent = this.dossier;
        dossier.createur = this.utilisateur;
        const db = firebase.firestore();
        db.collection('dossiers').doc(dossier.id).set(JSON.parse(JSON.stringify(dossier))).then(() => {
          this.getDossiers(this.dossier.id);
          this.nomDossier = '';
        });
      } else {
        alert('Le dossier existe');
      }
    } else {
      alert('Veuillez entrer le nom du dossier');
    }
  }

  getDossier(id: string) {
    const db = firebase.firestore();
    db.collection('dossiers').doc(id).get().then((resultat) => {
      const dossier = resultat.data() as Dossier;
      this.dossier = dossier;
      this.arbre = this.getArbre(this.dossier);
    });
  }

  isImage(fichier: Fichier) {
    if (fichier.nom.indexOf('.jpg') !== -1) {
      return true;
    }
    return false;
  }

  getDossiers(id: string) {
    this.dossiers = new Array<Dossier>();
    this.documents = new Array<Fichier>();
    const db = firebase.firestore();
    db.collection('dossiers').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const dossier = resultat.data() as Dossier;
        if (dossier.dossierParent && dossier.dossierParent.id === id) {
          this.dossiers.push(dossier);
          this.DOSSIERS.push(dossier);
        }
      });
    });
    db.collection('fichiers').get().then((resultats) => {
      resultats.forEach((resultat) => {
        const document = resultat.data() as Fichier;
        if (document.dossier && document.dossier.id === id) {
          this.documents.push(document);
          this.DOCUMENTS.push(document);
        }
      });
    });
  }

  ouvrir(dossier: Dossier) {
    this.router.navigate(['dossier', 'view', dossier.id]);
  }

  renommer(dossier: Dossier) {
    console.log('dossier');
    console.log(dossier);
    this.dossier = dossier;
    this.initForm();
    this.dialogModification.open();
  }
  renommerBD(dossier: Dossier) {
    this.dialogModification.close();
  }

  partager(dossier: Dossier) {
    console.log('dossier');
    console.log(dossier);
    this.dossier = dossier;
    this.dialogPartage.open();
  }
  partagerBD(dossier: Dossier) {
    this.dialogPartage.open();
  }

  supprimer(dossier: Dossier) {
    const oui = confirm('Etes-vous sûr de vouloir supprimer le dossier ?');
    if (oui) {
      const db = firebase.firestore();
      db.collection('dossiers').doc(dossier.id).delete().then(() => {
        this.getDossiers(this.dossier.id);
      });
    }
  }


  initForm() {
    this.form = this.formBuilder.group({
      nom: [this.dossier ? this.dossier.nom : '', Validators.required]
    });

  }

  onSubmitForm() {
    const value = this.form.value;
    this.dossier.nom = value.nom;
    console.log(this.dossier);
    const db = firebase.firestore();
    db.collection('dossiers').doc(this.dossier.id).set(JSON.parse(JSON.stringify(this.dossier))).then(() => {
      this.dialogModification.close();
    });
  }


  /// Gestion des fichiers

  uploadFile(event: any) {
    console.log(event.target.files);
    this.fichiers = event.target.files;
    this.totalTelecharge = this.fichiers.length;
    this.dejaTelecharge = 0;
    this.calculTelechargement();
    if (event.target.files && event.target.files[0]) {
      for (let i = 0; i < this.fichiers.length; i++) {
        console.log('this.fichiers[i]');
        console.log(this.fichiers[i]);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.dejaTelecharge += 0.1;
          this.calculTelechargement();
          const resultat = e.target.result;
          console.log('resultat ' + i);
          console.log(resultat);
          const nomDocument = this.fichiers[i].name;
          const storageRef = firebase.storage().ref(this.generateLigneDossier() + nomDocument);
          const task = storageRef.put(this.fichiers[i]);
          const db = firebase.firestore();
          task.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
              this.dejaTelecharge += 0.7 * progress;
            },
            (error) => {
              console.log('error');
              console.log(error);
            },
            () => {
              console.log('data');
              this.calculTelechargement();
              const imageUrl = storageRef.getDownloadURL().then((url) => {
                const document = this.generateFichier(url, this.fichiers[i].name);
                document.taille = this.fichiers[i].size;
                document.type = this.fichiers[i].type;
                document.lastModified = this.fichiers[i].lastModified;
                this.dejaTelecharge += 0.1;
                this.calculTelechargement();
                document.createur = this.utilisateur;
                db.collection('fichiers').doc(document.id).set(JSON.parse(JSON.stringify(document))).then(() => {
                  this.dejaTelecharge += 0.1;
                  this.calculTelechargement();
                  this.documents.push(document);
                });
              });
            });
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  telecharger(document: Fichier) {
    alert(document.url);
  }

  save(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < this.fichiers.length; i++) {
        const fichier = this.fichiers[i];
        const storageRef = firebase.storage().ref(this.generateLigneDossier() + fichier.name);
        const task = storageRef.put(this.fichiers[i]);
        task.then((data) => {
          console.log('data');
          console.log(data);
          const imageUrl = storageRef.getDownloadURL().then((url) => {
            this.liens.push(url);
            this.documents.push(this.generateFichier(url, fichier.name));
            console.log('liens');
            console.log(this.liens);
            if (this.liens.length === this.fichiers.length) {
              resolve(this.liens);
            }
          });
        });
      }
    });
  }

  generateFichier(lien: string, nom: string) {
    const fichier = new Fichier();
    fichier.url = lien;
    fichier.nom = nom;
    fichier.dossier = this.dossier;
    return fichier;
  }

}
