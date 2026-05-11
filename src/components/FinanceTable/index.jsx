import "./financeTable.scss"


function FinanceTable({companies}) {
  return(
    <table className={"finance-table"}>
      <thead>
      <tr>
        <th>Entreprise</th>
        <th>Courses</th>
        <th>Total</th>
        <th>Reversé</th>
        <th>Commission</th>
      </tr>
      </thead>

      <tbody>
      {companies.length === 0 ?
        (
          <tr>
            <td colSpan="5">Aucune donnée</td>
          </tr>
        ) : (
          companies.map((c) =>(
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.racesCount}</td>
              <td>{c.totalRevenue.toFixed(2)}</td>
              <td>{c.totalReversed.toFixed(2)}</td>
              <td>{c.siteRevenue.toFixed(2)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default FinanceTable;