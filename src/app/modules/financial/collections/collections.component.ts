import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {
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

