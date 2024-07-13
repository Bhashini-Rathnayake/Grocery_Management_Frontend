import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrderDTO} from "../dto/order";
import {OrderAddEditService} from "../../../services/order/order-add-edit.service";
import {Subscription} from "rxjs";
import * as _ from 'underscore';
import {Location} from "@angular/common";

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.css']
})
export class OrderAddEditComponent implements OnInit, OnDestroy {

  orderForm : FormGroup;
  order = new OrderDTO();
  pageType:String;
  products:any=[];
  customers:any=[];

  onOrderChangeSub = new Subscription();

  constructor(private orderAddEditService: OrderAddEditService,
              private formBuilder: FormBuilder,
              private location:Location){}


  ngOnInit(): void {

    this.orderAddEditService.onProductsChange
      .subscribe((products)=>{
        // console.log("products1",products);
        this.products = products;
      });
    this.orderAddEditService.onCustomersChange
      .subscribe((customers)=>{
        // console.log("customers1",customers)
        this.customers = customers;
      });


    this.onOrderChangeSub = this.orderAddEditService.order
      .subscribe((order)=>{
        // console.log("order",order)
        if (!_.isEmpty(order)){
          this.order = new OrderDTO(order);
          this.pageType ="edit";
        }else {
          this.order = new OrderDTO();
          this.pageType = "new"
        }

        this.orderForm = this.createForm();
      })
  }

  ngOnDestroy(): void {
    this.onOrderChangeSub.unsubscribe();
  }

  createForm(){
    return this.formBuilder.group({
      orderId:[this.order.orderId],
      invoiceNumber:[this.order.invoiceNumber,[Validators.required]],
      orderDate:[this.order.orderDate],
      quantity:[this.order.quantity],
      amount:[this.order.amount],
      paymentMethod:[this.order.paymentMethod],
      status:[this.order.status],
      productId:[this.order.productId],
      customerId:[this.order.customerId]
    })
  }

  saveData(){
    let data = this.orderForm.getRawValue();

    console.log("get data", data);
    this.orderAddEditService.saveOreder(data);
    if (data){
      alert("Data Saved");
      this.location.back();
    }
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }


  isDirty(){
    return this.orderForm.dirty;
  }

  isValid(){
    return this.orderForm.valid;
  }


}
