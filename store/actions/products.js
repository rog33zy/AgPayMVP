import { AsyncStorage } from "react-native";
import Product from "../../models/product";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_USER_PRODUCTS = "FETCH_USER_PRODUCTS";

export const fetchAllProductsAction = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://agpay-d4376.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].productType,
            resData[key].productName,
            resData[key].productWeight,
            resData[key].productPrice,
            resData[key].dealerName,
            resData[key].dealerNumber,
            resData[key].dealerDistrict
          )
        );
      }

      dispatch({
        type: FETCH_PRODUCTS,
        allProducts: loadedProducts
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const fetchUsersProductsAction = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        "https://agpay-d4376.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].productType,
            resData[key].productName,
            resData[key].productWeight,
            resData[key].productPrice,
            resData[key].dealerName,
            resData[key].dealerNumber,
            resData[key].dealerDistrict
          )
        );
      }

      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      const userPhoneNumber = transformedData.userPhoneNumber;
      const userProducts = loadedProducts.filter(
        product => product.dealerNumber === userPhoneNumber
      );

      dispatch({
        type: FETCH_USER_PRODUCTS,
        userProducts: userProducts
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const createProductAction = (
  productType,
  productName,
  productWeight,
  productPrice,
  dealerNumber,
  dealerName,
  dealerDistrict
) => {
  return async dispatch => {
    const response = await fetch(
      "https://agpay-d4376.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dealerNumber: dealerNumber,
          dealerName: dealerName,
          dealerDistrict: dealerDistrict,
          productType: productType,
          productName: productName,
          productWeight: productWeight,
          productPrice: productPrice
        })
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        productId: resData.name,
        dealerNumber: dealerNumber,
        dealerName: dealerName,
        dealerDistrict: dealerDistrict,
        productType: productType,
        productName: productName,
        productWeight: productWeight,
        productPrice: productPrice
      }
    });
  };
};
