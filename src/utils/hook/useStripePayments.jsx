import {useState, useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useAxios} from "./useAxios.jsx";
import {
  setStripePaymentsLoading,
  setStripePayments,
} from "../store/slices/StripePaymentsSlice.js";
import {
  getStripePaymentsLoading,
  getStripePayments
} from "../store/selectors/StripePaymentsSelector.js";

export const useStripePayments = () => {
  const axios = useAxios();
  const dispatch = useDispatch();
  const loading = useSelector(getStripePaymentsLoading);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const allPayments = useSelector(getStripePayments);

  const payments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return allPayments.filter((payment) => {

      const matchStatus =
        status === "all" ||
        payment.status === status ||
        payment.state === status;

      const matchSearch =
        !searchValue ||
        String(payment.id ?? "").toLowerCase().includes(searchValue) ||
        String(payment.customerStripeId ?? "").toLowerCase().includes(searchValue) ||
        String(payment.utilisateur?.nom ?? "").toLowerCase().includes(searchValue) ||
        String(payment.utilisateur?.prenom ?? "").toLowerCase().includes(searchValue) ||
        String(payment.utilisateur?.mail ?? "").toLowerCase().includes(searchValue) ||
        String(payment.entreprise?.nom_commercial ?? "").toLowerCase().includes(searchValue);

      return matchStatus && matchSearch;
    });

  }, [allPayments, search, status]);

  const fetchStripePayments = async () => {
    try {
      dispatch(setStripePaymentsLoading(true));
      const res = await axios.get("admin/stripe/payments");

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