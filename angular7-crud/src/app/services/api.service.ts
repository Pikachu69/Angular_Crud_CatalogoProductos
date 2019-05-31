import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiURL = "http://localhost:3000/api/v1/products";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(apiURL)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(_id: number): Observable<Product> {
    const url = `${apiURL}/${_id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${_id}`)),
      catchError(this.handleError<Product>(`getProduct id=${_id}`))
    );
  }

  addProduct (product): Observable<Product> {
    return this.http.post<Product>(apiURL, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  
  updateProduct (_id, product): Observable<any> {
    const url = `${apiURL}/${_id}`;
    console.log(""+_id);
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${_id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }
  
  deleteProduct (_id): Observable<Product> {
    const url = `${apiURL}/${_id}`;
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${_id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
}
