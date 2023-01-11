import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    AppComponent,
    CustomerFormComponent,
    CustomerListComponent,
  ],
  imports: [
    BrowserModule, FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 9000,
      preventDuplicates: true,
    }),
    HttpClientModule, HttpClientJsonpModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
