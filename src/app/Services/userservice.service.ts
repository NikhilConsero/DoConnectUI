import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const baseurl="http://localhost:5027/api";
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http:HttpClient) { }
  RegisterUser(user:any):Observable<any>{
    return this.http.post(baseurl+'/User/Register',user)
  }
  UserLogin(user:any):Observable<any>{
    return this.http.post(baseurl+'/User/Login',user)
  }
}
