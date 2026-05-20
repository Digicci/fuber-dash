import './stripeTable.scss'
function StripeTable({payments}){
  console.log("payments reçus dans StripeTable:", payments);
  return(
    <table className={'stripe-table'}>
      <thead>
      <tr>
        <th>Paiement Stripe</th>
        <th>Client</th>
        <th>Entreprise</th>
        <th>Montant</th>
        <th>Statut</th>
        <th>Remboursement</th>
        <th>Date</th>
      </tr>
      </thead>

      <tbody>
      {payments.length === 0 ? (
        <tr>
          <td colSpan="6">Aucune donnée</td>
        </tr>
      ) : (
        payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.id}</td>
            <td>
              {payment.utilisateur
                ? `${payment.utilisateur.nom} ${payment.utilisateur.prenom}`
                : "Non renseigné"}
            </td>
            <td>
              {payment.entreprise?.nom_commercial ?? "Non renseigné"}
            </td>
            <td>{(payment.amount / 100).toFixed(2)} €</td>
            <td>{payment.status}</td>
            <td>
              {payment.state === "refunded"
                ? "Remboursé"
                : "Non remboursé"}
            </td>
            <td>{new Date(payment.createdAt).toLocaleString()}</td>
          </tr>
        ))
      )}
      </tbody>
    </table>
  );
}

export default StripeTable;