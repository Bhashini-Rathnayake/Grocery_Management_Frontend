import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../../../services/customer/customers.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customers: any = [];
  filteredCustomers: any = [];
  searchTerm: string = '';

  constructor(
    private customerService: CustomersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.onCustomerChange.subscribe((customers) => {
      this.customers = customers;
      this.filteredCustomers = customers;
    });
  }

  addEditCustomer(customer: any) {
    if (customer != null) {
      sessionStorage.setItem('customerID', customer.customerId);
    } else {
      sessionStorage.removeItem('customerID');
    }
    this.router.navigate(['/admin/customer/add-edit']);
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredCustomers = this.customers.filter(
        (customer: any) =>
          customer.customerName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          customer.customerAddress
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCustomers = this.customers; // Reset to all products if search term is empty
    }
  }

  onClear(): void {
    this.searchTerm = '';
    this.filteredCustomers = this.customers;
  }
}
