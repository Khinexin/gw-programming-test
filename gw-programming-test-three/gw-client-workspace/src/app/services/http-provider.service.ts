import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import {FormGroup} from "@angular/forms";

var apiUrl = "http://localhost:8080/api";

var httpLink = {
  getAllCustomer: apiUrl + "/customers",
  deleteCustomerById: apiUrl + "/delete-customer",
  getCustomerById: apiUrl + "/get-customer",
  getCustomersByMonth: apiUrl+"/get-customer/month",
  getCustomersByItem: apiUrl+"/get-customer/item",
  saveCustomer: apiUrl + "/save-customer",
  updateCustomer: apiUrl + "/update-customer",

  getAllItem: apiUrl + "/items",
  deleteItemById: apiUrl + "/delete-item",
  getItemById: apiUrl + "/get-item",
  saveItem: apiUrl + "/save-item",
  updateItem: apiUrl + "/update-item"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }



  public getFormValidationErrors(customForm: FormGroup): string {
    let tmpStr = '';
    Object.keys(customForm?.controls)?.forEach(key => {
      const controlErrors = customForm?.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          tmpStr =  key;
        });
      }
    });
    return tmpStr;
  }

  public getCustomers(): Observable<any> {
    return this.webApiService.get(httpLink.getAllCustomer);
  }
  public deleteCustomer(id: any): Observable<any> {
    return this.webApiService.get(httpLink.deleteCustomerById + '/' + id);
  }
  public getCustomer(id: any): Observable<any> {
    return this.webApiService.get(httpLink.getCustomerById + '/' + id);
  }
  public getCustomersByMonth(month: any): Observable<any> {
    return this.webApiService.get(httpLink.getCustomersByMonth + '/' + month);
  }
  public getCustomersByItem(item: any): Observable<any> {
    return this.webApiService.get(httpLink.getCustomersByItem + '/' + item);
  }
  public saveCustomer(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveCustomer, model);
  }
  public updateCustomer(model: any): Observable<any> {
    return this.webApiService.post(httpLink.updateCustomer, model);
  }


}
