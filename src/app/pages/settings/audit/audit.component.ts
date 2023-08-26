import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  activeTab:any;
  ischecked: boolean = false;
  action_btn: boolean= false;
  result:any;
  
  constructor() { }

  ngOnInit(): void {
    this.activeTab=0;
  }

  typeTranscation(type:any){
  }


}
