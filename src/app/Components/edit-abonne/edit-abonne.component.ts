import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Abonne } from 'src/app/models/Abonne.model';
import { AbonneService } from 'src/app/services/abonne.service';

@Component({
  selector: 'app-edit-abonne',
  templateUrl: './edit-abonne.component.html',
  styleUrls: ['./edit-abonne.component.css'],
})
export class EditAbonneComponent implements OnInit {
  success = '';
  abonneForm!: FormGroup;
  abonne: any;
  abonnes: Abonne[] = [];
  rubriques!: any[];
  motivations!: any[];
  constructor(
    private abonneService: AbonneService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.abonneForm = this.fb.group({
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

    const abonneId: string | null =
      this.route.snapshot.paramMap.get('id_abonne');

    this.abonneService.loadAbonne().subscribe((data: Abonne[]) => {
      this.abonnes = data;

      if (abonneId) {
        this.abonne = this.abonnes.find(
          (abonne: Abonne) => abonne.id_abonne == +abonneId
        );
        console.log(this.abonne);
      }
    });
  }

  // Méthode de mise a jour
  miseAjourAbonne(): void {
    this.abonneService.updateAbonne(this.abonne?.id_abonne, this.abonne).subscribe(
      (response) => {
        console.log(response);
        this.success = 'abonne infos mise a jour';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
