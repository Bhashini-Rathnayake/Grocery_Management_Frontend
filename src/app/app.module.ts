import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './component/customers/customer/customer.component';
import { CustomerAddEditComponent } from './component/customers/customer-add-edit/customer-add-edit.component';
import { LoginComponent } from './component/login/login.component';
import { AdminLayoutComponent } from './component/admin-layout/admin-layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { OrderComponent } from './component/orders/order/order.component';
import { OrderAddEditComponent } from './component/orders/order-add-edit/order-add-edit.component';
import { ProductComponent } from './component/products/product/product.component';
import { ProductAddEditComponent } from './component/products/product-add-edit/product-add-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";




@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CustomerAddEditComponent,
    LoginComponent,
    AdminLayoutComponent,
    DashboardComponent,
    OrderComponent,
    OrderAddEditComponent,
    ProductComponent,
    ProductAddEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
