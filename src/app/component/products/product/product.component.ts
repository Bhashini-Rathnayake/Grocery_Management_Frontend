import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../../services/product/products.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  products : any =[];
  productSearchForm : any =[];
  showFilter: boolean = false;

  constructor(private productService: ProductsService,
              private router : Router,
              private frombuilder : FormBuilder){}

  ngOnInit(): void {
    this.productService.onProductChange.subscribe((products)=>{
      this.products=products;
      // console.log("product1",products)
    })
  }

  addEditProduct(product:any){
    // console.log("product",product);

    if (product != null){
      sessionStorage.setItem("productID",product.productId);
    }else {
      sessionStorage.removeItem("productID");
    }

    this.router.navigate(['/admin/product/add-edit'])
  }

  // getProduct(){
  //   this.productService.getProducts();
  // }

  // addEditProduct(product:any){
  //   // console.log("hardware",hardware);
  //
  //   if (product!=null) {
  //     sessionStorage.setItem("productID",product.productID);
  //   }else {
  //     sessionStorage.removeItem("productID");
  //   }
  //
  //
  //
  //   this.router.navigate(['/admin/products/add-edit'])
  //
  // }
  //
  // deleteProduct(productID){
  //   if (confirm("Are you sure to delete record?"))
  //   // console.log(productID);
  //     this.productService.deleteProduct(productID);
  //
  // }

  onSearch(){
    let data = this.productSearchForm.getRawValue();

    this.productService.getProducts(data);
    // console.log(data)
  }


  onClear(){
    this.productSearchForm.setValue({
      productCode:'',
      productStatus:''

    });

    this.onSearch();

  }

  showHideFilter(){
    this.showFilter = !this.showFilter
  }


}
