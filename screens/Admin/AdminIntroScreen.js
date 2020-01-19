import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import Card from "../../components/UI/Card";

import { useSelector, useDispatch } from "react-redux";

import { disbursePayment } from "../../store/actions/disbursements";

import { fetchCurrentUserAction } from "../../store/actions/auth";

import MainButton from "../../components/UI/MainButton";

const AdminIntroScreen = props => {
  const allDealers = useSelector(state => state.auth.allDealers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserAction());
  }, [dispatch]);

  const disburseHandler = () => {
    let i;
    for (i = 0; i < allDealers.length; i++) {
      dispatch(disbursePayment(allDealers[i].phoneNumber, "500"));
    }
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <MainButton style={styles.button} onPress={disburseHandler}>
          DISBURSE TO AGRO DEALERS
        </MainButton>
      </Card>
    </View>
  );
};

AdminIntroScreen.navigationOptions = navData => {
  return {
    headerTitle: "Admin",
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

export default AdminIntroScreen;
