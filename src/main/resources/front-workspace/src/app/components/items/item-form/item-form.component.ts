import {Component, NgZone, OnInit} from '@angular/core';
import {Item} from '../../../models/all-models';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CommonService} from '../../../services/common.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  item: Item = new Item();
  itemForm: FormGroup = this.formBuilder.group({
    id: [-1],
    name: ['', Validators.required],
    photo: [''],
    price: [''],
  });

  getId: any;
  error: any;

  isAddMode = true;
  submitted = false;

  urlToItemList = '/items';

  get f(): { [key: string]: AbstractControl } {
    return this.itemForm.controls;
  }
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));

  }

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private ngZone: NgZone,
              private activatedRoute: ActivatedRoute,
              private itemService: CommonService) { }

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

    this.itemService.getItem(id).pipe(first()).subscribe((res) => {
      if (res) {
        console.log(res);
        if (res) {

          this.item.id = res.id;
          this.item.name = res.name;
          this.item.photo = res.photo;
          this.item.price = res.price;

          console.log('item : ', this.item);

          this.itemForm.controls.id.setValue(this.item.id);
          this.itemForm.controls.name.setValue(this.item.name);
          this.itemForm.controls.photo.setValue(this.item.photo);
          this.itemForm.controls.price.setValue(this.item.price);


        }
      }
    }, (err) => {
      console.log(err);
    });

  }

  // save
  onSubmit(): void {

    this.submitted = true;
    console.log('onSubmit trackerForm :: ', this.itemForm.value);

    const idValue = this.itemForm.controls.id.value;
    console.log(' save .... ', idValue);

    // check validation err
    if (this.itemForm.invalid) {
      this.itemService.getFormValidationErrors(this.itemForm);
      console.log('getElementsByClassName : length ', document.getElementsByClassName('text-danger').length);
      document.getElementsByClassName('text-danger')[0].scrollIntoView({behavior: 'smooth', block: 'center'});
      return;

    } else {

      console.log('Form Submitted!');

      if (this.isAddMode) {

        console.log('save new');
        this.createItem();

      } else {

        console.log('update existing ----- id: ', this.getId);
        this.updateItem(idValue);
      }

    }
  }

  createItem(): void {
    this.itemService.saveItem(this.itemForm.value)
      .subscribe(() => {
        console.log('Item added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToItemList));
      }, (err) => {
        console.log(err);
      });
  }

  updateItem(idValue: any): void {
    this.itemService.updateItem(idValue, this.itemForm.value)
      .subscribe(() => {
        console.log('Item updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToItemList));
      }, (err) => {
        console.log(err);
      });
  }


  fileChangeEvent(fileInput: any): any {
    console.log('fileInput ::::: ', fileInput);
    let imageError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const maxSize = 200000; // 20971520
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxHeight = 15200;
      const maxWidth = 25600;

      if (fileInput.target.files[0].size > maxSize) {
        imageError = 'Maximum size allowed is ' + maxSize / 1000 + 'kb';
        this.itemService.showWarning(imageError);
        return false;
      } else if (!allowedTypes.includes(fileInput.target.files[0].type)) {
        imageError = 'Only Images are allowed ( JPG | PNG )';
        this.itemService.showWarning(imageError);
        return false;
      } else {
        const reader = new FileReader();
        const height = 'height';
        const width = 'width';

        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          console.log('image ::::: ', image);

          // @ts-ignore
          image.onload = (rs: any) => {
            const imgHeight = rs.currentTarget[height];
            const imgWidth = rs.currentTarget[width];
            // console.log(imgHeight, imgWidth);

            if (imgHeight > maxHeight && imgWidth > maxWidth) {
              imageError = 'Maximum dimentions allowed ' + maxHeight + '*' + maxWidth + 'px';
              this.itemService.showWarning(imageError);
              return false;
            } else {
              const imgBase64Path = e.target.result;
              // this.empForm.controls.photoBase64.setValue(JSON.stringify(this.imageFileObj));
              this.itemForm.controls.photoBase64.setValue(imgBase64Path);
            }

          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
    }

  }

  removeImage(): void {
    this.itemForm.controls.photo.setValue('');
  }


  cancelForm(): void {
    this.router.navigateByUrl(this.urlToItemList);
  }


}
