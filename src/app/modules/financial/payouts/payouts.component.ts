import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payouts',
  templateUrl: './payouts.component.html',
  styleUrls: ['./payouts.component.css']
})
export class PayoutsComponent implements OnInit {
  transview: boolean = false;
  ischecked: boolean = false;
  action_btn: boolean= false;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  trans_open(){
    this.transview=true;
    //this.transview = !this.transview;       
  }

  trans_close(){
    this.transview=false;
  }

  toggleCheckboxAll(event:any) {
    var inputs = document.getElementsByName('checkitem');
   if(event.target.checked==true){
    for (var i = 0; i < inputs.length; i++) {   
      let chk=(<HTMLInputElement>(
        document.getElementsByName("checkitem")[i]
      )).checked=true;
    } 
    this.action_btn=true;
   }else{
    for (var i = 0; i < inputs.length; i++) {   
      let chk=(<HTMLInputElement>(
        document.getElementsByName("checkitem")[i]
      )).checked=false;
    } 
    this.action_btn=false;
   }
  }

  itemchecked(event:any){
    var inputs = document.getElementsByName('checkitem');
    var noitem=0;
    for (var i = 0; i < inputs.length; i++) {   
      let chk=(<HTMLInputElement>(
        document.getElementsByName("checkitem")[i]
      )).checked;
      if(chk==true){
        noitem+=1;
      }
    } 
    if(noitem>0){
      this.action_btn=true;
    }else{
      this.action_btn=false;
    }
  }
}

