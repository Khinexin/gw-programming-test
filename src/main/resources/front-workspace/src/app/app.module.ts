import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonNavComponent } from './components/common-nav/common-nav.component';
import { CommonBodyComponent } from './components/common-body/common-body.component';
import { CustomerListComponent } from './components/customers/customer-list.component';
import { ItemListComponent } from './components/items/item-list.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { ItemFormComponent } from './components/items/item-form/item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonNavComponent,
    CommonBodyComponent,
    CustomerListComponent,
    ItemListComponent,
    CustomerFormComponent,
    ItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
