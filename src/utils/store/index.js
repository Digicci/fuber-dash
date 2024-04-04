import AuthReducer from "./slices/AuthSlice.js";
import EntrepriseReducer from "./slices/EntrepriseSlice.js";
import {configureStore} from "@reduxjs/toolkit";
import TeamEmployerReducer from "./slices/TeamEmployerSlice.js";
import OfferSlice from "./slices/OfferSlice.js";

 export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    entreprise: EntrepriseReducer,
    team: TeamEmployerReducer,
    offer: OfferSlice,
  },

})
