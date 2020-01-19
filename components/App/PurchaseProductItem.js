import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";

import { Ionicons } from "@expo/vector-icons";

import MainButton from "../UI/MainButton";

import { recordTransactionAction } from "../../store/actions/transactions";

import { updateAccountBalance } from "../../store/actions/auth";

import Colors from "../../constants/Colors";

const PurchaseProductItem = props => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const userId = currentUser[0].userId;
  const initialBalance = currentUser[0].accountBalance;

  const [quantityCounter, setQuantityCounter] = useState(0);

  const totalCost = +props.productPrice * +quantityCounter;

  const newBalance = +initialBalance - +totalCost;

  const quantityAddHandler = () => {
    setQuantityCounter(prevState => prevState + 1);
  };

  const quantitySubtractHandler = () => {
    if (quantityCounter > 0) {
      setQuantityCounter(prevState => prevState - 1);
    }
  };

  const dispatch = useDispatch();

  const purchaseProductHandler = () => {
    dispatch(
      recordTransactionAction(
        props.dealerNumber,
        props.productId,
        quantityCounter,
        props.productName.toUpperCase(),
        totalCost
      )
    );
    dispatch(updateAccountBalance(userId, newBalance));
    setQuantityCounter(0);
  };

  const purchaseProductConfirmationHandler = () => {
    Alert.alert(
      "Confirm Purchase",
      `Are you sure you want to buy ${quantityCounter} units of ${props.productName}.`,
      [
        { text: "No", style: "cancel" },
        { text: "Yes", style: "default", onPress: purchaseProductHandler }
      ]
    );
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          {props.productName.toUpperCase()}
        </Text>

        <Text>PRICE: {props.productPrice.toUpperCase()} ZMK</Text>
        <Text>DEALER: {props.productDealer.toUpperCase()}</Text>
        <Text>DISTRICT: {props.district.toUpperCase()}</Text>

        <View style={styles.buttonContainer}>
          <MainButton onPress={quantityAddHandler}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>

          <View style={styles.quantity}>
            <Text>QTY</Text>
            <Text style={{ fontSize: 20 }}>{quantityCounter}</Text>
          </View>

          <MainButton
            onPress={quantitySubtractHandler}
            style2={styles.buttonColor}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
        </View>
        <View style={styles.purchaseButton}>
          <Button
            title="PURCHASE"
            color={Colors.primary}
            onPress={purchaseProductConfirmationHandler}
            disabled={quantityCounter === 0 ? true : false}
          />
        </View>
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
    height: "90%",
    maxWidth: 400,
    maxHeight: 600,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginVertical: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 600,
    maxWidth: "100%"
  },
  purchaseButton: {
    marginVertical: 10
  },
  buttonColor: {
    backgroundColor: Colors.accent
  },
  quantity: {
    alignItems: "center"
  }
});

export default PurchaseProductItem;
