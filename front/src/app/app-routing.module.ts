import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [{
  path:"user",loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'locataire', loadChildren: () => import('./locataire/locataire.module').then(m => m.LocataireModule) },
  { path: '', redirectTo: '/locataire/list-locataire', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
