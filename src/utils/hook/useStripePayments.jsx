import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useAxios} from "./useAxios.jsx";
import {
  setStripePaymentsLoading,
  setStripePayments,
} from "../store/slices/StripePaymentsSlice.js";
import {
  getStripePayments,
  getStripePaymentsLoading,
} from "../store/selectors/StripePaymentsSelector.js";

export const useStripePayments = () => {
  const axios = useAxios();
  const dispatch = useDispatch();

  const payments = useSelector(getStripePayments);
  const loading = useSelector(getStripePaymentsLoading);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const fetchStripePayments = async () => {
    try {
      dispatch(setStripePaymentsLoading(true));
      const res = await axios.get("/admin/stripe/payments",{
        params: {
          search,
          status,
        },
      });

      dispatch(setStripePayments(res.data))
    }catch (error) {
      console.log(error.response?.data || error.message)
    } finally {
      dispatch(setStripePaymentsLoading(false))
    }
  };
  return {
    payments,
    loading,
    search,
    setSearch,
    status,
    setStatus,
    fetchStripePayments,
  };
};