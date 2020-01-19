import React, { useState } from "react";
import * as Font from "expo-font";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { AppLoading } from "expo";

import MainNavigator from "./navigation/Donors/MainNavigator";

import authReducer from "./store/reducers/authReducer";
import productsReducer from "./store/reducers/productsReducer";
import transactionsReducer from "./store/reducers/transactionsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  transactions: transactionsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
