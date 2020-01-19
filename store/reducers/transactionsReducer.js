import {
  RECORD_TRANSACTION,
  FETCH_ALL_TRANSACTIONS
} from "../actions/transactions";

import Transaction from "../../models/transaction";

const initialState = {
  allTransactions: []
};

export default transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TRANSACTIONS:
      return {
        allTransactions: action.allTransactions
      };
    case RECORD_TRANSACTION:
      const newTransaction = new Transaction(
        action.transactionData.transactionId,
        action.transactionData.dealerNumber,
        action.transactionData.farmerNumber,
        action.transactionData.productId,
        action.transactionData.productType,
        action.transactionData.quantity,
        action.transactionData.date,
        action.transactionData.productName,
        action.transactionData.totalAmount
      );
      return {
        allTransactions: state.allTransactions.concat(newTransaction)
      };
    default:
      return state;
  }
};
