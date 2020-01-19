class Transaction {
  constructor(
    transactionId,
    dealerNumber,
    farmerNumber,
    productId,
    quantity,
    date,
    productName,
    totalAmount
  ) {
    this.transactionId = transactionId;
    this.dealerNumber = dealerNumber;
    this.farmerNumber = farmerNumber;
    this.productId = productId;
    this.quantity = quantity;
    this.date = date;
    this.productName = productName;
    this.totalAmount = totalAmount;
  }
}

export default Transaction;
