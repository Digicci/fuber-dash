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
    code_offre:'',
    recurrence:1,
    reduction:0,
    cummulable:0,
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
      code_offre: offre.code_offre,
      reccurence: offre.reccurence,
      reduction: offre.reduction,
      cummulable: offre.cummulable,
      pourcentage: offre.pourcentage
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const toatsId = toast.loading('En cours de traitement',{autoClose:false})
    const data = validateForm()
    if (data) {
      useOffre.register(data)
      .then((response) => {
        if(response.data && response.status === 201){
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
        } else {
          toast.update(toatsId,{
            render: "Une erreur s'est produite.",
            type: 'error',
            autoClose: 5000,
            isLoading: false,
            icon: '🤔',
          })

        }
      })
      .catch((error) => {
        toast.update(toatsId,{
          render: error,
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
            Nom de l'offre :
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
            Date de début :
          </label>
          <input
            type={'datetime-local'}
            name={'date_de_debut'}
            value={offre.date_debut}
            onChange={(e) => {
              handleChange(e, 'date_debut')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Date de fin :
          </label>
          <input
            type={'datetime-local'}
            name={'date_de_fin'}
            value={offre.date_fin}
            onChange={(e) => {
              handleChange(e, 'date_fin')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Code Promo :
          </label>
          <input
            type={'text'}
            name={'code_offre'}
            value={offre.code_offre}
            onChange={(e) => {
              handleChange(e, 'code_offre')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Récurrence :
          </label>
          <input
            type={'text'}
            name={'reccurence'}
            value={offre.reccurence}
            onChange={(e) => {
              handleChange(e, 'reccurence')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Réduction :
          </label>
          <input
            type={'text'}
            name={'reduction'}
            value={offre.reduction}
            onChange={(e) => {
              handleChange(e, 'reduction')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Cummulable :
          </label>
          <input
            type={'text'}
            name={'cummulable'}
            value={offre.cummulable}
            onChange={(e) => {
              handleChange(e, 'cummulable')
            }}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Pourcentage de l'offre :
          </label>
          <input
            type={'text'}
            name={'pourcentage'}
            value={offre.pourcentage}
            onChange={(e) => {
              handleChange(e, 'pourcentage')
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