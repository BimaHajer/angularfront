import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHouseComponent } from './add-house/add-house.component';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { ListHouseComponent } from './list-house/list-house.component';
import { DeleteHouseComponent } from './delete-house/delete-house.component';

const routes: Routes = [
    { path: '', redirectTo: 'add-house', pathMatch: 'full' }, // Redirection vers la liste des locataires
      { path: 'add-house', component: AddHouseComponent },
      { path: 'update-house/:id', component: UpdateHouseComponent }, // Ajout de ":id" pour identifier le locataire à modifier
      { path: 'list-house', component: ListHouseComponent },
      { path: 'delete-house/:id', component: DeleteHouseComponent } 
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
