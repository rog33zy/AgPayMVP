import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import { createStackNavigator } from "react-navigation-stack";

import { SafeAreaView, Button, View } from "react-native";

// import { createBottomTabNavigator } from 'react-navigation-tabs';

import {
  createDrawerNavigator,
  DrawerNavigatorItems
} from "react-navigation-drawer";

import DealersIntroScreen from "../../screens/Dealers/DealersIntroScreen";
import AddProductScreen from "../../screens/Dealers/AddProductScreen";
import ViewProductsScreen from "../../screens/Dealers/ViewProductsScreen";
import DonorsIntroScreen from "../../screens/Donors/DonorsIntroScreen";

import FarmersIntroScreen from "../../screens/Farmers/FarmersIntroScreen";
import FarmersCategoriesScreen from "../../screens/Farmers/FarmersCategoriesScreen";
import FarmersProductsScreen from "../../screens/Farmers/FarmersProductsScreen";
import FarmersTransactionsScreen from "../../screens/Farmers/FarmersTransactionsScreen";

import AuthScreen from "../../screens/AuthScreen";

import AdminIntroScreen from "../../screens/Admin/AdminIntroScreen";

import Colors from "../../constants/Colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans"
  },
  headerTintColor: "white"
};

const DealersNavigator = createStackNavigator(
  {
    DealersIntro: DealersIntroScreen,
    AddProduct: AddProductScreen,
    ViewProducts: ViewProductsScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const DonorsNavigator = createStackNavigator(
  {
    DonorsIntro: DonorsIntroScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const FarmersNavigator = createStackNavigator(
  {
    FarmersIntro: FarmersIntroScreen,
    FarmersCategories: FarmersCategoriesScreen,
    FarmersProducts: FarmersProductsScreen,
    FarmersTransactions: FarmersTransactionsScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNavigator = createStackNavigator(
  {
    AdminIntro: AdminIntroScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const DealersAppNavigator = createDrawerNavigator(
  {
    Dealers: DealersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      // const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const FarmersAppNavigator = createDrawerNavigator(
  {
    Farmers: FarmersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      // const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const DonorsAppNavigator = createDrawerNavigator(
  {
    Donors: DonorsNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      // const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AdminAppNavigator = createDrawerNavigator(
  {
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      // const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  DealersApp: DealersAppNavigator,
  FarmersApp: FarmersAppNavigator,
  DonorsApp: DonorsAppNavigator,
  AdminApp: AdminAppNavigator
});

export default createAppContainer(MainNavigator);
