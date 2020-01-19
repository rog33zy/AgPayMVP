import {
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_USER_PRODUCTS
} from "../actions/products";
import Product from "../../models/product";
const initialState = {
  allProducts: [],
  userProducts: []
};

export default productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        allProducts: action.allProducts
      };
    case FETCH_USER_PRODUCTS:
      return {
        ...state,
        userProducts: action.userProducts
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.productId,
        action.productData.productType,
        action.productData.productName,
        action.productData.productWeight,
        action.productData.productPrice,
        action.productData.dealerName,
        action.productData.dealerNumber
      );
      return {
        ...state,
        allProducts: state.allProducts.concat(newProduct)
      };
    default:
      return state;
  }
};
