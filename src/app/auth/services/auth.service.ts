import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegister } from '../models/iregister';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  registerUser(user:IRegister) : Observable<any>{
    return this.httpClient.post('/apiX/users',user);
  }
}
