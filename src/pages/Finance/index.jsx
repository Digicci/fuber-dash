import "./finance.scss";
import {useFinance} from "../../utils/hook/useFinance.jsx";
import FiltersFinance from "../../components/FiltersFinance/index.jsx";
import FinanceCards from "../../components/FinanceCards/index.jsx";
import FinanceTable from "../../components/FinanceTable/index.jsx";
import {getPeriodDates} from "../../utils/data/getPeriodDates.js";
import {useSelector} from "react-redux";
import {getFinanceCompaniesFilters} from "../../utils/store/selectors/FinanceSelector.js";
import {useEffect, useMemo} from "react";

function Finance(){

    const {
      finance,
      period,
      setPeriod,
      search,
      setSearch,
      fetchFinance
    } = useFinance()

  const { start, end } = useMemo(() => {
    return getPeriodDates(period);
  }, [period]);

  useEffect(() => {
    if (!start || !end) return;

    fetchFinance(start, end);
  }, [period, start, end]);

  const handleSearch = () => {
    if (!start || !end) return;

    fetchFinance(start, end);
  };

    const filteredCompanies = useSelector(
      getFinanceCompaniesFilters(start,end,period)
    );

  console.log("period:", period);
  console.log("start:", start);
  console.log("end:", end);
  console.log("filteredCompanies:", filteredCompanies);
  console.log("courses store:", finance.companies?.[0]?.courses);
  console.log("employes store:", finance.companies?.[0]?.employes);

    return(
        <div className={'financePage'}>
            <h1>Finance</h1>

            <FiltersFinance
              period={period}
              setPeriod={setPeriod}
              search={search}
              setSearch={setSearch}
              onSearch={handleSearch}
            />

            <FinanceCards companies={filteredCompanies}/>

            <FinanceTable companies={filteredCompanies}/>
        </div>
    )
}

export default Finance;