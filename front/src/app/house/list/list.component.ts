import { Component, OnInit } from '@angular/core';
import { HouseService } from '../house.service';
import { House } from '../house';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent  implements OnInit {
    houses: House[] = [];
    selectAll: boolean = false;
    selectedhouses: House[] = [];
    isButtonDisabled: boolean = true;
    close: boolean=false;
  
    constructor(
      private houseService:HouseService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.loadhouses();
    }
  
    loadhouses() {
      this.houseService.getAllHouses().subscribe(
        (data) => {
          this.houses = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des équipements', error);
        }
      );
    }
      toggleSelectAll() {
      this.houses.forEach((house) => (house.selected = this.selectAll));
      this.onCheckboxChange();
    }
    onCheckboxChange() {
      this.selectedhouses = this.houses.filter((house) => house.selected);
      this.isButtonDisabled = this.selectedhouses.length === 0;
    }
    editRouter() {
      const selectedIds = this.selectedhouses.map((house) => house.id);
      if (selectedIds.length === 1) {
        this.router.navigate(['/house/update-house', selectedIds[0]]);
      } else {
        console.log('Modifier les équipements sélectionnés:', selectedIds);
      }
    }
  
    actionClose(){
      this.close=false
    }
    actionSave(){
      this.close=false
      this.loadhouses()
    }
    actionOpen(){
      this.close=true
      console.log("close", this.close)
     
    }
  

}
