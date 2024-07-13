import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  onProductChange = new Subject();
  private data: any;

  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any> | Promise<any> | any {
    this.getProducts(this.data)
  }

  getProducts(data: any){
    this.httpClient.get('http://localhost:8080/product/get-all-product')
      .subscribe((products)=>{
        this.onProductChange.next(products);
        // console.log("products",products)
      })
  }
}
