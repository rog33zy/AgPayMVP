class Product {
  constructor(
    productId,
    productType,
    productName,
    productWeight,
    productPrice,
    dealerName,
    dealerNumber,
    dealerDistrict
  ) {
    this.productId = productId;
    this.productType = productType;
    this.productName = productName;
    this.productWeight = productWeight;
    this.productPrice = productPrice;
    this.dealerName = dealerName;
    this.dealerNumber = dealerNumber;
    this.dealerDistrict = dealerDistrict;
  }
}

export default Product;
