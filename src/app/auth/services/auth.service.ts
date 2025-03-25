import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegister } from '../models/iregister';
import { Observable } from 'rxjs';
import { Ilogin } from '../models/ilogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://localhost:5005/api/users'; // Register endpoint
  private loginUrl = 'http://localhost:5005/api/auth'; // Login endpoint

  constructor(private http: HttpClient) {}

  // Register user
  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.registerUrl, userData);
  }

  // Login user
  loginUser(userData: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, userData);
  }
}
