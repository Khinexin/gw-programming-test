import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './components/customers/customer-list.component';
import {ItemListComponent} from './components/items/item-list.component';
import {CustomerFormComponent} from './components/customers/customer-form/customer-form.component';
import {ItemFormComponent} from './components/items/item-form/item-form.component';

const routes: Routes = [

  {path: '', component: CustomerListComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'customer-form', component: CustomerFormComponent},

  {path: 'items', component: ItemListComponent},
  {path: 'item-form', component: ItemFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
