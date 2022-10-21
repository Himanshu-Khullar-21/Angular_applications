import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';
  products$ : Observable<Product[]> ;

  constructor(  private http:HttpClient) {        
    this.initProducts() ;
  }

  // this is for post request to send the data to the server
  insertProduct(newProduct: Product): Observable<Product> {   // 
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id:number) : Observable<Product> {
    return this
              .products$
              .pipe(
                map(products => products.find(product => product.id == id))
                
              )
  }
  
 
initProducts() : void {
 // this.products$ = this.http.get<Product[]>(this.baseUrl) ;      //initializing observer with http service
 let url:string = this.baseUrl + '?$orderby=ModifiedDate%20desc';


  this.products$ = this.http
                        //.get<Product[]>(this.baseUrl)
                        .get<Product[]>(url)
                        .pipe(
                          tap(data => console.table(data)),
                          delay(1500),      // to see loading indicator
                          shareReplay()   // will maintain list in cache and will give if subscribed again so that to avoind repetive rest calls
                        )
                        



}

}