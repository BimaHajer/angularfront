import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../house.service';
import { EquipementService } from '../../equipement/equipement.service';
import { CaracteristiqueService } from '../../caracteristique/caracteristique.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BlockList } from 'node:net';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-house',
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css'],
})
export class AddHouseComponent implements OnInit {
  houseForm: FormGroup;
  equipements: any[] = [];
  selectedEquipements: any[] = [];
  characteristics: any[] = [];
  selectedCharacteristics: any = [];
  imageGroups: {
    houseId: number; previews: string[]; files: File[] 
}[] = [];
  dropdownOpen: Boolean=false;
  dropdownOpen1:boolean=false
  dropdownEquipementsOpen: boolean=false;

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private equipementService: EquipementService,
    private characteristicService: CaracteristiqueService,
    private router: Router
  ) {
    this.houseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      availability: ['oui', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEquipements();
    this.loadCharacteristics();
  }

  loadEquipements(): void {
    this.equipementService.getEquipements().subscribe((data) => {
      this.equipements = data;
    });
  }

  loadCharacteristics(): void {
    this.characteristicService.getCharacteristics().subscribe((data) => {
      this.characteristics = data;
      // console.log("data",data)
    });
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
}


selectEquipement(equipement: any) {
  this.selectedEquipements.push(equipement);
  console.log("this.selectedCharacteristics.",this.selectedEquipements)
  this.dropdownOpen1 = false;
}
toggleDropdownEquipement() {
  this.dropdownOpen1 = !this.dropdownOpen1;
}


toggleEquipementsDropdown() {
  this.dropdownEquipementsOpen = !this.dropdownEquipementsOpen;
}

selectCharacteristic(characteristic: any) {
    this.selectedCharacteristics.push(characteristic);
    console.log("this.selectedCharacteristics.",this.selectedCharacteristics)
    this.dropdownOpen = false;
}

  addEquipement(event: any): void {
    const value = event.target.value;
    if (value && !this.selectedEquipements.includes(value)) {
      this.selectedEquipements.push(value);
    }
  }

  removeEquipement(index: number): void {
    this.selectedEquipements.splice(index, 1);
  }

  addCharacteristic(event: any): void {
    const value = event.target.value;
    if (value && !this.selectedCharacteristics.includes(value)) {
      this.selectedCharacteristics.push(value);
    }
  }

  removeCharacteristic(index: number): void {
    this.selectedCharacteristics.splice(index, 1);
  }
  

  addImageGroup(): void {
    this.imageGroups.push({
      previews: [], files: [],
      houseId: 0
    });
  }

  removeImageGroup(index: number): void {
    this.imageGroups.splice(index, 1);
  }

  onFileChange(event: any, groupIndex: number): void {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (file.size > 0 && file.type.startsWith('image/')) {
          this.imageGroups[groupIndex].files.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageGroups[groupIndex].previews.push(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          Swal.fire('Erreur', 'Veuillez télécharger des images valides', 'error');
        }
      }
    }
  }

  removeImage(groupIndex: number, imageIndex: number): void {
    this.imageGroups[groupIndex].previews.splice(imageIndex, 1);
    this.imageGroups[groupIndex].files.splice(imageIndex, 1);
  }
  async uploadImages(): Promise<string[]> {
    const imageUrls: string[] = [];

    for (const group of this.imageGroups) {
      for (const file of group.files) {
        const formData = new FormData();
        formData.append('file', file);


        // try {
        //   const response = await fetch(cloudinaryUrl, {
        //     method: 'POST',
        //     body: formData,
        //   });
        //   const data = await response.json();
        //   if (data.secure_url) {
        //     imageUrls.push(data.secure_url);
        //   } else {
        //     throw new Error('No secure_url in response');
        //   }
        // } catch (error) {
        //   console.error('Cloudinary Error:', error);
        //   throw error;
        // }
      }
    }
    formatDate
    console.log("imageUrls",imageUrls)
    return imageUrls;
  }

  async onSubmit(): Promise<void> {
    if (this.houseForm.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
  
    try {
      const uploadedImages = await this.uploadImages();
      console.log("uploadedImages", uploadedImages);
  
      const houseData = {
        ...this.houseForm.value,
        equipements: this.selectedEquipements,
        characteristics: this.selectedCharacteristics,
        pictures: uploadedImages,
      };
  console.log(houseData)
      this.houseService.create(houseData).subscribe(
        async (data) => {
          Swal.fire('Succès', 'Maison ajoutée avec succès', 'success');
  
          for (const picture of this.imageGroups) {
            picture.houseId = data.id;
            await this.houseService.addPicture(picture).subscribe(
              (picture) => {
                console.log("picture", picture);
              },
              (error) => {
                console.error("Error adding picture", error);
              }
            );
          }
  
          this.router.navigate(['/houses']);
        },
        (error) => {
          console.error("Error creating house", error);
        }
      );
    } catch (error) {
      console.error("Error uploading images", error);
    }
  }
}  
            
  
   



