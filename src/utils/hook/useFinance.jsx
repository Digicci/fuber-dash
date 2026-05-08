import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {useAxios} from "./useAxios.jsx";
import {
  setFinanceData,
  setFinanceLoading
} from "../store/slices/FinanceSlice.js";
import {getFinance} from "../store/selectors/FinanceSelector.js";

export const useFinance = () => {
  const dispatch = useDispatch();
  const axios = useAxios();

  const finance = useSelector(getFinance)

  const [period, setPeriod] = useState("current_month");
  const [search, setSearch] = useState("")

  const fetchFinance = async () => {
    try {
      dispatch(setFinanceLoading(true));

      const res = await axios.get(`admin/entreprise`, {params: {period,search },});

      dispatch(setFinanceData(res.data));
    }catch (error) {
      console.log(error.response?.data || error.message);
    }finally {
      dispatch(setFinanceLoading(false))
    }
  };
  useEffect(() => {
    fetchFinance();
  }, [period]);
  return{
    finance,
    period,
    setPeriod,
    search,
    setSearch,
    fetchFinance,
  };
};