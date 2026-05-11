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

      const res = await axios.get(`admin/entreprise/details`, {params: {period,search },});
      console.log(res)
      const companies = res.data.map((entreprise) => {
        const totalRaceEmployes = entreprise.employes.reduce((acc,cur) => {return acc + cur.courses.reduce((total,course) => {return total + course.total},0)},0)
        const totalRevenue = Number(entreprise.courses.reduce((acc, cur) => {
          return acc + cur.total
        }, 0) + totalRaceEmployes)/100;
        const siteRevenue = Number(entreprise.courses.reduce((acc, cur) => {
          return acc + cur.commissionPrice
        }, 0) + entreprise.employes.reduce((acc,cur) => {return acc + cur.courses.reduce((total,course) => {return total + course.commissionPrice},0)},0) )/100;
        const employesRaceCount = entreprise.employes.reduce((acc,current) => {return acc + current.courses.length}, 0)
        return {
          id: entreprise.id,
          name: entreprise.nom_commercial,
          racesCount: entreprise.courses.length + employesRaceCount,
          totalRevenue,
          totalReversed: totalRevenue - siteRevenue,
          siteRevenue,
        };
      });

      dispatch(setFinanceData({
        totalRevenue: companies.reduce((sum, c) => sum + c.totalRevenue, 0),
        totalReversed: companies.reduce((sum, c) => sum + c.totalReversed, 0),
        siteRevenue: companies.reduce((sum, c) => sum + c.siteRevenue, 0),
        companies,
      }));
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