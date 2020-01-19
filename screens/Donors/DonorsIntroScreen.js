import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import Card from "../../components/UI/Card";

import { useSelector, useDispatch } from "react-redux";

import { requestPayment } from "../../store/actions/collections";

import { fetchCurrentUserAction } from "../../store/actions/auth";

import MainButton from "../../components/UI/MainButton";

const DonorsIntroScreen = props => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const phoneNumber = currentUser[0].phoneNumber;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserAction());
  }, [dispatch]);

  const disburseHandler = () => {
    dispatch(requestPayment(phoneNumber));
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <MainButton style={styles.button} onPress={disburseHandler}>
          DEBIT AGPAY ACCOUNT
        </MainButton>
      </Card>
    </View>
  );
};

DonorsIntroScreen.navigationOptions = navData => {
  return {
    headerTitle: "Homepage",
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
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    width: "80%",
    height: "20%",
    maxWidth: 400,
    maxHeight: 400,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10
  },
  button: {
    marginVertical: 15,
    width: "100%"
  }
});

export default DonorsIntroScreen;
