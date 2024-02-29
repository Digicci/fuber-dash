import { createSlice } from "@reduxjs/toolkit";

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
        enterprise: action.payload,
      }
    }
  }
})

export const {setEntreprise} = EntrepriseSlice.actions

export default EntrepriseSlice.reducer