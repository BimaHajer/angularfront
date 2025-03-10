import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCaracteristiqueComponent } from './add-caracteristique/add-caracteristique.component';
import { ListCaracteristiqueComponent} from './list-caracteristique/list-caracteristique.component'
import { UpdateCaracteristiqueComponent } from './update-caracteristique/update-caracteristique.component';
import { DeleteCaracteristiqueComponent } from './delete-caracteristique/delete-caracteristique.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'list-caracteristique', pathMatch: 'full'  ,canActivate: [AuthGuard]}, 
  { path: 'add-caracteristique', component: AddCaracteristiqueComponent ,canActivate: [AuthGuard] },
  { path: 'update-caracteristique/:id', component: UpdateCaracteristiqueComponent ,canActivate: [AuthGuard]},
  { path: 'list-caracteristique', component: ListCaracteristiqueComponent ,canActivate: [AuthGuard] },
  { path: 'delete-caracteristique', component: DeleteCaracteristiqueComponent , canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaracteristiqueRoutingModule { }
