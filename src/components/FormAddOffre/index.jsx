import './formAddOffre.scss'

function FormAddOffre(){
  return(
    <>
      <form method={'POST'}>
        <div className={'input-add'}>
          <label>
            Nom de l'offre
          </label>
          <input type={'text'}/>
        </div>
        <div className={'input-add'}>
          <label>
            Date de début
          </label>
          <input type={'date'}/>
        </div>
        <div className={'input-add'}>
          <label>
            Date de fin
          </label>
          <input type={'date'}/>
        </div>
        <div className={'input-add'}>
          <label>
            Pourcentage de l'offre
          </label>
          <input type={'text'}/>
        </div>
        <div className={'select-add'}>
          <select>
            <option value={''}>Choisir le secteur</option>
          </select>
        </div>
        <div className={'button-add'}>
          <button>
            Valider
          </button>
        </div>
      </form>
    </>
  )
}

export default FormAddOffre;