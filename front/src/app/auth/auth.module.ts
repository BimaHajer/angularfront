import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    LoginComponent,
  
  ],
  imports: [
    CommonModule,ClrDatagridModule,
    AuthRoutingModule,FormsModule,ClarityModule,ReactiveFormsModule,
  ]

})
export class AuthModule { }
