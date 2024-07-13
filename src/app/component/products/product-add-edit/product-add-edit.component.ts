import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductDTO} from "../dto/product";
import {Subscription} from "rxjs";
import {ProductAddEditService} from "../../../services/product/product-add-edit.service";
import * as _ from 'underscore';
import {Location} from "@angular/common";

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit, OnDestroy{

  productForm : FormGroup;
  product = new ProductDTO();
  pageType:String;

  onProductChangeSub = new Subscription();

  constructor(private productAddEditService: ProductAddEditService,
              private formBuilder: FormBuilder,
              private location: Location){}

  ngOnInit(): void {
    this.onProductChangeSub = this.productAddEditService.product
      .subscribe((product)=>{
        // console.log("newProduct",product);
        if (!_.isEmpty(product)){
          this.product = new ProductDTO(product);
          this.pageType= "edit"
        }else {
          this.product = new ProductDTO();
          this.pageType = "new";
        }

        this.productForm = this.createForm();
      })
  }

  ngOnDestroy(): void {
    this.onProductChangeSub.unsubscribe();
  }

  createForm(){
    return this.formBuilder.group({
      productId:[this.product.productId],
      productName:[this.product.productName,[Validators.required]],
      price:[this.product.price],
      productCode:[this.product.productCode]
    })
  }


  saveProduct(){
    let product = this.productForm.getRawValue();
    console.log("get data", product);
    this.productAddEditService.saveProduct(product);
    if (product){
      console.log(product);
      alert("Data Saved");
      this.location.back()}
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }


  isDirty(){
    return this.productForm.dirty;
  }

  isValid(){
    return this.productForm.valid;
  }

}
