import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import FarmersTransactionItem from "../../components/App/FarmersTransactionItem";
import { fetchAllTransactions } from "../../store/actions/transactions";
import { fetchCurrentUserAction } from "../../store/actions/auth";
import { fetchAllProductsAction } from "../../store/actions/products";

const FarmersTransactionsScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions());
    dispatch(fetchCurrentUserAction());
    dispatch(fetchAllProductsAction());
  }, [dispatch]);
  const allTransactions = useSelector(
    state => state.transactions.allTransactions
  );

  const currentUser = useSelector(state => state.auth.currentUser);
  const allDealers = useSelector(state => state.auth.allDealers);
  const allProducts = useSelector(state => state.products.allProducts);

  const relevantTransactions = allTransactions.filter(
    transaction => transaction.farmerNumber === currentUser[0].phoneNumber
  );
  return (
    <FlatList
      data={relevantTransactions}
      keyExtractor={item => item.transactionId}
      renderItem={itemData => (
        <FarmersTransactionItem
          productName={itemData.item.productName}
          dealerName={
            allDealers.find(
              dealer => dealer.dealerNumber === itemData.item.phoneNumber
            ).fullName
          }
          district={
            allDealers.find(
              dealer => dealer.dealerNumber === itemData.item.phoneNumber
            ).district
          }
          quantity={itemData.item.quantity}
          price={
            allProducts.find(
              product => product.productId === itemData.item.productId
            ).productPrice
          }
          totalAmount={
            +itemData.item.quantity *
            +allProducts.find(
              product => product.productId === itemData.item.productId
            ).productPrice
          }
        />
      )}
    />
  );
};

FarmersTransactionsScreen.navigationOptions = {
  headerTitle: "Transactions"
};

export default FarmersTransactionsScreen;
