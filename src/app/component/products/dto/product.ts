export class ProductDTO{
  productId;
  productName;
  price;
  productCode;

  constructor(product?:any){
    product = product || {};

    this.productId=product.productId || null;
    this.productName = product.productName || '';
    this.price = product.price || '';
    this.productCode = product.productCode || '';
  }
}
