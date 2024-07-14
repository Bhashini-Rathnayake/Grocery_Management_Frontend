import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/order/orders.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any = [];
  searchTerm: string = '';
  filteredOrders: any = [];

  constructor(private orderService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.onOrdersChange.subscribe((orders) => {
      this.orders = orders;
      this.filteredOrders = this.orders; // Initialize filteredOrders with all orders
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredOrders = this.orders.filter((order: any) =>
        order.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.invoiceNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredOrders = this.orders; // Reset to all orders if search term is empty
    }
  }

  addEditOrder(order: any) {
    if (order != null) {
      sessionStorage.setItem('orderID', order.orderId);
    } else {
      sessionStorage.removeItem('orderID');
    }

    this.router.navigate(['/admin/order/add-edit']);
  }

  onClear(): void {
    this.searchTerm = '';
    this.filteredOrders = this.orders;
  }
}
