import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  Picker,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { createProductAction } from "../../store/actions/products";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";

import Colors from "../../constants/Colors";

const AddProductScreen = props => {
  const [productTypeInput, setProductTypeInput] = useState("fertilizer");
  const [productNameInput, setProductNameInput] = useState("");
  const [productWeightInput, setProductWeightInput] = useState("");
  const [productPriceInput, setProductPriceInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const tryObtainUserInfo = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const { userName, userPhoneNumber, district } = transformedData;

      const createProductHandler = () => {
        dispatch(
          createProductAction(
            productTypeInput,
            productNameInput,
            productWeightInput,
            productPriceInput,
            userPhoneNumber,
            userName,
            district
          )
        );
        props.navigation.navigate("DealersIntro");
      };
      props.navigation.setParams({
        createProductHandler: createProductHandler
      });
    };

    tryObtainUserInfo();
  }, [
    productTypeInput,
    productNameInput,
    productWeightInput,
    productPriceInput
  ]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled
    >
      <Card style={styles.authContainer}>
        <Text style={{ color: "red", fontFamily: "open-sans-bold" }}>
          {errorMessage}
        </Text>
        <ScrollView>
          <View style={styles.picker}>
            <Picker
              selectedValue={productTypeInput}
              onValueChange={itemValue => setProductTypeInput(itemValue)}
              style={{ width: "100%", fontFamily: "open-sans-bold" }}
            >
              <Picker.Item
                label="Fertilizer"
                value="fertilizer"
                color={Colors.primary}
              />
              <Picker.Item
                label="Chicken Feed"
                value="chickenFeed"
                color={Colors.primary}
              />
              <Picker.Item
                label="Pesticide"
                value="pesticide"
                color={Colors.primary}
              />
            </Picker>
          </View>

          <Input
            label="Name of Product"
            value={productNameInput}
            onChangeText={text => setProductNameInput(text)}
            required
          />

          <Input
            label="Weight (kg)"
            value={productWeightInput}
            onChangeText={text => setProductWeightInput(text)}
            required
          />

          <Input
            label="Price (ZMK)"
            value={productPriceInput}
            onChangeText={text => setProductPriceInput(text)}
            required
          />
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

AddProductScreen.navigationOptions = navData => {
  const createProductHandler = navData.navigation.getParam(
    "createProductHandler"
  );

  // const submitHandler = () => {
  //   createProductHandler;
  //   console.log(createProductHandler, "hey");
  //   navData.navigation.navigate("DealersIntro");
  // };
  return {
    headerTitle: "Add Product",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="AddItem"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={() => createProductHandler()}
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
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    // padding: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10
  },
  picker: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
});

export default AddProductScreen;
