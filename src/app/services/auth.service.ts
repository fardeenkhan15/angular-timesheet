import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private router:Router,
    private http:HttpClient
  ){ }
  
  isLoggedIn(): boolean {
    // Check if the token exists in local storage
    const token = localStorage.getItem('currentUserToken');
    return !!token; // Returns true if token exists, false otherwise
  }
  
  // isLoggedIn(): boolean{
  //   if (this.isValid()) {
  //     return true;
  //   } else {
  //     // Redirect to the login page
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }

  login(data:any) {
    return this.http.post<any>('http://127.0.0.1:8000/api/login',{data: data})
  }

  forgotPassword(data: any){
    return this.http.post<any>('http://127.0.0.1:8000/api/forgot-password',{email:data})
  }

  resetPasswordValidateUser(token:any){
    return this.http.post<any>('http://127.0.0.1:8000/api/forgot-validate-user', {token: token})
  }

  saveResetPassword(token:any, data:any){
    return this.http.post<any>('http://127.0.0.1:8000/api/forgot-set-password', {token: token, data: data})
  }

  logout(token:any){
    return this.http.post<any>('http://127.0.0.1:8000/api/logout', {token: token});
  }
}
