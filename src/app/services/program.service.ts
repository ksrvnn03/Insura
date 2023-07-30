import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  apiUrl=environment.apiUrl;
  token:any;
  constructor(
    private router: Router,private http:HttpClient
  ) {
    this.token='Bearer '+localStorage.getItem('token');
   }

  listingProgram(page:any){
    return this.http.get(this.apiUrl+'admin/programmes',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  createProgram(form:any){
    return this.http.post(this.apiUrl+'admin/programmes', form, { headers: new HttpHeaders().set("Authorization", ''+this.token)})
  }

  updateProgram(form:any,id:any){
    return this.http.patch(this.apiUrl+'admin/programmes/'+id, form, { headers: new HttpHeaders().set("Authorization", ''+this.token)})
  }

  getProgram(id:number){
    return this.http.get(this.apiUrl+'admin/programmes/'+id, { headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  programMember(id:any){
    return this.http.get(this.apiUrl+'admin/programmes/'+id+'/members', { headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  programDetachMember(pid:any, mid:any){
    return this.http.patch(this.apiUrl+'admin/programmes/'+pid+'/member/'+mid,{}, { headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }  

  programBulkDeleteMember(pid:any, mid:any){
    return this.http.patch(this.apiUrl+'admin/programmes/'+pid+'/bulk-detach', {member_ids:mid}, { headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  
  addMembertoProgram(id:any,ids:any,referal:any){
    return this.http.post(this.apiUrl+'admin/programmes/'+id+'/member', { member_ids:ids , referral_id: referal } , {headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

}
