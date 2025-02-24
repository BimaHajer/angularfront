import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LessorService } from '../lessor.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
    @Input('selectedList') selectedList: any[] = [];
    
      @Output()
      close= new EventEmitter<boolean>()
      @Output()
      save= new EventEmitter<boolean>()
      constructor(private lessorService:LessorService){
    
      }
      closedEvent()
      {
        this.close.emit(true)
      }
      deletelist() {
        if (this.selectedList.length === 0) {
          console.warn("Aucun bailleur sélectionné !");
          return;
        }
      
        const locataireIds = this.selectedList.map(locataire => locataire.id);
        console.log("Bailleurs sélectionnés :", locataireIds);
      
        this.lessorService.deleteMultipleLessor(locataireIds).subscribe(data => {
          this.save.emit(true);
        });
      }

}
