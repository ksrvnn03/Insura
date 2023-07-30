import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  apiUrl=environment.apiUrl;
  token:any;
  constructor(
    private router: Router,private http:HttpClient
  ) {
    this.token='Bearer '+localStorage.getItem('token');
   }
  
  listingMember(page:any ){
    if(page>0){
      return this.http.get(this.apiUrl+'members?page='+page+'',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
    }else{
      return this.http.get(this.apiUrl+'members',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
    }
  }

  memberList(){
    return this.http.get(this.apiUrl+'members-list',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  getMember(id:any){
    return this.http.get(this.apiUrl+'members/'+id+'',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  createMember(form:any){
    return this.http.post(this.apiUrl+'members',form,{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  updateMember(form:any,id:any){
    return this.http.put(this.apiUrl+'members/'+id+'',form,{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  deleteMember(id:any){
    return this.http.delete(this.apiUrl+'members/'+id+'', {headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  memberNetwork(id:any){
    return this.http.get(this.apiUrl+'members/'+id+'/network',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }
  

}
