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
        status === "all" || payment.status === status;

      const matchSearch =
        !searchValue ||
        payment.id?.toLowerCase().includes(searchValue) ||
        payment.customerStripeId?.toLowerCase().includes(searchValue) ||
        payment.utilisateur?.nom?.toLowerCase().includes(searchValue) ||
        payment.utilisateur?.prenom?.toLowerCase().includes(searchValue) ||
        payment.utilisateur?.mail?.toLowerCase().includes(searchValue) ||
        payment.entreprise?.nom_commercial?.toLowerCase().includes(searchValue);

      return matchStatus && matchSearch;
    });
  }, [allPayments, search, status]);

  console.log("allPayments store:", allPayments);
  console.log("payments filtrés:", payments);

  const fetchStripePayments = async () => {
    try {
      dispatch(setStripePaymentsLoading(true));
      const res = await axios.get("admin/stripe/payments");

      console.log("res.data stripe:", res.data);

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