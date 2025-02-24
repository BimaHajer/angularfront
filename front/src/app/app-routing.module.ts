import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:"user",loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'locataire', loadChildren: () => import('./locataire/locataire.module').then(m => m.LocataireModule) },
  { path: '', redirectTo: '/locataire/list-locataire', pathMatch: 'full' },
  {path:"lessor",loadChildren:()=>import('./lessor/lessor.module').then(m=>m.LessorModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
