import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../../services/product/products.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any = [];
  filteredProducts: any = [];
  showFilter: boolean = false;
  searchTerm: string = '';


  constructor(private productService: ProductsService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productService.onProductChange.subscribe((products) => {
      this.products = products;
      this.filteredProducts = this.products; // Initialize filteredProducts with all products
    });
  }

  addEditProduct(product: any) {
    if (product != null) {
      sessionStorage.setItem("productID", product.productId);
    } else {
      sessionStorage.removeItem("productID");
    }

    this.router.navigate(['/admin/product/add-edit']);
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredProducts = this.products.filter((product: any) =>
        product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.productCode.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products; // Reset to all products if search term is empty
    }
  }

  onClear(): void {
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }
}
