import { AsyncStorage } from "react-native";
import User from "../../models/user";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const ALL_USERS = "ALL_USERS";
export const CURRENT_USER = "CURRENT_USER";
export const UPDATE_BALANCE = "UPDATE_BALANCE";

export const fetchUsersAction = () => {
  return async dispatch => {
    const response = await fetch(
      "https://agpay-d4376.firebaseio.com/users.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const allUsers = [];

    for (const key in resData) {
      allUsers.push(
        new User(
          key,
          resData[key].fullName,
          resData[key].phoneNumber,
          resData[key].password,
          resData[key].userType,
          resData[key].district,
          resData[key].accountBalance
        )
      );
    }
    dispatch({ type: ALL_USERS, users: allUsers });
  };
};

export const fetchCurrentUserAction = () => {
  return async dispatch => {
    const response = await fetch(
      "https://agpay-d4376.firebaseio.com/users.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const allUsers = [];

    for (const key in resData) {
      allUsers.push(
        new User(
          key,
          resData[key].fullName,
          resData[key].phoneNumber,
          resData[key].password,
          resData[key].userType,
          resData[key].district,
          resData[key].accountBalance
        )
      );
    }

    const userData = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(userData);
    const userPhoneNumber = transformedData.userPhoneNumber;
    const currentUser = allUsers.filter(
      user => user.phoneNumber === userPhoneNumber
    );
    const allDealers = allUsers.filter(user => user.userType === "dealer");
    dispatch({
      type: CURRENT_USER,
      currentUser: currentUser,
      allDealers: allDealers
    });
  };
};

export const signupAction = (
  userType,
  fullName,
  phoneNumber,
  password,
  district
) => {
  let accountBalance = "";

  return async dispatch => {
    if (userType === "farmer") {
      accountBalance = 2100;
    }
    const response = await fetch(
      "https://agpay-d4376.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userType: userType,
          fullName: fullName,
          phoneNumber: phoneNumber,
          password: password,
          district: district,
          accountBalance: accountBalance
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    dispatch({
      type: SIGNUP,
      userType: userType,
      fullName: fullName,
      phoneNumber: phoneNumber,
      district: district,
      accountBalance: accountBalance
    });
  };
};

export const loginAction = userObject => {
  return { type: LOGIN, currentUser: userObject };
};

export const updateAccountBalance = (userId, newAccountBalance) => {
  return async dispatch => {
    const response = await fetch(
      `https://agpay-d4376.firebaseio.com/users/${userId}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accountBalance: newAccountBalance
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_BALANCE,
      userId: userId,
      accountBalance: newAccountBalance
    });
  };
};
