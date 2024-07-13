import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CustomersService} from "../../../services/customer/customers.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{
  customers: any = [];

  constructor(private customerService: CustomersService,
              private router : Router){}

  ngOnInit(): void {
    this.customerService.onCustomerChange.subscribe((customers)=>{
      this.customers = customers;
      // console.log("customer1",customers)
    })
  }

  addEditCustomer(customer:any){
    // console.log("customer",customer);

    if (customer != null){
      sessionStorage.setItem("customerID",customer.customerId);
    }else {
      sessionStorage.removeItem("customerID")
    }

    this.router.navigate(['/admin/customer/add-edit'])
  }

  // getCustomer(){
  //   this.customerService.getCustomers();
  // }

}
