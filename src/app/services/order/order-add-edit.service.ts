import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderAddEditService {


  order= new BehaviorSubject({});
  onProductsChange = new Subject();
  onCustomersChange = new Subject();

  constructor(private httpClient:HttpClient) { }

  resolve():Observable<any> | Promise<any> | any{
    this.getOrderById();
    this.getAllProduct();
    this.getAllCustomer();
  }

  getOrderById(){
    let orderId = sessionStorage.getItem("orderID");

    // console.log("orderID",orderId)

    if (orderId !=null){
      this.httpClient.get(`http://localhost:8080/order/getOrderByID/${orderId}`)
        .subscribe((order)=>{
          // console.log("order",order);
          this.order.next(order);
        })
    } else {
      this.order.next({});
      // console.log("order ID null")
    }


  }

  getAllProduct(){
    this.httpClient.get('http://localhost:8080/product/get-all-product')
      .subscribe((products)=>{
        // console.log("products",products)
        this.onProductsChange.next(products);
      })
  }

  getAllCustomer(){
    this.httpClient.get('http://localhost:8080/customer/get-all-customer')
      .subscribe((customers)=>{
        // console.log("customers",customers)
        this.onCustomersChange.next(customers);
      })
  }

  saveOreder(data:any){
    this.httpClient.post('http://localhost:8080/order/save-and-update-order',data)
      .subscribe((order) =>{
        // console.log("orderNew",order);
        this.order.next(order);
      });
  }
}
