import {useEffect} from "react";
import {useStripePayments} from "../../utils/hook/useStripePayments.jsx";
import './stripe.scss'
import StripeTable from "../../components/StripeTable/index.jsx";
import StripeFilters from "../../components/StripeFilters/index.jsx";
import {useSelector} from "react-redux";

function StripePage(){
  const {
    payments,
    loading,
    search,
    setSearch,
    status,
    setStatus,
    fetchStripePayments,
  } = useStripePayments();

  useEffect(() => {
    fetchStripePayments();
  }, [status]);

  console.log("payments envoyés à la table:", payments);

  return(
    <div className={"stripe-page"}>
      <h1>Paiements Stripe</h1>
      <StripeFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onSearch={fetchStripePayments}
      />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <StripeTable payments={payments}/>
      )}
    </div>
  )
}

export default StripePage;