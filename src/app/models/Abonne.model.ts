import { Motivation } from './Motivation.model';
import { Rubrique } from './Rubrique.model';

export class Abonne {
  public id_abonne!: number;
  public nom!: string;
  public prenom!: string;
  public age!: number;
  public sexe!: string;
  public profession!: string;
  public rue!: number;
  public code_postal!: string;
  public ville!: number;
  public pays!: string;
  public telephone!: number;
  public email!: string;
  public id_table_rubrique!: Rubrique;
  public id_motivation!: Motivation;

  public constructor(...args: any[]) {}
}
