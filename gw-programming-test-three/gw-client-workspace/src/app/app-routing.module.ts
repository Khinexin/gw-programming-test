import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./components/customer-list/customer-list.component";
import {CustomerFormComponent} from "./components/customer-form/customer-form.component";


const routes: Routes = [

  {path: '', component: CustomerListComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'customer-form', component: CustomerFormComponent},
  {path: 'edit-customer/:id', component: CustomerFormComponent},
  {path: 'delete-customer/:id', component: CustomerListComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
