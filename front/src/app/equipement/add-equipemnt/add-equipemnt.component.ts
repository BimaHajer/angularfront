import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EquipementService } from '../equipement.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-equipmnt',
  templateUrl: './add-equipemnt.component.html',
  styleUrls: ['./add-equipemnt.component.css'],
})
export class AddEquipemntComponent {
  equipmentForm: FormGroup; // FormGroup to manage form data

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private equipementService: EquipementService
  ) {
    this.equipmentForm = this.fb.group({
      nom: ['', Validators.required], 
      description: ['', Validators.required], 
      icon: [null]
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.equipmentForm.patchValue({ icon: file }); 
      this.equipmentForm.get('icon')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.equipmentForm.invalid) {
      Swal.fire({
        title: 'Erreur !',
        text: 'Veuillez remplir tous les champs obligatoires.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.equipmentForm.get('nom')?.value);
    formData.append('description', this.equipmentForm.get('description')?.value);
    const file = this.equipmentForm.get('icon')?.value;
    if (file) {
      formData.append('image', file); // 'image' matches the backend's expected key
    }

    this.equipementService.addEquipement(formData).subscribe(
      (response) => {
        console.log('Équipement ajouté avec succès', response);

        // Show success alert using SweetAlert2
        Swal.fire({
          title: 'Succès !',
          text: 'L\'équipement a été ajouté avec succès.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Redirect to the equipment list after confirmation
          this.router.navigate(['./equipement/list-equipemnt']);
        });
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'équipement', error);

        // Show error alert
        Swal.fire({
          title: 'Erreur !',
          text: 'Une erreur est survenue lors de l\'ajout de l\'équipement.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      })

    }
    
  }

