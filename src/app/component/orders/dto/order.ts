export class OrderDTO {
  orderId;
  invoiceNumber;
  orderDate;
  quantity;
  amount;
  paymentMethod;
  status;
  customerId;
  productId;

  constructor(order?:any){
    order = order || {};

    this.orderId =order.orderId || null;
    this.invoiceNumber= order.invoiceNumber ||'';
    this.orderDate = order.orderDate || '';
    this.quantity = order.quantity || '';
    this.amount= order.amount || '';
    this.paymentMethod= order.paymentMethod || '';
    this.status = order.status ||'';
    this.customerId=order.customerId || null;
    this.productId = order.productId || null;


  }
}
