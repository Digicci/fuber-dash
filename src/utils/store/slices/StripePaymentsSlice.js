import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  payments: [],
};

export const StripePaymentsSlice = createSlice({
  name: "stripePayments",
  initialState,
  reducers: {
    setStripePaymentsLoading: (state, action) => {
      state.loading = action.payload;
    },

    setStripePayments: (state, action) => {
      state.payments = action.payload ?? [];
    },
  },
});

export const {
  setStripePayments,
  setStripePaymentsLoading,
} = StripePaymentsSlice.actions;

export default StripePaymentsSlice.reducer;