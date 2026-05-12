import './stripeTable.scss'
function StripeTable({payments}){
  return(
    <table className={'stripe-table'}>
      <thead>
      <tr>
        <th>Paiement Stripe</th>
        <th>Client</th>
        <th>Entreprise</th>
        <th>Montant</th>
        <th>Statut</th>
        <th>Remboursé</th>
        <th>Date</th>
      </tr>
      </thead>

      <tbody>
      {payments.length === 0 ? (
        <tr>
          <td></td>
        </tr>
      ) : (
        payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.stripePaymentId}</td>
            <td>{payment.client}</td>
            <td>{payment.entreprise.name}</td>
            <td>{Number(payment.amount).toFixed(2)}</td>
            <td>{payment.status}</td>
            <td>{payment.refunded ? "Oui" : "Non"}</td>
            <td>{new Date(payment.createdAt).toLocaleString()}</td>
          </tr>
        ))
      )}
      </tbody>
    </table>
  );
}

export default StripeTable;