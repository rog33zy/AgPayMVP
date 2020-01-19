import React from "react";
import { View, Text, StyleSheet } from "react-native";

import moment from "moment";

import Card from "../../components/UI/Card";

const FarmersTransactionsScreen = props => {
  const formattedDate = moment(props.date).format("MMMM Do YYYY");
  const formattedTime = moment(props.date).format("h:mm:ss a");
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          {props.productName}
        </Text>
        <Text>DEALER: {props.dealerName.toUpperCase()}</Text>
        <Text>STORE LOCATION: {props.district.toUpperCase()}</Text>
        <Text>
          QUANTITY: {props.quantity} * {props.price} ZMK
        </Text>
        <Text>TOTAL AMOUNT: {props.totalAmount} ZMK</Text>
        <Text>DATE: {formattedDate}</Text>
        <Text>TIME: {formattedTime}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  cardContainer: {
    width: "80%",
    height: "85%",
    maxWidth: 400,
    maxHeight: 600,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginVertical: 10
  },
  headerText: {
    fontFamily: "open-sans-bold"
  }
});

export default FarmersTransactionsScreen;
