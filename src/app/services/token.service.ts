import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  // private user: any;
  private token = 'currentUserToken';

  constructor(
    private router:Router,
    private http:HttpClient
  ) { }

    // Set user and token
    setUserAndToken(user: any, token: string){
      // this.user=user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem(this.token, token);
      console.log(this.isValid())
    }
  
    // Get token
    getToken(): string {
      return localStorage.getItem(this.token) || '';
    }
  
    // Clear user and token
    clearUserAndToken() {
      // this.user = null;
      localStorage.removeItem('currentUser');
      localStorage.removeItem(this.token);
    }

    isValid(){
      const token = this.getToken();
      if(token){
          const payload = this.payload(token);
          if(payload){
            return (payload.iss=== "http://127.0.0.1:8000/api/login")?true:false;
          }
      }
      return false;
    }

    payload(token:any){
      const payload = token.split('.')[1];
      return this.decode(payload);
    }

    decode(payload:any){
      return JSON.parse(atob(payload));
    }
}
