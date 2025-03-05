import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HouseRoutingModule } from './house-routing.module';
import { AddHouseComponent } from './add-house/add-house.component';
import { ListHouseComponent } from './list-house/list-house.component';
import { DeleteHouseComponent } from './delete-house/delete-house.component';
import { UpdateHouseComponent } from './update-house/update-house.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importez ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AddHouseComponent,
    ListHouseComponent,
    DeleteHouseComponent,
    UpdateHouseComponent
  ],
  imports: [
    CommonModule,
    HouseRoutingModule,ReactiveFormsModule,HttpClientModule
  ]
})
export class HouseModule { }
