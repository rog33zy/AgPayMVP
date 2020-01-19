import { AsyncStorage } from "react-native";

import Transaction from "../../models/transaction";

export const RECORD_TRANSACTION = "RECORD_TRANSACTION";
export const FETCH_ALL_TRANSACTIONS = "FETCH_ALL_TRANSACTIONS";

export const fetchAllTransactions = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://agpay-d4376.firebaseio.com/transactions.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedTransactions = [];

      for (const key in resData) {
        loadedTransactions.push(
          new Transaction(
            key,
            resData[key].dealerNumber,
            resData[key].farmerNumber,
            resData[key].productId,
            resData[key].quantity,
            resData[key].date,
            resData[key].productName,
            resData[key].totalAmount
          )
        );
      }
      dispatch({
        type: FETCH_ALL_TRANSACTIONS,
        allTransactions: loadedTransactions
      });
    } catch (error) {
      throw error;
    }
  };
};

export const recordTransactionAction = (
  dealerNumber,
  productId,
  quantity,
  productName,
  totalAmount
) => {
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const userPhoneNumber = transformedData.userPhoneNumber;
      const date = new Date();
      const response = await fetch(
        "https://agpay-d4376.firebaseio.com/transactions.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            dealerNumber: dealerNumber,
            farmerNumber: userPhoneNumber,
            productId: productId,
            quantity: quantity,
            productName: productName,
            date: date.toISOString(),
            totalAmount: totalAmount
          })
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();

      dispatch({
        type: RECORD_TRANSACTION,
        transactionData: {
          transactionId: resData.name,
          dealerNumber: dealerNumber,
          farmerNumber: userPhoneNumber,
          productId: productId,
          quantity: quantity,
          productName: productName,
          date: date.toISOString(),
          totalAmount: totalAmount
        }
      });
    } catch (err) {
      throw err;
    }
  };
};
