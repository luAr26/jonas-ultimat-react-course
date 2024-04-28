/** @format */
import { combineReducers, legacy_createStore as createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// import { createCustomer } from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
// store.dispatch(createCustomer({ fullName: "Raul S.", nationalID: "6730" }));

// console.log(store.getState());

export default store;
