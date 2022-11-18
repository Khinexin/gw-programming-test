import {Component, NgZone, OnInit} from '@angular/core';
import {Customer, Item} from '../../../models/all-models';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../services/common.service';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  itemList: Item[] = [];
  customer: Customer = new Customer();
  customerForm: FormGroup = this.formBuilder.group({
    id: [-1],
    name: ['', Validators.required],
    dateOfBirth: [null, Validators.required],
    address: ['', Validators.required],
    contactNumber: ['', Validators.required],
    favoriteItems: this.formBuilder.array([])
  });


  getId: any;
  error: any;

  isAddMode = true;
  submitted = false;

  urlToCustomerList = '/customers';

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

  }

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private activatedRoute: ActivatedRoute,
              private customerService: CommonService) {
  }

  ngOnInit(): void {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('getId :::::::::::: ', this.getId);

    if (this.getId && this.getId > 0) {
      this.isAddMode = !this.getId;
      this.edit(this.getId);
    }

    this.customerService.getItems().subscribe((res: any[]) => {
        if (res?.length > 0){
          this.itemList = [];
          res.forEach(item => {
            const tempIMG = JSON.parse(item.siteImageJson);
            console.log(tempIMG);
            this.itemList.push(tempIMG);
          });
      }
    }, (err: any) => {
      console.log(err);
    });
  }

  edit(id: any): void {

    console.log('edit .... ', id);

    this.customerService.getCustomer(id).pipe(first()).subscribe((res) => {
      if (res) {
        console.log(res);
        if (res) {

          this.customer.id = res.id;
          this.customer.name = res.name;
          this.customer.dateOfBirth = res.dateOfBirth;
          this.customer.address = res.address;
          this.customer.contactNumber = res.contactNumber;
          this.customer.favoriteItems = res.favoriteItems;

          console.log('customer : ', this.customer);

          this.customerForm.controls.id.setValue(this.customer.id);
          this.customerForm.controls.name.setValue(this.customer.name);
          this.customerForm.controls.dateOfBirth.setValue(this.customer.dateOfBirth);
          this.customerForm.controls.address.setValue(this.customer.address);
          this.customerForm.controls.contactNumber.setValue(this.customer.contactNumber);
          this.customerForm.controls.favoriteItems.setValue(this.customer.favoriteItems);

        }
      }
    }, (err) => {
      console.log(err);
    });

  }

  // save
  onSubmit(): void {

    this.submitted = true;
    console.log('onSubmit trackerForm :: ', this.customerForm.value);

    const idValue = this.customerForm.controls.id.value;
    console.log(' save .... ', idValue);

    // check validation err
    if (this.customerForm.invalid) {
      this.customerService.getFormValidationErrors(this.customerForm);
      console.log('getElementsByClassName : length ', document.getElementsByClassName('text-danger').length);
      document.getElementsByClassName('text-danger')[0].scrollIntoView({behavior: 'smooth', block: 'center'});
      return;

    } else {

      console.log('Form Submitted!');

      if (this.isAddMode) {

        console.log('save new');
        this.createCustomer();

      } else {

        console.log('update existing ----- id: ', this.getId);
        this.updateCustomer(idValue);
      }

    }
  }

  createCustomer(): void {
    this.customerService.saveCustomer(this.customerForm.value)
      .subscribe(() => {
        console.log('Customer added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToCustomerList));
      }, (err) => {
        console.log(err);
      });
  }

  updateCustomer(idValue: any): void {
    this.customerService.updateCustomer(idValue, this.customerForm.value)
      .subscribe(() => {
        console.log('Customer updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToCustomerList));
      }, (err) => {
        console.log(err);
      });
  }


  cancelForm(): void {
    this.router.navigateByUrl(this.urlToCustomerList);
  }

}
