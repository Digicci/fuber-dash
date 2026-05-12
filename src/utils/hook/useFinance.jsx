import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
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

  const isRangeCovered = (loadedStart, loadedEnd, start, end) => {
    if (!loadedStart || !loadedEnd || !start || !end) return false;

    const loadedStartTime = new Date(loadedStart).getTime();
    const loadedEndTime = new Date(loadedEnd).getTime();
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return loadedStartTime <= startTime && loadedEndTime >= endTime;
  };


  const fetchFinance = async (start,end) => {
    console.log({
      loadedStart: finance.loadedStart,
      loadedEnd: finance.loadedEnd,
      start,
      end,
      loadedStartTime: new Date(finance.loadedStart).getTime(),
      loadedEndTime: new Date(finance.loadedEnd).getTime(),
      startTime: new Date(start).getTime(),
      endTime: new Date(end).getTime(),
    });
    if (!start || !end) {
      return;
    }

    const alreadyLoaded = isRangeCovered(
      finance.loadedStart,
      finance.loadedEnd,
      start,
      end
    );

    if(alreadyLoaded){
      return;
    }

    dispatch(setFinanceLoading(true));

    try {
      const res = await axios.get(`admin/entreprise/details`, {params: {period,search },});
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
          ...entreprise,

          id: entreprise.id,
          name: entreprise.nom_commercial,

          courses: entreprise.courses ?? [],
          employes: entreprise.employes ?? [],

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
        start,
        end,
      }));
    }catch (error) {
      console.log(error.response?.data || error.message);
    }finally {
      dispatch(setFinanceLoading(false))
    }
  };
  return{
    finance,
    period,
    setPeriod,
    search,
    setSearch,
    fetchFinance,
  };
};