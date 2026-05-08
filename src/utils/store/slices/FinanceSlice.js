import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  totalRevenue: 0,
  totalReversed: 0,
  siteRevenue: 0,
  companies: [],
}

export const FinanceSlice = createSlice({
  name: 'finance',
  initialState,
  reducers:{
    setFinanceLoading:(state, action) => {
      return{
        ...state,
        loading: action.payload
      }
    },
    setFinanceData: (state, action) => {
      state.totalRevenue = action.payload.totalRevenue ?? 0;
      state.totalReversed = action.payload.totalReversed ?? 0;
      state.siteRevenue = action.payload.siteRevenue ?? 0;
      state.companies = action.payload.companies ?? [];
    },

    clearFinance: () => initialState,
  },
});

export const {
  setFinanceLoading,
  setFinanceData,
  clearFinance,
} = FinanceSlice.actions;

export default FinanceSlice.reducer;