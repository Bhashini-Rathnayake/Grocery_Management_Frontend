import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductAddEditService {

  product = new BehaviorSubject({});


  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any> | Promise<any> | any{
    this.getProductByID();
  }

  getProductByID(){
    let productId = sessionStorage.getItem('productID');

    if (productId!=null){
      this.httpClient.get(`http://localhost:8080/product/getProductByID/${productId}`)
        .subscribe((product)=>{
          // console.log("product",product);
          this.product.next(product);
        })
    }else {
      this.product.next({});
      // console.log("product ID null ");
    }
  }

  saveProduct(product:any){
    this.httpClient.post('http://localhost:8080/product/save-and-update-product', product)
      .subscribe((product) =>{
        console.log(product);
        this.product.next(product);
      });
  }
}
