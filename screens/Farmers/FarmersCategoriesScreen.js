import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";

import ProductItem from "../../components/App/ProductItem";

const FarmersCategoriesScreen = props => {
  const fertilizerUrl =
    "https://cdn.pixabay.com/photo/2016/01/19/17/49/crop-1149914_1280.jpg";
  const chickenFeedUrl =
    "https://cdn.pixabay.com/photo/2018/11/07/23/12/chicken-3801461_960_720.jpg";
  const pesticidesUrl =
    "https://cdn.pixabay.com/photo/2015/01/03/16/49/herbicide-587589_960_720.jpg";

  const navigateToFarmersProductsHandler = productCategory => {
    props.navigation.navigate("FarmersProducts", {
      productCategory: productCategory
    });
  };
  return (
    <View style={styles.screen}>
      <ProductItem
        image={fertilizerUrl}
        title="Fertilizer"
        onSelectProduct={() => {
          navigateToFarmersProductsHandler("fertilizer");
        }}
      ></ProductItem>

      <ProductItem
        image={chickenFeedUrl}
        title="Chicken Feed"
        onSelectProduct={() => {
          navigateToFarmersProductsHandler("chickenFeed");
        }}
      ></ProductItem>

      <ProductItem
        image={pesticidesUrl}
        title="Pesticides"
        onSelectProduct={() => {
          navigateToFarmersProductsHandler("pesticide");
        }}
      ></ProductItem>
    </View>
  );
};

FarmersCategoriesScreen.navigationOptions = {
  headerTitle: "Categories"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 0
  }
});

export default FarmersCategoriesScreen;
