import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  preview='assets/img/profile.svg';
  constructor() { }

  ngOnInit(): void {
  }

  imagePreview(event:any){
    this.preview=URL.createObjectURL(event.target.files[0])
  }

}
