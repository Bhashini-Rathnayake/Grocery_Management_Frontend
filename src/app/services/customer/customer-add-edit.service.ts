import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Resolve} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomerAddEditService implements Resolve<any>{


  customer = new BehaviorSubject({});

  constructor(private httpClient: HttpClient) {}

  resolve():Observable<any> | Promise<any> | any{
    this.getCustomerByID();
  }

  getCustomerByID(){
    let customerID = sessionStorage.getItem("customerID");

    if (customerID != null){
      this.httpClient.get(`http://localhost:8080/customer/getCustomerByID/${customerID}`)
        .subscribe((customer)=>{
          // console.log("customer",customer);
          this.customer.next(customer);
        })
    }else {
      // console.log("customerID null")
      this.customer.next({});
    }
  }

  saveCustomer(customer:any){
    this.httpClient.post('http://localhost:8080/customer/save-and-update-customer', customer)
      .subscribe((customer) =>{
        console.log(customer);
        this.customer.next(customer);
      });
  }
}
