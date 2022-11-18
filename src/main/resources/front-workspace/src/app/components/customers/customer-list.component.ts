import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {CommonService} from '../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  showForm = false;
  customerList: any = [];
  error: any;

  elementRef: ElementRef | undefined;

  urlToCustomerList = '/customers';

  constructor(private router: Router,
              private ngZone: NgZone,
              private customerService: CommonService) {
  }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList(): void {
    this.customerService.getCustomers().subscribe((res: any) => {

      if (res?.length > 0) {
        this.customerList = [];
        // this.empList =
        res.forEach((item: any) => {
          this.customerList.push(item);
        });
        console.log(typeof res.data);
      }

    }, (err: any) => {
      console.log(err);
    });
  }

  delete(id: any, i: any): void {
    console.log(id);
    if (window.confirm('Are you sure want to delete ?')) {
      this.customerService.deleteCustomer(id).subscribe((res) => {
        this.customerList.splice(i, 1);
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToCustomerList));
      }, (err) => {
        console.log(err);
      });
    }
  }

  showCustomerForm(): void {
    this.showForm = true;
  }

  hideCustomerForm(): void {
    this.showForm = false;
  }
}
