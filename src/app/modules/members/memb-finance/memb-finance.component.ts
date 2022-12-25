import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memb-finance',
  templateUrl: './memb-finance.component.html',
  styleUrls: ['./memb-finance.component.css']
})
export class MembFinanceComponent implements OnInit {
  transview: boolean = false;

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

}
