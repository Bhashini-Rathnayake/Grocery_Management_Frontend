import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  onOrdersChange = new Subject();

  constructor(private httpClient: HttpClient) { }

  resolve(): Observable<any> | Promise<any> | any{
    this.getOrders();
  }


  getOrders(){
    this.httpClient.get('http://localhost:8080/order/get-all-order')
      .subscribe((orders)=>{
        this.onOrdersChange.next(orders);
        // console.log("orders",orders)
      })
  }
}
