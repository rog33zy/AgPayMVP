import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Card from "../../components/UI/Card";

const DealersProductItem = props => {
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <Text>TYPE: {props.productType.toUpperCase()}</Text>
        <Text>NAME: {props.productName.toUpperCase()}</Text>
        <Text>WEIGHT: {props.productWeight} KG</Text>
        <Text>PRICE: {props.productPrice} ZMK</Text>
      </Card>
    </View>
  );
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
    height: "80%",
    maxWidth: 400,
    maxHeight: 600,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginVertical: 10
  }
});

export default DealersProductItem;
