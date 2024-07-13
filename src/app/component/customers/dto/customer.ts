export class CustomerDTO{
  customerId;
  customerName;
  customerAddress;
  customerTelNo;

  constructor(customer?:any){
    customer = customer || {};

    this.customerId =customer.customerId || null;
    this.customerName = customer.customerName ||'';
    this.customerAddress = customer.customerAddress || '';
    this.customerTelNo = customer.customerTelNo || '';
  }
}
