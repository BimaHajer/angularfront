import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserADDComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
  {path:"add-user",component:UserADDComponent},
  {path:"update-user/:id",component:UserUpdateComponent},
  {path:"list-user",component:UserListComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
