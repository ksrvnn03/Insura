import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  apiUrl=environment.apiUrl;
  token:any;
  constructor(
    private router: Router,private http:HttpClient
  ) {
    this.token='Bearer '+localStorage.getItem('token');
   }
  
  listingTransaction(memberId:any, type:any){
    if(memberId){
      if(type!=0){
        return this.http.get(this.apiUrl+'transactions/list?memberId='+memberId+'&type='+type,{headers: new HttpHeaders().set("Authorization", ''+this.token)});
      }else{
        return this.http.get(this.apiUrl+'transactions/list?memberId='+memberId,{headers: new HttpHeaders().set("Authorization", ''+this.token)});
      }
    }else{
      if(type==0){
        return this.http.get(this.apiUrl+'transactions/list',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
      }else{
        return this.http.get(this.apiUrl+'transactions/list?type='+type,{headers: new HttpHeaders().set("Authorization", ''+this.token)});
      }
      
    }
  }

  getSingleTransaction(id:any){
    return this.http.get(this.apiUrl+'members/'+id+'',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  walletBalance(id:any){
    return this.http.get(this.apiUrl+'transactions/wallet/'+id+'/balance',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  transCount(){
    return this.http.get(this.apiUrl+'transactions/overall-counts',{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }

  statusFinanceUpdate(id:any,status:any){
    return this.http.patch(this.apiUrl+'transactions/'+id+'/update-status',{status : status},{headers: new HttpHeaders().set("Authorization", ''+this.token)});
  }
}
