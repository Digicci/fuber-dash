import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  offer: []
}

const OfferSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setOffer: (state, action) => {
      return{
        ...state,
        offer: action.payload,
      }
    }
  }
})

export const {setOffer} = OfferSlice.actions

export default OfferSlice.reducer