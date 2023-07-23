import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  apiUrl=environment.apiUrl;
  token:any;
  constructor(
    private router: Router,private http:HttpClient
  ) {
    this.token='Bearer '+localStorage.getItem('token');
   }

  listDocu(page:any){    
    return this.http.get(this.apiUrl+'documents/list', {headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  memberDocu(id:any,status:any){    
    if(status==0){
      return this.http.get(this.apiUrl+'documents/list/'+id+'', {headers: new HttpHeaders().set("Authorization", ''+this.token)});
    }else{
      return this.http.get(this.apiUrl+'documents/list/'+id+'?status='+status, {headers: new HttpHeaders().set("Authorization", ''+this.token)});
    }
  }

  downloadDocu(id:number){
    return this.http.get(this.apiUrl+'documents/download/'+id+'', {responseType: 'blob', headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  deleteDocu(id:any){
    return this.http.delete(this.apiUrl+'documents/'+id+'',  {headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  statusDocu(id:any,cstatus:any){
    return this.http.patch(this.apiUrl+'documents/update-status/'+id+'', {status:cstatus},  {headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }
}
