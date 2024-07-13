import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerDTO} from "../dto/customer";
import {Subscription} from "rxjs";
import * as _ from 'underscore';
import {CustomerAddEditService} from "../../../services/customer/customer-add-edit.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
  styleUrls: ['./customer-add-edit.component.css']
})
export class CustomerAddEditComponent implements OnInit, OnDestroy{

  customerForm : FormGroup;
  customer = new CustomerDTO();
  pageType:String;

  onCustomerChangeSub = new Subscription();


  constructor(private customerAddEditService :CustomerAddEditService,
              private formBuilder :FormBuilder,
              private  location: Location){}

  ngOnInit(): void {
    this.onCustomerChangeSub = this.customerAddEditService.customer
      .subscribe((customer)=>{

        if (!_.isEmpty(customer)){
          console.log("customer",customer);
          this.customer = new CustomerDTO(customer);
          this.pageType = "edit";
        }else {
          this.customer = new CustomerDTO();
          this.pageType = "new";
        }
        //  console.log("customer",this.customer)
        this.customerForm = this.createForm();
      })
  }

  ngOnDestroy(): void {
    this.onCustomerChangeSub.unsubscribe();
  }

  createForm(){
    return this.formBuilder.group({
      customerId:[this.customer.customerId],
      customerName:[this.customer.customerName, [Validators.required]],
      customerTelNo:[this.customer.customerTelNo,[Validators.required]],
      customerAddress:[this.customer.customerAddress,[Validators.required]]
    })
  }
  saveCustomer(){
    let customer = this.customerForm.getRawValue();
    console.log("get data", customer);
    this.customerAddEditService.saveCustomer(customer);
    if (customer){
      console.log(customer);
      alert("Data Saved");
      this.location.back()}
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }


  isDirty(){
    return this.customerForm.dirty;
  }

  isValid(){
    return this.customerForm.valid;
  }

}
