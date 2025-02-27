import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';  // ✅ Pour ngModel
@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,  // ✅ Importé pour utiliser [(ngModel)]
    AppRoutingModule,
    CoreModule,
    RouterModule,HttpClientModule,RouterModule,FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
