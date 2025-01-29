import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  addUser(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  getUserList():Observable<any>{
    return this.http.get("http://localhost:3000/user/list-users") as Observable<any>
  }
  getUserById(id:number):Observable<any>{
    return this.http.get<User>('http://localhost:3000/user/user/'+JSON.stringify(id)) as Observable<any>
  }
  createUser(userCreate:User):Observable<any>{
    return this.http.post<User>('http://localhost:3000/user/create-user',userCreate) as Observable<any>
  }
  updateUser(userUpdate:User, id:number):Observable<any>{
    return this.http.patch<User>('http://localhost:3000/user/update-user/'+JSON.stringify(id),userUpdate)  as Observable<any>
  }
  deleteUser(id:number):Observable<any>{
    return this.http.delete<User>('http://localhost:3000/user/delete-user/'+JSON.stringify(id)) as Observable<any>
  }
}
