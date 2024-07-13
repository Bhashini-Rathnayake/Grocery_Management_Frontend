import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements Resolve<any>{
  onCustomerChange = new Subject();

  constructor(private httpClient: HttpClient) { }

  resolve():Observable<any>| Promise<any> |any{
    this.getCustomers();
  }

  getCustomers(){
    this.httpClient.get('http://localhost:8080/customer/get-all-customer')
      .subscribe((customers)=>{
        this.onCustomerChange.next(customers);
        // console.log("customers",customers)
      })
  }
}
