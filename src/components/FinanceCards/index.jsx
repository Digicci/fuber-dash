import "./financeCards.scss"
import PropTypes from "prop-types";

function FinanceCards({companies}){
  const totalRevenue = companies.reduce(
    (sum, company) => sum + Number(company.totalRevenue ?? 0),
    0
  );

  const totalReversed = companies.reduce(
    (sum, company) => sum + Number(company.totalReversed ?? 0),
    0
  );

  const siteRevenue = companies.reduce(
    (sum, company) => sum + Number(company.siteRevenue ?? 0),
    0
  );

  return(
    <div className={"finance-cards"}>
      <div className={"card"}>
        <span>Total encaissé </span>
        <strong>{totalRevenue.toFixed(2)} €</strong>
      </div>
      <div className={"card"}>
        <span>Reversé </span>
        <strong>{totalReversed.toFixed(2)} €</strong>
      </div>
      <div className={"card success"}>
        <span>Bénéfice site </span>
        <strong>{siteRevenue.toFixed(2)} €</strong>
      </div>
    </div>
  )
}


FinanceCards.propTypes = {
  companies: PropTypes.array,
}

export default FinanceCards