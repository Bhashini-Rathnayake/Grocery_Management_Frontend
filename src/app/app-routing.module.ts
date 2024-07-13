import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {AdminLayoutComponent} from "./component/admin-layout/admin-layout.component";
import {CustomerComponent} from "./component/customers/customer/customer.component";
import {CustomersService} from "./services/customer/customers.service";
import {CustomerAddEditService} from "./services/customer/customer-add-edit.service";
import {OrderComponent} from "./component/orders/order/order.component";
import {OrderAddEditComponent} from "./component/orders/order-add-edit/order-add-edit.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {ProductComponent} from "./component/products/product/product.component";
import {ProductsService} from "./services/product/products.service";
import {ProductAddEditService} from "./services/product/product-add-edit.service";
import {OrdersService} from "./services/order/orders.service";
import {CustomerAddEditComponent} from "./component/customers/customer-add-edit/customer-add-edit.component";
import {OrderAddEditService} from "./services/order/order-add-edit.service";
import {ProductAddEditComponent} from "./component/products/product-add-edit/product-add-edit.component";

let routes: Routes;
routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'customer',
        component: CustomerComponent,
        resolve: {
          data: CustomersService
        }
      },
      {
        path: 'customer/add-edit',
        component: CustomerAddEditComponent,
        resolve: {
          data: CustomerAddEditService
        }
      },
      {
        path: 'order',
        component: OrderComponent,
        resolve: {
          data: OrdersService
        }
      },
      {
        path: 'order/add-edit',
        component: OrderAddEditComponent,
        resolve: {
          data: OrderAddEditService
        }
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'product',
        component: ProductComponent,
        resolve: {
          data: ProductsService
        }
      },
      {
        path: 'product/add-edit',
        component: ProductAddEditComponent,
        resolve: {
          data: ProductAddEditService
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
