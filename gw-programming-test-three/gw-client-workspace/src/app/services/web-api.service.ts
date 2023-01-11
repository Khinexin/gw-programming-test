import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
  }

  // Get call method
  // Param 1 : url
  get(url: string): Observable<any> {
    console.log('get >>> ', url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.get(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.returnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // Post call method
  // Param 1 : url
  // Param 2 : model
  post(url: string, model: any): Observable<any> {
    console.log('post >>> ', url, model);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.post(
      url,
      model,
      httpOptions)
      .pipe(
        map((response: any) => this.returnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // Param 1 : url
  delete(url: string): Observable<any> {
    console.log('get >>> ', url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.delete(
      url,
      httpOptions
    )
      .pipe(
        map((response: any) => this.returnResponseData(response)),
        catchError(this.handleError)
      );
  }

  private returnResponseData(response: any) {
   // this.toastr.warning(response);
    console.log('response >> ',response);
    return response;
  }

  private handleError(error: any) {
    // this.toastr.warning(error);
    console.log('error >> ',error);
    return throwError(error);
  }
}
