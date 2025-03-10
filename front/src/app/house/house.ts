export class House {
    id!: number;
  
    title!: string;
  
    description!: string;
  
    location!: string;
  
    city!: string;
  
    poste_code!: string;
  
    price!: number;
  
    availability!: Date;
  
    created_at!: Date;
  
    created_by!: number;
  
    updated_at!: Date;
    
    updated_by!: number;
    deleted_at!: Date;
    equipments: any=[];
    characterisrtics: any=[];
    pictures: any=[];
  selected: boolean;
  }
  