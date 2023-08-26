import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-insurance-listing',
  templateUrl: './insurance-listing.component.html',
  styleUrls: ['./insurance-listing.component.css']
})
export class InsuranceListingComponent implements OnInit {
  options = {}
  data: any = [];
  columns: any = {};
 
   
  ngAfterViewInit(): void {
    $(this.el.nativeElement.querySelector('table')).DataTable();
  }


  title = 'datatables';
  posts:any;
  dtOptions: DataTables.Settings = {};

  constructor(private el: ElementRef,private http: HttpClient) { }
  ngOnInit(): void {
    this.dtOptions = {

      pagingType: 'full_numbers',

      pageLength: 5,

      processing: true

    };

  

    this.http.get('http://jsonplaceholder.typicode.com/posts')

      .subscribe(posts => {

        this.posts = posts;

    });

    this.columns = [
      { key: 'id', title: "ID" },
      { key: 'name', title: 'Name' },
      { key: 'phone', title: 'Phone' },
      { key: 'company', title: 'Company' },
      { key: 'date', title: 'Date' }
    ]

    this.data = [
      {
        "id": "1",
        "name": "Brendan",
        "phone": "1-724-406-2487",
        "company": "ZEnim Commodo Limited Enim Commodo Limited Enim Commodo LimitedEnim Commodo Limited",
        "zip": "98611",
        "city": "Norman",
        "date": "02/13/14",
        "country": "Bangladesh"
      },
      {
        "id": "2",
        "name": "Warren",
        "phone": "1-412-485-9725",
        "company": "ZOdio Etiam Institute",
        "zip": "10312",
        "city": "Sautin",
        "date": "01/01/13",
        "country": "India"
      }
    ];


  }

}
