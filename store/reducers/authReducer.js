import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  ALL_USERS,
  CURRENT_USER,
  UPDATE_BALANCE
} from "../actions/auth";

const initialState = {
  allUsers: [],
  fullName: null,
  phoneNumber: null,
  userType: null,
  district: null,
  isLoggedIn: false,
  currentUser: null,
  allDealers: null,
  referenceId: "",
  apiKey: "",
  accountBalance: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_USERS:
      return {
        ...state,
        allUsers: action.users,
        currentUser: action.currentUser
      };
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        allDealers: action.allDealers
      };
    case LOGIN:
      return {
        ...state,
        currentUser: action.currentUser
      };
    case SIGNUP:
      return {
        ...state,
        userType: action.userType,
        fullName: action.fullName,
        phoneNumber: action.phoneNumber,
        district: action.district,
        referenceId: action.uureferenceIdid4,
        apiKey: action.apiKey,
        accountBalance: action.accountBalance,
        isLoggedIn: true
      };
    case LOGOUT:
      return initialState;
    case UPDATE_BALANCE:
      const newCurrentUser = state.allUsers.filter(
        user => user.userId === action.userId
      );
      newCurrentUser[0].accountBalance = action.accountBalance;
      return { ...state, currentUser: newCurrentUser };
    default:
      return state;
  }
};
