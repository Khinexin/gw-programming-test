import {Component, NgZone} from '@angular/core';
import {Customer} from "../../models/all-models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpProviderService} from "../../services/http-provider.service";
import {first} from "rxjs";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

  errorMsg: string = '';

  favItems = [];
  itemOptions = ['pancake', 'cupcake', 'cheesecake', 'cookie', 'donuts',
    'croissant', 'danish', 'brownie', 'icecream', 'coffee', 'tea'
  ];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    defaultOpen: false,
    selectAllText: "Select All",
    unSelectAllText: "UnSelect All",
    itemsShowLimit: 10
  };

  customer: Customer = new Customer();
  customerForm: FormGroup = this.formBuilder.group({
    id: [-1],
    name: [''],
    dateOfBirth: [''],
    address: [''],
    contactNumber: [''],
    favoriteItems: [this.formBuilder.array([])]
  });


  getId: any;
  error: any;

  isAddMode = true;
  submitted = false;

  urlToCustomerList = '/customers';

  get f() {
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
              private httpProvider: HttpProviderService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('getId :::::::::::: ', this.getId);

    if (this.getId && this.getId > 0) {
      this.isAddMode = !this.getId;
      this.edit(this.getId);
    }


  }

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }

  edit(id: any): void {

    console.log('edit .... ', id);

    this.httpProvider.getCustomer(id).pipe(first()).subscribe((res) => {
      if (res) {
        console.log(res.body);
        if (res.body) {

          this.customer.id = res.body.id;
          this.customer.name = res.body.name;
          this.customer.dateOfBirth = res.body.dateOfBirth;
          this.customer.address = res.body.address;
          this.customer.contactNumber = res.body.contactNumber;
          this.customer.favoriteItems = res.body.favoriteItems;
          this.favItems = JSON.parse(JSON.stringify(res.body.favoriteItems));
          console.log('customer : ', this.customer);

          this.customerForm.controls['id'].setValue(this.customer.id);
          this.customerForm.controls['name'].setValue(this.customer.name);
          this.customerForm.controls['dateOfBirth'].setValue(this.customer.dateOfBirth);
          this.customerForm.controls['address'].setValue(this.customer.address);
          this.customerForm.controls['contactNumber'].setValue(this.customer.contactNumber);
          this.customerForm.controls['favoriteItems'].setValue(this.customer.favoriteItems);

        }
      }
    }, (err) => {
      console.log(err);
    });

  }

  // save
  onSubmit(): void {

    this.submitted = true;
    console.log('fav item... ', this.favItems);
    if (this.favItems){
      this.customerForm.controls['favoriteItems']?.setValue(this.favItems);
    }
    console.log('onSubmit trackerForm :: ', this.customerForm.value);

    const idValue = this.customerForm.controls['id'].value;
    console.log(' save .... ', idValue);

    // check validation err
    if (this.customerForm.invalid) {
      this.errorMsg = this.httpProvider.getFormValidationErrors(this.customerForm);
      // this.toastr.warning("please fill the form");
      // console.log('getElementsByClassName : length ',
      //   document.getElementsByClassName('text-danger').length);
      // document.getElementsByClassName('text-danger')[0]
      //   .scrollIntoView({behavior: 'smooth', block: 'center'});
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
    this.httpProvider.saveCustomer(this.customerForm.value)
      .subscribe(() => {
        console.log('Customer added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToCustomerList));
      }, (err: any) => {
        console.log(err);
      });
  }

  updateCustomer(idValue: any): void {
    this.httpProvider.updateCustomer(this.customerForm.value)
      .subscribe(() => {
        console.log('Customer updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToCustomerList));
      }, (err: any) => {
        console.log(err);
      });
  }


  cancelForm(): void {
    this.router.navigateByUrl(this.urlToCustomerList);
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }


}
