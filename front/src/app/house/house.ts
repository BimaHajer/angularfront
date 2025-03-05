export interface House {
  id: number;
  title: string;
  description: string;
  city: string;
  price: number;
  availability: boolean;
  equipements: string[];
  characteristics: string[];
  pictures: string[];
}
export class Picture {
  id?: number
  url?: string | null
  cloudinaryId?: string | null
  defaults?: boolean | null
  createdAt?: Date | null
  updatedAt?: Date | null
  createdBy?: number | null
  updatedBy?: number | null
  active?: boolean | null
  houseId? :House| number

}