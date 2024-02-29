import AuthReducer from "./slices/AuthSlice.js";
import EntrepriseReducer from "./slices/EntrepriseSlice.js";
import {configureStore} from "@reduxjs/toolkit";

 export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    entreprise: EntrepriseReducer
  },

})
