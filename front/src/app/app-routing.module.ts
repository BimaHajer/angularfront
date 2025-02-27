import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCaracteristiqueComponent } from './caracteristique/add-caracteristique/add-caracteristique.component';

const routes: Routes = [{
  path:"user",loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'locataire', loadChildren: () => import('./locataire/locataire.module').then(m => m.LocataireModule) },
  { path: '', redirectTo: '/locataire/list-locataire', pathMatch: 'full' },
  {path:"lessor",loadChildren:()=>import('./lessor/lessor.module').then(m=>m.LessorModule)},
  {path:"equipement",loadChildren:()=>import('./equipement/equipement.module').then(m=>m.EquipementModule)},

  {path: 'caracteristique', loadChildren: () => import('./caracteristique/caracteristique.module').then(m => m.CaracteristiqueModule)} 

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
