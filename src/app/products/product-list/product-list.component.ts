import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-product-list',     // unique key for the component
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title:string  = 'Products';
  // products : Product[] ;         //not using anymore  
  products$: Observable<Product[]> ; 

  selectedProduct:Product | undefined;

  //Pagination
  pageSize = 5 ;
  start = 0;
  end = this.pageSize ;
  pageNumber = 1 ;

  previousPage() : void {
    this.start-= this.pageSize ;
    this.end -= this.pageSize ;
    this.pageNumber --;
    this.selectedProduct = null ;
  }


  nextPage() : void {
    this.start+= this.pageSize ;
    this.end += this.pageSize ;
    this.pageNumber ++;
    this.selectedProduct = null ;
  }


  
  onSelect(product:Product) : void {
    this.selectedProduct=product ;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(private productService: ProductService, private router:Router) {
   
   } 

  ngOnInit(): void {   
    this.products$ = this.productService.products$ ;    
    //  this.productService                           //instance of service being subscribed by this component
    //  .products$ 
    //  .subscribe(
    //     response => this.products = response 
    //  )
  }
  // wecommented this off to use async instead

}
