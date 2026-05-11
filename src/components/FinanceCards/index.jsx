import "./financeCards.scss"

function FinanceCards({finance}){
  return(
    <div className={"finance-cards"}>
      <div className={"card"}>
        <span>Total encaissé </span>
        <strong>{finance.totalRevenue.toFixed(2)} €</strong>
      </div>
      <div className={"card"}>
        <span>Reversé </span>
        <strong>{finance.totalReversed.toFixed(2)} €</strong>
      </div>
      <div className={"card success"}>
        <span>Bénéfice site </span>
        <strong>{finance.siteRevenue.toFixed(2)} €</strong>
      </div>
    </div>
  )
}

export default FinanceCards