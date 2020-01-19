import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";

import DealersProductItem from "../../components/App/DealersProductItem";
import { fetchUsersProductsAction } from "../../store/actions/products";

const ViewProductsScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersProductsAction());
  }, [dispatch]);
  const productCategory = props.navigation.getParam("productCategory");
  const userProducts = useSelector(state => state.products.userProducts);
  const relevantProducts = userProducts.filter(
    product => product.productType === productCategory
  );
  return (
    <FlatList
      data={relevantProducts}
      keyExtractor={item => item.productId}
      renderItem={itemData => (
        <DealersProductItem
          productType={itemData.item.productType}
          productName={itemData.item.productName}
          productWeight={itemData.item.productWeight}
          productPrice={itemData.item.productPrice}
        />
      )}
    />
  );
};

ViewProductsScreen.navigationOptions = navData => {
  return {
    headerTitle: "Products",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="AddItem"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddProduct");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10
  },
  cardContainer: {
    width: "80%",
    height: "16%",
    maxWidth: 400,
    maxHeight: 600,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginVertical: 10
  }
});

export default ViewProductsScreen;
