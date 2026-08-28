import "./filtersFinance.scss"
import PropTypes from "prop-types";

function FiltersFinance({setPeriod,period,search,setSearch,onSearch}){
  const periods = [
    { label: "Mois en cours", value: "current_month" },
    { label: "7 derniers jours", value: "last_7_days" },
    { label: "Semaine en cours", value: "current_week" },
    { label: "6 mois", value: "six_months" },
    { label: "1 an", value: "one_year" },
    { label: "Tout", value: "all" },
  ];

  return(
    <div className={'finance-filters'}>
      <div className={'period-select'}>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          {
            periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))
          }
        </select>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch();
        }}
      >
        <input
          type="text"
          placeholder="Rechercher une entreprise"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit'>Recherche</button>
      </form>
    </div>
  )
}

FiltersFinance.propTypes = {
  onSearch: PropTypes.func,
  period: PropTypes.any,
  search: PropTypes.any,
  setPeriod: PropTypes.func,
  setSearch: PropTypes.func,
}

export default FiltersFinance;