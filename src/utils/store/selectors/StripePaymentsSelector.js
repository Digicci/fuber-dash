const emptyPayments = [];

export const getStripePayments = (state) =>
  state.stripePayments?.payments || emptyPayments;

export const getStripePaymentsLoading = (state) =>
  state.stripePayments?.loading ?? false;