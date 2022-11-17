import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {FormGroup, ValidationErrors} from '@angular/forms';
import {Customer, Item} from '../models/all-models';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  REST_API = 'http://localhost:3000';
  HTTPHEADERS = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private toastr: ToastrService, private httpClient: HttpClient) { }

  // toast
  showSuccess(message: any): void {
    console.log('show toast .. success');
    this.toastr.success(message, '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }

  showError(message: any): void {
    console.log('show toast .. error');
    this.toastr.error(message, '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }

  // showInfo(message): void{   this.toastr.info(message); }

  showWarning(message: any): void {
    console.log('show toast .. warning');
    this.toastr.warning(message, '', { closeButton: true, timeOut: 4000, progressBar: true, enableHtml: true });
  }


  // Error
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = JSON.stringify({ErrorCode: error.status, Message: error.message});
    }
    console.log('error ::: ', errorMessage);
    if (errorMessage && errorMessage.includes('0 Unknown Error')) {
      this.showWarning('The server is down! <br/> Please reconnect to server');
    } else if (errorMessage.includes('Incorrect date value:')){
      this.showWarning('Something went wrong when updating data ');
    } else {
      this.showWarning('Something went wrong !');
    }
    return throwError(errorMessage);
  }

  getFormValidationErrors(customForm: FormGroup): void {
    Object.keys(customForm?.controls)?.forEach(key => {
      const controlErrors = customForm?.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  // customer

  // Add
  saveCustomer(data: Customer): Observable<any> {
    const API_URL = `${this.REST_API}/save-customer`;
    return this.httpClient.post(API_URL, data)
      .pipe(map((res: any) => {
          console.log(res);
          if (res?.error === false){
            if (res?.message){
              this.showSuccess(res.message);
            }
          } else {
            this.handleError(res.message);
          }
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Get all objects
  getCustomers(): any {
    return this.httpClient.get(`${this.REST_API}/customers`).pipe( catchError(err => this.handleError(err)));
  }

  // Get single object
  getCustomer(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/get-customer/${id}`;
    return this.httpClient.get(API_URL, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Update
  updateCustomer(id: any, data: any): Observable<any> {
    const API_URL = `${this.REST_API}/update-customer/${id}`;
    return this.httpClient.put(API_URL, data, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          if (res?.error === false){
            if (res?.message){
              this.showSuccess(res.message);
            }
          } else {
            this.handleError(res.message);
          }
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Delete
  deleteCustomer(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/delete-customer/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          if (res?.error === false){
            if (res?.message){
              this.showSuccess(res.message);
            }
          } else {
            this.handleError(res.message);
          }
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

// Get customers by month
  getCustomersByMonth(month: any): Observable<any> {
    const API_URL = `${this.REST_API}/customers/month/${month}`;
    return this.httpClient.get(API_URL, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

// Item
// Add
  saveItem(data: Item): Observable<any> {
    const API_URL = `${this.REST_API}/save-item`;
    return this.httpClient.post(API_URL, data)
      .pipe(map((res: any) => {
          console.log(res);
          if (res?.error === false){
            if (res?.message){
              this.showSuccess(res.message);
            }
          } else {
            this.handleError(res.message);
          }
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Get all objects
  getItems(): any {
    return this.httpClient.get(`${this.REST_API}/items`).pipe( catchError(err => this.handleError(err)));
  }

  // Get single object
  getItem(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/get-item/${id}`;
    return this.httpClient.get(API_URL, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Update
  updateItem(id: any, data: any): Observable<any> {
    const API_URL = `${this.REST_API}/update-item/${id}`;
    return this.httpClient.put(API_URL, data, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          if (res?.error === false){
            if (res?.message){
              this.showSuccess(res.message);
            }
          } else {
            this.handleError(res.message);
          }
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

  // Delete
  deleteItem(id: any): Observable<any> {
    const API_URL = `${this.REST_API}/delete-item/${id}`;
    return this.httpClient.delete(API_URL, {headers: this.HTTPHEADERS})
      .pipe(map((res: any) => {
          if (res?.error === false){
            if (res?.message){
              this.showSuccess(res.message);
            }
          } else {
            this.handleError(res.message);
          }
          console.log(res);
          return res || {};
        }),
        catchError(err => this.handleError(err))
      );
  }

}
