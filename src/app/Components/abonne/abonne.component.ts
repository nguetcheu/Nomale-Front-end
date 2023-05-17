import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Abonne } from 'src/app/models/Abonne.model';
import { AbonneService } from 'src/app/services/abonne.service';

@Component({
  selector: 'app-abonne',
  templateUrl: './abonne.component.html',
  styleUrls: ['./abonne.component.css'],
})
export class AbonneComponent implements OnInit {
  success!: string;
  public formAbonne!: FormGroup;
  public erreur!: string;
  abonnes: Abonne[] = [];
  abonne!: Abonne;
  rubriques!: any[];
  motivations!: any[];

  constructor(
    public fb: FormBuilder,
    private abonneService: AbonneService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formAbonne = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', Validators.required],
      profession: ['', Validators.required],
      rue: ['', Validators.required],
      code_postal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      id_table_rubrique: ['', Validators.required],
      id_motivation: ['', Validators.required],
    });

    this.http
      .get<any>('http://localhost:8000/api/rubrique')
      .subscribe((response) => {
        this.rubriques = response;
      });

      this.http
      .get<any>('http://localhost:8000/api/motivation')
      .subscribe((response) => {
        this.motivations = response;
      });

    this.chargementAbonne();
  }

  // récupration de l'observable (un tableauabonne) émis par le service
  private chargementAbonne() {
    this.abonneService.loadAbonne().subscribe(
      (data: Abonne[]) => {
        this.abonnes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    const r = new Abonne();
    r.nom = this.formAbonne.value.nom;
    r.prenom = this.formAbonne.value.prenom;
    r.age = this.formAbonne.value.age;
    r.sexe = 'M';
    r.profession = this.formAbonne.value.profession;
    r.rue = this.formAbonne.value.rue;
    r.code_postal = this.formAbonne.value.code_postal;
    r.ville = this.formAbonne.value.ville;
    r.pays = this.formAbonne.value.pays;
    r.telephone = this.formAbonne.value.telephone;
    r.email = this.formAbonne.value.email;
    r.id_table_rubrique = this.formAbonne.value.id_table_rubrique;
    r.id_motivation = this.formAbonne.value.id_motivation;
    this.abonneService.insertAbonne(r).subscribe(
      (data) => {
        console.log(data);
        this.formAbonne.reset();
        // recharger la liste des abonnés après insertion réussie
        this.chargementAbonne();
        this.affichageMessage();
      },
      (error) => {
        console.log(error);
        this.erreur = "Erreur lors de l'insertion de abonné.";
      }
    );
  }

  private affichageMessage() {
    setTimeout(() => {
      this.success = 'Insertion réussie';
      setTimeout(() => {
        this.success = '';
      }, 2000);
    }, 3000);
  }

  gotoEditAbonne(abonne: Abonne) {
    this.router.navigate(['/abonnes', abonne.id_abonne]);
  }

  deleteAbonne(id: number) {
    this.abonneService.deleteAbonne(id).subscribe(
      (data) => {
        console.log(data);
        // Supprimer abonne de la liste
        this.abonnes = this.abonnes.filter((r) => r.id_abonne !== id);
      },
      (error) => {
        console.log(error);
        this.erreur = 'Erreur lors de la suppression de abonne.';
      }
    );
  }
}
