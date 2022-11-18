import {Component, ElementRef, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  showForm = false;
  itemList: any = [];
  error: any;
  elementRef: ElementRef | undefined;

  urlToItemList = '/items';

  constructor(private router: Router,
              private ngZone: NgZone,
              private itemService: CommonService) { }

  ngOnInit(): void {
  }

  getItemList(): void {
    this.itemService.getItems().subscribe((res: any) => {

      if (res?.length > 0) {
        this.itemList = [];
        // this.empList =
        res.forEach((item: any) => {
          this.itemList.push(item);
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
      this.itemService.deleteItem(id).subscribe((res) => {
        this.itemList.splice(i, 1);
        this.ngZone.run(() => this.router.navigateByUrl(this.urlToItemList));
      }, (err) => {
        console.log(err);
      });
    }
  }

}
