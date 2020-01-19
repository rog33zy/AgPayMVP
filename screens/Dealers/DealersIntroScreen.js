import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import ProductItem from "../../components/App/ProductItem";

const DealersIntroScreen = props => {
  const fertilizerUrl =
    "https://cdn.pixabay.com/photo/2016/01/19/17/49/crop-1149914_1280.jpg";
  const chickenFeedUrl =
    "https://cdn.pixabay.com/photo/2018/11/07/23/12/chicken-3801461_960_720.jpg";
  const pesticidesUrl =
    "https://cdn.pixabay.com/photo/2015/01/03/16/49/herbicide-587589_960_720.jpg";

  const navigateToProductsHandler = productCategory => {
    props.navigation.navigate("ViewProducts", {
      productCategory: productCategory
    });
  };
  return (
    <View style={styles.screen}>
      <ProductItem
        image={fertilizerUrl}
        title="Fertilizer"
        onSelectProduct={() => navigateToProductsHandler("fertilizer")}
      ></ProductItem>

      <ProductItem
        image={chickenFeedUrl}
        title="Chicken Feed"
        onSelectProduct={() => navigateToProductsHandler("chickenFeed")}
      ></ProductItem>

      <ProductItem
        image={pesticidesUrl}
        title="Pesticides"
        onSelectProduct={() => navigateToProductsHandler("pesticide")}
      ></ProductItem>
    </View>
  );
};

DealersIntroScreen.navigationOptions = navData => {
  return {
    headerTitle: "Categories",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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
    marginHorizontal: 0,
    marginVertical: 0
  }
});

export default DealersIntroScreen;
