import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { fetchAllProductsAction } from "../../store/actions/products";

import PurchaseProductItem from "../../components/App/PurchaseProductItem";

const FarmersProductsScreen = props => {
  const allProducts = useSelector(state => state.products.allProducts);
  const dispatch = useDispatch();
  const productCategory = props.navigation.getParam("productCategory");
  const relevantProducts = allProducts.filter(
    prod => prod.productType === productCategory
  );
  useEffect(() => {
    dispatch(fetchAllProductsAction());
  }, [dispatch]);

  return (
    <FlatList
      data={relevantProducts}
      keyExtractor={item => item.productId}
      renderItem={itemData => (
        <PurchaseProductItem
          productName={
            itemData.item.productName +
            " " +
            itemData.item.productWeight +
            " KG" +
            " " +
            itemData.item.productType
          }
          productPrice={itemData.item.productPrice}
          productDealer={itemData.item.dealerName}
          district={itemData.item.dealerDistrict}
          dealerNumber={itemData.item.dealerNumber}
          productId={itemData.item.productId}
        />
      )}
    />
  );
};

FarmersProductsScreen.navigationOptions = navData => {
  let headerTitle;
  const productCategory = navData.navigation.getParam("productCategory");
  if (productCategory === "fertilizer") {
    headerTitle = "Fertilizers";
  } else if (productCategory === "chickenFeed") {
    headerTitle = "Chicken Feed";
  } else if (productCategory === "pesticide") {
    headerTitle = "Pesticides";
  }
  return {
    headerTitle: headerTitle
  };
};

export default FarmersProductsScreen;
