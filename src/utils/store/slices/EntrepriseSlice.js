import { createSlice } from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

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
    setEntrepriseCommission: (state,action) => {
      return{
        ...state,
        entreprise: state.entreprise.map((entreprise) =>{
          if(entreprise.id === action.payload.id){
            return {
              ...entreprise,
              commission: action.payload.commission
            }
          }
          return entreprise
        })
      }
    }
  }
})

export const {setEntreprise,setEntrepriseCommission} = EntrepriseSlice.actions

export default EntrepriseSlice.reducer