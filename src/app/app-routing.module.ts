import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonneComponent } from './Components/abonne/abonne.component';
import { EditAbonneComponent } from './Components/edit-abonne/edit-abonne.component';

const routes: Routes = [
  /* Gestion des routes de abonne*/
  { path: 'abonne_formulaire', component: AbonneComponent },
  { path: 'abonnes/:id_abonne', component: EditAbonneComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
