import "./finance.scss";
import {useFinance} from "../../utils/hook/useFinance.jsx";
import FiltersFinance from "../../components/FiltersFinance/index.jsx";
import FinanceCards from "../../components/FinanceCards/index.jsx";
import FinanceTable from "../../components/FinanceTable/index.jsx";

function Finance(){

    const {
      finance,
      period,
      setPeriod,
      search,
      setSearch,
      fetchFinance
    } = useFinance()

    return(
        <div className={'financePage'}>
            <h1>Finance</h1>

            <FiltersFinance
              period={period}
              setPeriod={setPeriod}
              search={search}
              setSearch={setSearch}
              onSearch={fetchFinance}
            />

            <FinanceCards finance={finance}/>

            <FinanceTable companies={finance.companies}/>
        </div>
    )
}

export default Finance;