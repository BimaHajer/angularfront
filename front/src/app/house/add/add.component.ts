import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../house.service';
import { Router } from '@angular/router';
import { CaracteristiqueService } from '../../caracteristique/caracteristique.service';
import { EquipementService } from '../../equipement/equipement.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  currentStep: number = 1;
  maxSteps: number = 3;
  isFinalStep: boolean = false;
  msg: string=""
  show: boolean=false;
  showError: boolean=false;
  houseForm!: FormGroup;
  characteristics:any
  equipements:any
  pictures:any
  arrayCharacteristics: any;
  arrayEquipements: any;
  pictureArray: any;
  desableDefCheck!: boolean;
  alert!: string;
  tailleInvalid: boolean=false;
  filesize!: number;
  filename!: string;
  constructor(private fb: FormBuilder,private houseService:HouseService ,    private equipementService: EquipementService, private router:Router,private characteristicService: CaracteristiqueService,) { 
  this.houseForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    location: ['', Validators.required],
    city: ['', Validators.required],
    poste_code: ['', [Validators.required, Validators.pattern('^[0-9]{4,5}$')]], 
    price: [0, [Validators.required, Validators.min(0)]],
    availability: [null],
    equipments: this.fb.array([]), 
    characteristics: this.fb.array([]),
    pictures: this.fb.array([])
  });

 }
ngOnInit(): void {
  this.getAllCharacteristics();
  this.loadEquipements();
}
    goToPreviousStep(): void {
       if (this.currentStep > 1) {
         this.currentStep--;
       }
     }
   
     goToNextStep(): void {
      console.log(this.houseForm.value)
       if (this.currentStep < this.maxSteps) {
         this.currentStep++;
       }
     }

     getAllCharacteristics(): void {
      this.characteristicService.getCharacteristics().subscribe({
        next: (data) => {
          this.characteristics = data;
        },
        error: (err) => {
          console.error('Error fetching characteristics:', err);
        }
      });
    }
    loadEquipements() {
      this.equipementService.getEquipements().subscribe(
        (data) => {
          this.equipements = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des équipements', error);
        }
      );
    }
    onSelect(event: Event): void {
      const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
      this.arrayCharacteristics = Array.from(selectedOptions).map((option: any) => option.value);
      console.log('Selected Characteristics:', this.arrayCharacteristics);
    }
    onSelectEquipement(event: Event): void {
      const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
      this.arrayEquipements = Array.from(selectedOptions).map((option: any) => option.value);
      console.log('Selected Characteristics:', this.arrayEquipements);
    }
    /* start upload image*/
    picked(event:any) {
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];
        this.filename = file.name;
        this.filesize = file.size;
        if (this.filesize > 100000) {
          this.tailleInvalid = true;
          return
        }
        this.tailleInvalid = false;
        this.handleInputChange(file);
      }
      else {
        alert("No file selected");
      }
    }
    
    handleInputChange(files:File) {
      var file = files;
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        this.alert = "format d'image invalide "
        // { type: 'danger', message: "format d'image invalide " };
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    
    async _handleReaderLoaded(e:any) {
      let allpicture: any
      allpicture.url = await e.target.result;
      allpicture.defaults = await false
      await this.pictureArray.push(allpicture)
      console.log(' this.pictureArray', this.pictureArray)
      const found = await this.pictureArray.filter((item: { defaults: any; }) => item.defaults === true);
      if (found.length == 0) {
        this.pictureArray[0].defaults = await true
      }
      this.desableDefCheck = false
    }
    
    async deletePicAction(item:any) {
      var pos = await this.pictureArray.indexOf(item);
      await this.pictureArray.splice(pos, 1);
      if (item.defaults == true) {
        this.pictureArray[0].defaults = await true
      }
    }
   
    /* end upload image*/
     onSubmit() { 
      this.houseForm.value.characteristics = this.arrayCharacteristics;
      this.houseForm.value.equipments = this.arrayEquipements;
      this.houseForm.value.pictures = this.pictureArray;
      console.log(this.houseForm.value) 
      this.houseService.createHouse(this.houseForm.value).subscribe(data=>{
        this.pictureArray.forEach(async (picture:any) => {
          picture.HouseId = data.id
          await this.houseService.addPicture(picture)
            .subscribe(
              (picture:any) => {
                console.log('Picture added successfully:', picture);
              },)
            })
          this.msg = "House added successfully"
          this.show = true;
          this.showError = false;
        },
        (err:any) => {
          this.msg = "Error adding house"
          this.show = false;
          this.showError = true;
        });
      
      }
   
   back(){
     this.router.navigate(["/locataire"])
   }
   
     finishStepper(): void {
       this.isFinalStep = true;
     }
   
     isStepSuccess(step: number): boolean {
       // Add your logic to determine if a step is successful
       return false;
     }
   
     isStepCompleted(step: number): boolean {
       // Add your logic to determine if a step is completed
       return false;
     }
   
   
   
   
}
