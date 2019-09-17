import { Injectable } from '@angular/core';
import { IMenuData } from '../interfaces/iMenuData';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn:'root'
})

export class ReceiveOrdersApiService{


  constructor(private http:HttpClient){}

  private getMenuDataUrl = 'staticData/menuData.json';


  getMenuData(): Observable<IMenuData[]>{
    return this.http.get<IMenuData[]>(this.getMenuDataUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
