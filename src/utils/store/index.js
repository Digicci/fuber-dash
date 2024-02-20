import {legacy_createStore as createStore,combineReducers,applyMiddleware} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {thunk} from "redux-thunk";

import AuthReducer from "./reducers/AuthReducer.js";
import EntrepriseReducer from "./reducers/EntrepriseReducer.js";

const store = createStore(
  combineReducers({
    auth: AuthReducer,
    entreprise: EntrepriseReducer
  }),
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store