import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memb-networks',
  templateUrl: './memb-networks.component.html',
  styleUrls: ['./memb-networks.component.css']
})
export class MembNetworksComponent implements OnInit {
 isCollapsed = false;
 IsVisible0 = true;
 IsVisible1 = false;
 IsVisible2 = false;
 IsVisible3 = false;
  constructor() { }

  ngOnInit(): void {
    this.IsVisible1 = true;
  }

  IsVisible(id:any){
    if(id==0){
      this.IsVisible1 = true;
      this.IsVisible2 = true;
      this.IsVisible3 = true;
    }
    if(id==1){
      this.IsVisible1 = !this.IsVisible1;;
    }
    if(id==2){
      this.IsVisible2 = !this.IsVisible2;
    }
    if(id==3){
      this.IsVisible3 = !this.IsVisible3;
    }
  }
}

