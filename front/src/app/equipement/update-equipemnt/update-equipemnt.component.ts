import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipementService } from '../equipement.service';

@Component({
  selector: 'app-update-equipment',
  templateUrl: './update-equipment.component.html',
})
export class UpdateEquipmentComponent implements OnInit {
  equipmentForm: FormGroup; 
  newImage: File | null = null; 
 id:number=0
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private equipementService: EquipementService
  ) {
    this.equipmentForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required], 
      image: [''], 
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    if (this.id) {
      this.equipementService.getEquipementById(this.id).subscribe((data) => {
        this.equipmentForm.patchValue({
          nom: data.nom,
          description: data.description,
          image: data.image,
        });
      });
    }
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.newImage = file; 
    }
  }

  onSubmit(): void {
    if (this.equipmentForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.equipmentForm.get('nom')?.value);
    formData.append('description', this.equipmentForm.get('description')?.value);

    if (this.newImage) {
      formData.append('image', this.newImage);
    }

    this.equipementService.updateEquipement(this.id,formData).subscribe(
      (response:any) => {
        console.log('Equipment updated successfully', response);
        this.router.navigate(['/equipements']);
      },
      (error:any) => {
        console.error('Error updating equipment', error);
      }
    );
  }
}
