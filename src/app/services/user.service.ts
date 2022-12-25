import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor() { }

  getLoggedUser(){
    return localStorage.getItem('token');
  }
}
