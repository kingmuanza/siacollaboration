import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { Router } from '@angular/router';
import { ActivityService } from 'ng-metro4';

@Component({
  selector: 'app-compte-edit',
  templateUrl: './compte-edit.component.html',
  styleUrls: ['./compte-edit.component.scss']
})
export class CompteEditComponent implements OnInit {

  @ViewChild('fileButton', { static: false }) fileButton;
  form: FormGroup;
  file: File;
  photoURL: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public activityService: ActivityService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      login: ['', Validators.required],
      passe: ['', Validators.required],
      confirm: ['', Validators.required],
      noms: ['', Validators.required],
      prenoms: [],
      photoURL: [],
      role: ['', Validators.required],
      poste: [],
      departement: []
    });
  }

  onSubmitForm() {
    const value = this.form.value;
    console.log(value);
    if (value.passe === value.confirm) {
      const utilisateur = new Utilisateur();
      utilisateur.departement = value.departement;
      utilisateur.login = value.login;
      utilisateur.noms = value.noms;
      utilisateur.passe = value.passe;
      utilisateur.poste = value.poste;
      utilisateur.prenoms = value.prenoms;
      utilisateur.role = value.role;
      utilisateur.date = new Date();
      utilisateur.connecteAuMoinsUneFois = false;

      const activity = this.activityService.open({
        style: 'color',
        text: 'Loading ...',
        type: 'simple'
      });
      const db = firebase.firestore();
      if (this.file) {
        this.saveImage().then((url) => {
          utilisateur.photoURL = url;
          db.collection('utilisateurs').doc(utilisateur.id).set(JSON.parse(JSON.stringify(utilisateur))).then(() => {
            this.activityService.close(activity);
            this.router.navigate(['compte']);
          });
        });
      } else {
        db.collection('utilisateurs').doc(utilisateur.id).set(JSON.parse(JSON.stringify(utilisateur))).then(() => {
          this.activityService.close(activity);
          this.router.navigate(['compte']);
        });
      }
    } else {
      alert('Les mots de passe ne sont pas identiques');
    }
  }


  uploadFile(event: any) {
    console.log(event.target.files);

    this.file = event.target.files.item(0);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.photoURL = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  galerie() {
    this.fileButton.nativeElement.click();
  }

  saveImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      const storageRef = firebase.storage().ref('profilePictures/' + this.file.name);
      storageRef.put(this.file).then((data) => {
        storageRef.getDownloadURL().then((url) => {
          resolve(url);
        });
      });
    });
  }

}
