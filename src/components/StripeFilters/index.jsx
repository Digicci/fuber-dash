import './stripeFilters.scss'

function StripeFilters({search,setSearch,status,setStatus,onSearch}){
  const statut = [
    {label: "Tous", value:"all" },
    {label: "Réussis", value: "succeeded"},
    {label: "En attente", value: "pending"},
    {label: "Échoués", value:"failed"},
    {label: "Remboursés", value:"refunded"}
  ];
  return(
    <div className={'stripe-filter'}>
      <div className={'status-select'}>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {
            statut.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
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
          type={"text"}
          placeholder={"Rechercher un client ou une entreprise"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  )
}

export default StripeFilters;