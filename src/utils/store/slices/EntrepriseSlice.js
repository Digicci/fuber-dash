import { createSlice } from "@reduxjs/toolkit";
import {STATUT} from "../../hook/useAuthAdmin.jsx";

const initialState = {
  entreprise:[],
}

export const EntrepriseSlice = createSlice({
  name: 'entreprise',
  initialState,
  reducers: {
    setEntreprise: (state,action) => {
      return{
        ...state,
        entreprise: action.payload,
      }
    },
    bannedDriver(state, action) {
      state.entreprise = state.entreprise.map(en => en.id === action.payload ? {...en, statut: STATUT.BANNED} : en)
    }
  }
})

export const {
  setEntreprise,
  bannedDriver
} = EntrepriseSlice.actions

export default EntrepriseSlice.reducer