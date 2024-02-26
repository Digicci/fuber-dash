import './formAddOffre.scss'
import {useState} from "react";
import {useOffer} from "../../utils/hook/useOffer.jsx";
import {toast} from "react-toastify";

function FormAddOffre(){
  const useOffre = useOffer()
  const [error, setError] = useState('')
  const initialState = {
    nom_offre:'',
    date_debut:'',
    date_fin:'',
    pourcentage:''
  }
  const [offre, setOffre] = useState(initialState)
  const toastTimer = 2000

  function validateForm(){
    for(const[field] of Object.entries(offre)){
      if(field === ''){
        setError('Veuillez remplir tous les champs');
      }
    }
    setError('')
    return{
      nom_offre: offre.nom_offre,
      date_debut: offre.date_debut,
      date_fin: offre.date_fin,
      pourcentage: offre.pourcentage
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const toatsId = toast.loading('En cours de traitement',{autoClose:false})
    const data = validateForm()
    if (data) {
      useOffre.createOffer(data)
      .then((response) => {
        if(response.data){
          setOffre(initialState)
          setError('')
          toast.update(toatsId,{
            render: 'Ajout réussi',
            type: 'success',
            autoClose: toastTimer,
            position: "top-right",
            icon: '👌',
            isLoading: false,
          })
        }
      })
      .catch((error) => {
        toast.update(toatsId,{
          render: error.response.data,
          type: 'error',
          autoClose: 5000,
          isLoading: false,
          icon: '🤔',
        })
        setOffre(initialState)
      });
    }else{
      toast.update(toatsId,{
        render: 'Veuillez remplir tous les champs',
        type: 'error',
        autoClose: 5000,
        isLoading: false,
        icon: '🤔',
        className:'rotateY animated',
        closeOnClick: true,
        closeButton: true,
      })
    }
  }

  const handleChange = (e,field) => {
    const state = {...offre}
    state[field] = e.target.value;
    setOffre(state);

  }
  return(
    <>
      <form method={'POST'}>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Nom de l'offre
          </label>
          <input
            type={'text'}
            name={'nom_offre'}
            value={offre.nom_offre}
            onChange={(e) => {
              handleChange(e, 'nom_offre')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Date de début
          </label>
          <input
            type={'date'}
            name={'date_de_debut'}
            value={offre.date_debut}
            onChange={(e) => {
              handleChange(e,'date_debut')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Date de fin
          </label>
          <input
            type={'date'}
            name={'date_de_fin'}
            value={offre.date_fin}
            onChange={(e) => {
              handleChange(e,'date_fin')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Pourcentage de l'offre
          </label>
          <input
            type={'text'}
            name={'pourcentage'}
            value={offre.pourcentage}
            onChange={(e) => {
              handleChange(e,'pourcentage')
            }}
            required
          />
        </div>
        <div className={'button-add'}>
          <button
            type={'submit'}
            value={'Valider'}
            onClick={handleSubmit}
          >
            Valider
          </button>
        </div>
      </form>
    </>
  )
}

export default FormAddOffre;