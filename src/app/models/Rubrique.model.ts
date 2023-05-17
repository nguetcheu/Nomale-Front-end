import { Newsletter } from './Newsletter';

export class Rubrique {
  public id_rubrique!: number;
  public nom!: string;
  public id_newsletter!: Newsletter;

  public constructor(...args: any[]) {}
}
