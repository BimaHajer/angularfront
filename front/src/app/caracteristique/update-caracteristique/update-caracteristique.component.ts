import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaracteristiqueService } from '../caracteristique.service';
import { Caracteristique } from '../caracteristique';

@Component({
  selector: 'app-update-caracteristique',
  templateUrl: './update-caracteristique.component.html',
  styleUrls: ['./update-caracteristique.component.css']
})
export class UpdateCaracteristiqueComponent implements OnInit {
  caracteristique: Caracteristique = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date().toISOString(),  
  };
  newImage: File | null = null;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private caracteristiqueService: CaracteristiqueService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && !isNaN(+id)) {  
      this.caracteristiqueService.getCharacteristicById(+id).subscribe(
        (data: Caracteristique) => {  
          this.caracteristique = data;
        },
        (error: any) => {  
          console.error('Erreur lors du chargement de la caractéristique', error);
        }
      );
    } else {
      console.error('ID invalide ou non défini');
      this.router.navigate(['/caracteristiques']);
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.newImage = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.caracteristique.id === 0 || !this.caracteristique.id) {
      console.error('ID invalide, impossible de mettre à jour');
      return; 
    }
  
    const formData = new FormData();
    formData.append('nom', this.caracteristique.title);
    formData.append('description', this.caracteristique.description);
  
    if (this.newImage) {
      formData.append('image', this.newImage);
    } else {
      formData.append('image', this.caracteristique.image); 
    }
  
    this.caracteristiqueService.updateCharacteristic(this.caracteristique.id, formData).subscribe(
      (response: any) => {  
        console.log('Caractéristique mise à jour avec succès', response);
        this.router.navigate(['/caracteristique']);
      },
      (error: any) => {  
        console.error('Erreur lors de la mise à jour de la caractéristique', error);
      }
    );
  }
  
}
