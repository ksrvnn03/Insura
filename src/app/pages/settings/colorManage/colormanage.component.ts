import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colormanage',
  templateUrl: './colormanage.component.html',
  styleUrls: ['./colormanage.component.css']
})
export class ColorManageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  updateColor($event:any) {
    let color=$event.target.value;
    const hxaColor = color.slice(0, 7);
    console.log('ss',color);
    console.log('Selected color in hxa format:', hxaColor);
  }

}
