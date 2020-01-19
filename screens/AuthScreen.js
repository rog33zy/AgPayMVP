import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Picker,
  KeyboardAvoidingView,
  ImageBackground,
  Button,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  AsyncStorage
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import Card from "../components/UI/Card";
import Input from "../components/UI/Input";

import Colors from "../constants/Colors";

import {
  signupAction,
  fetchUsersAction,
  loginAction
} from "../store/actions/auth";

const AuthScreen = props => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("farmer");
  const [nameInput, setNameInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [districtInput, setDistrictInput] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const loginNavHandler = (
    userTypeProvided,
    nameInput,
    phoneNumberInput,
    districtInput
  ) => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        userName: nameInput,
        userPhoneNumber: phoneNumberInput,
        district: districtInput
      })
    );
    if (userTypeProvided === "donor") {
      props.navigation.navigate("DonorsApp");
    } else if (userTypeProvided === "farmer") {
      props.navigation.navigate("FarmersApp");
    } else if (userTypeProvided === "dealer") {
      props.navigation.navigate("DealersApp");
    } else {
      props.navigation.navigate("AdminApp");
    }
  };
  let headerTitle = "Login";

  if (!isLogin) {
    headerTitle = "Sign Up";
  }

  useEffect(() => {
    navigation.setParams({
      authTitle: headerTitle
    });
    dispatch(fetchUsersAction());
  }, [headerTitle, dispatch]);

  const allUsers = useSelector(state => state.auth.allUsers);

  const authHandler = () => {
    const currentUser = allUsers.filter(
      user =>
        user.phoneNumber === phoneNumberInput && user.password === passwordInput
    );
    if (!isLogin) {
      const isUser = allUsers.some(
        user => user.phoneNumber === phoneNumberInput
      );
      if (!isUser) {
        dispatch(
          signupAction(
            userType,
            nameInput,
            phoneNumberInput,
            passwordInput,
            districtInput
          )
        );
        loginNavHandler(userType, nameInput, phoneNumberInput, districtInput);
      } else {
        setErrorMessage("Number already exists, please use another one.");
        setTimeout(() => setErrorMessage(), 5000);
      }
    } else {
      if (currentUser.length !== 0) {
        dispatch(loginAction(currentUser));
        let district = currentUser[0].district;
        if (currentUser[0].userType === "donor") {
          district = "";
        }
        loginNavHandler(
          currentUser[0].userType,
          currentUser[0].fullName,
          currentUser[0].phoneNumber,
          district
        );
      } else {
        setErrorMessage("Wrong credentials, kindly verify");
        setTimeout(() => setErrorMessage(), 5000);
      }
    }
    // signupAction(userType, nameInput, phoneNumberInput, passwordInput)
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={100}
      enabled
    >
      <ImageBackground
        source={{
          uri:
            "https://cdn.pixabay.com/photo/2010/12/13/09/56/corn-1936_960_720.jpg"
        }}
        style={styles.bgImage}
      >
        <Card style={styles.authContainer}>
          <Text style={{ color: "red", fontFamily: "open-sans-bold" }}>
            {errorMessage}
          </Text>
          <ScrollView>
            {isLogin ? null : (
              <View style={styles.picker}>
                <Picker
                  selectedValue={userType}
                  onValueChange={itemValue => setUserType(itemValue)}
                  style={{ width: "100%", fontFamily: "open-sans-bold" }}
                >
                  <Picker.Item
                    label="Farmer"
                    value="farmer"
                    color={Colors.primary}
                  />
                  <Picker.Item
                    label="Donor"
                    value="donor"
                    color={Colors.primary}
                  />
                  <Picker.Item
                    label="Agro-Dealer"
                    value="dealer"
                    color={Colors.primary}
                  />
                  <Picker.Item
                    label="Admin"
                    value="admin"
                    color={Colors.primary}
                  />
                </Picker>
              </View>
            )}
            {isLogin ? null : (
              <Input
                label="Full Name"
                value={nameInput}
                onChangeText={text => setNameInput(text)}
                required
              />
            )}
            <Input
              label="Phone Number"
              value={phoneNumberInput}
              onChangeText={text => setPhoneNumberInput(text)}
              required
            />
            <Input
              label="Password"
              value={passwordInput}
              onChangeText={text => setPasswordInput(text)}
              secureTextEntry
              required
            />

            {isLogin || userType === "donor" || userType === "admin" ? null : (
              <Input
                label="District"
                value={districtInput}
                onChangeText={text => setDistrictInput(text)}
                required
              />
            )}

            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isLogin ? "Login" : "Sign Up"}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isLogin ? "Sign Up" : "Login"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsLogin(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = navData => {
  const headerTitle = navData.navigation.getParam("authTitle");
  return { headerTitle: headerTitle };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
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
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 1
  },
  picker: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  buttonContainer: {
    marginTop: 10
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default AuthScreen;
