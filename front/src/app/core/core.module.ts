import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    NavBarComponent
  ]
})
export class CoreModule { }
