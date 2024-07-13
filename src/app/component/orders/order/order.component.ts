import {Component, OnInit} from '@angular/core';
import {OrdersService} from "../../../services/order/orders.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  orders: any =[];

  constructor(private orderService: OrdersService,
              private router: Router){}


  ngOnInit(): void {
    this.orderService.onOrdersChange.subscribe((orders)=>{
      this.orders = orders;
      // console.log("orders1",orders)
    })
  }

  addEditOrder(order:any){
    // console.log("order",order);

    if (order != null){
      sessionStorage.setItem("orderID",order.orderId);
    }else {
      sessionStorage.removeItem("orderID");
    }

    this.router.navigate(['/admin/order/add-edit'])
  }

  // searchQuery: string = '';
  //
  // onSearch() {
  //   console.log('Search Query:', this.searchQuery);
  //   // Implement your search logic here
  // }

  onSearch(order: any){
    console.log("order",order);
    }

}
