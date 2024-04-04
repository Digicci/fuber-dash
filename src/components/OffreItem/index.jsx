import './offreItem.scss'
function OffreItem({item}){
  const [dateBeginning, hourBeginning] = item.date_debut.split('T')
  const displayHourBeginning = hourBeginning.split('.')[0]

  const [dateEnd, hourEnd] = item.date_fin.split('T')
  const displayHourEnd = hourEnd.split('.')[0]

  return(
    <>
      <div className={'offre-item'}>
        <div className={'offres'}>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{item.nom_offre}</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{dateBeginning} / {displayHourBeginning}</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{dateEnd} / {displayHourEnd}</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{item.code_offre}</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{item.reccurence} fois</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{item.reduction} €</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{item.cummulable  ? 'Oui' : 'Non'}</p>
          </div>
          <div className={'details-offre'}>
            <p className={'text-offre'}>{item.pourcentage > 0 ? `${item.pourcentage} %` : 'Aucun'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OffreItem;