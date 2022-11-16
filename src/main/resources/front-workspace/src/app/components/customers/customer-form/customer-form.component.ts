import {Component, NgZone, OnInit} from '@angular/core';
import {Customer} from '../../../models/all-models';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../services/common.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  customer: Customer = new Customer();
  customerForm: FormGroup = this.formBuilder.group({
    id: [-1],
    name: ['', Validators.required],
    dateOfBirth: [null, Validators.required],
    address: ['', Validators.required],
    contactNumber: ['', Validators.required],
    favoriteItems: this.formBuilder.array([])
  }, {validator: this.checkDates});


  getId: any;
  error: any;

  isAddMode = true;
  submitted = false;

  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
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

  }

  edit(id: any): void {

    console.log('edit .... ', id);

    // this.empService.getEmployee(id).pipe(first()).subscribe((res) => {
    //   if (res) {
    //     console.log(res);
    //     if (res.error === false && res.data) {
    //
    //       this.employee = new Employee(
    //         res.data.id, res.data.name, res.data.dob, res.data.fatherName, JSON.parse(res.data.nrc),
    //         res.data.contactNo, res.data.email, res.data.startDate, res.data.endDate,
    //         res.data.salary, JSON.parse(res.data.address), res.data.description, JSON.parse(res.data.photoBase64));
    //
    //       console.log('employee : ', this.employee);
    //
    //       this.empForm.controls.id.setValue(this.employee.id);
    //       this.empForm.controls.name.setValue(this.employee.name);
    //       this.empForm.controls.fatherName.setValue(this.employee.fatherName);
    //       this.empForm.controls.nrc.setValue(this.employee.nrc);
    //       this.empForm.controls.contactNo.setValue(this.employee.contactNo);
    //       this.empForm.controls.startDate.setValue(formatDate(this.employee.startDate, 'yyyy-MM-dd', 'en'));
    //       this.empForm.controls.endDate.setValue(this.employee.endDate ? formatDate(this.employee.endDate, 'yyyy-MM-dd', 'en') : '');
    //       this.empForm.controls.dob.setValue(formatDate(this.employee.dob, 'yyyy-MM-dd', 'en'));
    //       this.empForm.controls.address.setValue(this.employee.address);
    //       this.empForm.controls.contactEmail.setValue(this.employee.contactEmail);
    //       this.empForm.controls.salary.setValue(this.employee.salary);
    //       this.empForm.controls.description.setValue(this.employee.description);
    //       // this.empForm.controls.photoBase64.setValue(this.employee.photoBase64);
    //       this.empForm.controls.photoBase64.get('base64Img').setValue(this.employee.photoBase64.base64Img);
    //       this.empForm.controls.photoBase64.get('name').setValue(this.employee.photoBase64.name);
    //
    //     }
    //   }
    // }, (err) => {
    //   console.log(err);
    // });

  }

  // // save
  // onSubmit(): void {
  //
  //   this.submitted = true;
  //   console.log('onSubmit trackerForm :: ', this.empForm.value);
  //
  //   const idValue = this.empForm.controls.id.value;
  //   console.log(' save .... ', idValue);
  //
  //   // check validation err
  //   if (this.empForm.invalid) {
  //     this.sharedService.getFormValidationErrors(this.empForm);
  //     console.log('getElementsByClassName : length ', document.getElementsByClassName('text-danger').length);
  //     document.getElementsByClassName('text-danger')[0].scrollIntoView({behavior: 'smooth', block: 'center'});
  //     return;
  //
  //   } else {
  //
  //     console.log('Form Submitted!');
  //
  //     if (this.isAddMode) {
  //
  //       console.log('save new');
  //       this.createEmployee();
  //
  //     } else {
  //
  //       console.log('update existing ----- id: ', this.getId);
  //       this.updateEmployee(idValue);
  //     }
  //
  //   }
  // }
  //
  // createEmployee(): void {
  //   this.empService.saveEmployee(this.empForm.value)
  //     .subscribe(() => {
  //       console.log('Employee added successfully!');
  //       this.ngZone.run(() => this.router.navigateByUrl(Constants.urlToEmpList));
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  //
  // updateEmployee(idValue: any): void {
  //   this.empService.updateEmployee(idValue, this.empForm.value)
  //     .subscribe(() => {
  //       console.log('Employee updated successfully!');
  //       this.ngZone.run(() => this.router.navigateByUrl(Constants.urlToEmpList));
  //     }, (err) => {
  //       console.log(err);
  //     });
  // }
  //
  //
  // cancelForm(): void {
  //   this.router.navigateByUrl(Constants.urlToEmpList);
  // }

  checkDates(group: FormGroup): { notValid: boolean, message: string } {

    console.log(' check dates .... ', 'dob - ', group.controls.dob.value,
      ' start - ', group.controls.startDate.value, ', end - ', group.controls.endDate.value);


    if (group.controls.dob.value !== '' && group.controls.startDate.value !== '') {
      if (group.controls.startDate.value < group.controls.dob.value) {
        return {notValid: true, message: 'Not valid! Date of birth must be less than Start Date'};
      }
    }

    if (group.controls.endDate.value !== '') {
      if (group.controls.endDate.value < group.controls.startDate.value) {
        return {notValid: true, message: 'Not valid! (Start Date must be less than End Date)'};
      }
    }
    return {notValid: false, message: ''};
  }
}
