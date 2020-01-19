import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { useSelector, useDispatch } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";

import Card from "../../components/UI/Card";

import Colors from "../../constants/Colors";

import MainButton from "../../components/UI/MainButton";

import { fetchCurrentUserAction } from "../../store/actions/auth";

const FarmersIntroScreen = props => {
  const userObject = useSelector(state => state.auth.currentUser);
  let availableBalance = userObject[0].accountBalance;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUserAction());
  }, [dispatch]);

  if (userObject === null) {
    availableBalance = useSelector(state => state.auth.accountBalance);
  }
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 10,
              textAlign: "center",
              textAlignVertical: "bottom"
            }}
          >
            Available Balance
          </Text>
          <Text
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 50,
              textAlign: "center",
              textAlignVertical: "bottom"
            }}
          >
            {availableBalance}
          </Text>

          <Text
            style={{
              fontFamily: "open-sans-bold",
              fontSize: 20,
              textAlign: "center",
              textAlignVertical: "bottom"
            }}
          >
            ZMK
          </Text>
        </View>
      </Card>

      <MainButton
        style={styles.button}
        onPress={() => {
          props.navigation.navigate("FarmersCategories");
        }}
      >
        STORE
      </MainButton>
      <MainButton
        style={styles.button2}
        style2={styles.style2}
        onPress={() => {
          props.navigation.navigate("FarmersTransactions");
        }}
      >
        TRANSACTIONS
      </MainButton>
    </View>
  );
};

FarmersIntroScreen.navigationOptions = navData => {
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
    height: "30%",
    maxWidth: 400,
    maxHeight: 400,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10
  },
  textContainer: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    marginVertical: 15,
    width: "60%"
  },
  button2: {
    marginVertical: 15,
    width: "60%"
  },
  style2: {
    backgroundColor: Colors.accent
  }
});

export default FarmersIntroScreen;
