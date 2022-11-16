import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  showForm = false;

  constructor() { }

  ngOnInit(): void {
  }

  showCustomerForm(): void {
    this.showForm = true;
  }

  hideCustomerForm(): void {
    this.showForm = false;
  }
}
