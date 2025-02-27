import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CaracteristiqueService } from '../caracteristique.service';

@Component({
  selector: 'app-add-caracteristique',
  templateUrl: './add-caracteristique.component.html',
  styleUrls: ['./add-caracteristique.component.css']
})
export class AddCaracteristiqueComponent {
  caracteristique = {
    title: '',
    description: '',
    quantity: null,
    icon: null as File | null, 
  };

  constructor(private caracteristiqueService: CaracteristiqueService, private router: Router) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.caracteristique.icon = input.files[0];
    }
  }

  // Soumission du formulaire
  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.caracteristique.title);
    formData.append('description', this.caracteristique.description);
    if (this.caracteristique.icon) {
      formData.append('image', this.caracteristique.icon);
    }

    this.caracteristiqueService.addCharacteristics(formData).subscribe(
      (response) => {
        console.log('Caractéristique ajoutée avec succès', response);

        Swal.fire({
          title: 'Succès !',
          text: 'La caractéristique a été ajoutée avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/list-caracteristique']); 
        });
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la caractéristique', error);

        // Afficher une alerte d'erreur
        Swal.fire({
          title: 'Erreur !',
          text: 'Une erreur est survenue lors de l\'ajout de la caractéristique.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
