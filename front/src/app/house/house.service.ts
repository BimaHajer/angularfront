import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { House, Picture } from '../house/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private apiUrl = 'http://localhost:3000/house';

  constructor(private http: HttpClient) {}

  create(houseData: any): Observable<House> {
    return this.http.post<House>(`${this.apiUrl}/create-house`, houseData);
  }

  findAll(): Observable<House[]> {
    return this.http.get<House[]>(`${this.apiUrl}/list-house`);
  }

  findOne(id: number): Observable<House> {
    return this.http.get<House>(`${this.apiUrl}/detail-house/${id}`);
  }

  update(id: number, updateHouseDto: any): Observable<House> {
    return this.http.patch<House>(`${this.apiUrl}/update-house/${id}`, updateHouseDto);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-house/${id}`);
  }
  addPicture( picture:Picture):Observable<Picture>
  {
    return this.http.post<Picture>(this.apiUrl+'pictures/add-picture',picture) as Observable <Picture>
  }
}
