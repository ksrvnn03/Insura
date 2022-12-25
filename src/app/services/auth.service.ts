import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api=environment.apiUrl;

  constructor(private router: Router,private http:HttpClient ) { }


  logInUser(email:any,password:any){
    return this.http.post(this.api+'admin/login',{email:email,password:password});
  } 

   
}
