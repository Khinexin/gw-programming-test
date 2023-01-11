import {Component, ElementRef, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import {HttpProviderService} from "../../services/http-provider.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  openSearchByItem = false;
  openSearchByMonth = false;
  itemOptions = ['pancake', 'cupcake', 'cheesecake', 'cookie', 'donuts',
    'croissant', 'danish', 'brownie', 'icecream', 'coffee', 'tea'
  ];

  customerList: any = [];
  error: any;

  queryMonth: number = 0;
  queryItem: string = '';

  elementRef: ElementRef | undefined;

  urlToCustomerList = '/customers';

  constructor(private router: Router,
              private ngZone: NgZone,
              private httpProvider : HttpProviderService) {
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

  }
  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList(): void {
    this.httpProvider.getCustomers().subscribe((res: any) => {
      console.log('res ..', res);

      if (res?.body) {
        this.customerList = [];
        this.customerList = JSON.parse(JSON.stringify(res.body))
      }

    }, (err: any) => {
      console.log(err);
    });
  }

  delete(id: any, i: any): void {
    console.log('id ',id , '  index ',i);
    if (window.confirm('Are you sure want to delete ?')) {
      this.customerList.splice(i, 1);
      this.httpProvider.deleteCustomer(id).subscribe((res) => {
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToCustomerList));
      }, (err: any) => {
        console.log('error .... ', err);
      });
    }
  }

  getCustomerListThisMonthBD() {

    const currentTime = new Date();
    const month = currentTime.getMonth() + 1;
    // var day = currentTime.getDate()
    // var year = currentTime.getFullYear()

    this.httpProvider.getCustomersByMonth(month).subscribe((res: any) => {
      console.log('res ..', res);

      if (res?.body) {
        this.customerList = [];
        this.customerList = JSON.parse(JSON.stringify(res.body))
      }

    }, (err: any) => {
      console.log(err);
    });
  }
  searchFormByItem(){
    this.customerList = [];
    this.openSearchByItem = true;
  }
  cancelSearchByItem(){
    this.openSearchByItem = false;
    this.getCustomerList();
  }

  searchByItem(){
    this.httpProvider.getCustomersByItem(this.queryItem).subscribe((res: any) => {
      console.log('res ..', res);

      if (res?.body) {
        this.customerList = [];
        this.customerList = JSON.parse(JSON.stringify(res.body))
      }

    }, (err: any) => {
      console.log(err);
    });
  }

  searchFormByMonth(){
    this.customerList = [];
    this.openSearchByMonth = true;
  }
  cancelSearchByMonth(){
    this.openSearchByMonth = false;
    this.getCustomerList();
  }
  searchByMonth(){

    this.httpProvider.getCustomersByMonth(this.queryMonth).subscribe((res: any) => {
      console.log('res ..', res);

      if (res?.body) {
        this.customerList = [];
        this.customerList = JSON.parse(JSON.stringify(res.body))
      }

    }, (err: any) => {
      console.log(err);
    });

  }
}
