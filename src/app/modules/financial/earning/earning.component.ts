import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.css']
})
export class EarningComponent implements OnInit {
  transview: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  trans_open(){
    this.transview=true;      
  }

  trans_close(){
    this.transview=false;
  }
}
