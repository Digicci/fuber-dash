import './formAddOffre.scss'
import {useRef, useState} from "react";
import {useOffer} from "../../utils/hook/useOffer.jsx";
import {toast} from "react-toastify";

function FormAddOffre(){

  const useOffre = useOffer()
  const error = useRef('')

  const initialState = {
    nom_offre:'',
    date_debut:'',
    date_fin:'',
    code_offre:'',
    recurrence:1,
    reduction:0,
    cummulable:false,
    pourcentage:0
  }
  const [offre, setOffre] = useState(initialState)
  const toastTimer = 2000

  function validateForm(){
    for(const[_, value] of Object.entries(offre)){
      if((typeof  value === 'string' && value === '')){
        error.current = 'Veuillez remplir tous les champs'
        return false;
      }
    }

    if(parseInt(offre.recurrence) < 1) {
      error.current = 'La valeur minimal pour le nombre d\'utilisation est de 1 fois'
      return false
    }

    if(parseFloat(offre.reduction) === 0 && parseFloat(offre.pourcentage) === 0) {
      error.current = 'Merci de saisir un montant ou un pourcentage de réduction.'
      return false
    }

    if(parseFloat(offre.reduction) !== 0 && parseFloat(offre.pourcentage) !== 0) {
      error.current = 'Merci de ne saisir que un montant ou un pourcentage pour l\'offre'
      return false
    }

    error.current = '';
    return true;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const toatsId = toast.loading('En cours de traitement',{autoClose:false})

    if (validateForm()) {
      useOffre.register({...offre})
      .then((response) => {
        if(response.data && response.status === 201){
          setOffre(initialState)
          console.log(response)
          toast.update(toatsId,{
            render: 'Ajout réussi',
            type: 'success',
            autoClose: toastTimer,
            position: "top-right",
            icon: '👌',
            isLoading: false,
          })
        } else {
          console.log(response)
          toast.update(toatsId,{
            render: "Une erreur s'est produite.",
            type: 'error',
            autoClose: 5000,
            isLoading: false,
            icon: '🤔',
          })
        } // fin else
      }) //fin then
      .catch((error) => {
        console.log(error)
        toast.update(toatsId,{
          render: error.message,
          type: 'error',
          autoClose: 5000,
          isLoading: false,
          icon: '🤔',
        })
        setOffre(initialState)
      });
    }else{
      toast.update(toatsId,{
        render: error.current,
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

  const handleChange = (e) => {
    let {value, name} = e.target
    const state = {...offre}
    state[name] = value;
    setOffre(state);

  }
  return(
    <>
      <form method={'POST'}>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Nom de l&#39;offre :
          </label>
          <input
            type={'text'}
            name={'nom_offre'}
            value={offre.nom_offre}
            onChange={handleChange}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Date de début :
          </label>
          <input
            type={'datetime-local'}
            name={'date_debut'}
            value={offre.date_debut}
            onChange={handleChange}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Date de fin :
          </label>
          <input
            type={'datetime-local'}
            name={'date_fin'}
            value={offre.date_fin}
            onChange={handleChange}
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
            onChange={handleChange}
            required
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Nombre d{"'"}utilisation :
          </label>
          <input
            type={'text'}
            name={'recurrence'}
            value={offre.recurrence}
            onChange={handleChange}
            required
            placeholder={'Minimum : 1'}
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Montant de la réduction :
          </label>
          <input
            type={'text'}
            name={'reduction'}
            value={offre.reduction}
            onChange={handleChange}
            required
            placeholder={'Minimum : 0'}
          />
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Offre cummulable ?
          </label>
          <select className={'select-cummulable'} value={offre.cummulable} name={'cummulable'} required onChange={handleChange}>
            <option value={"true"}>Oui</option>
            <option value={"false"}>Non</option>
          </select>
        </div>
        <div className={'input-add'}>
          <label className={'label-input'}>
            Pourcentage de réduction :
          </label>
          <input
            type={'text'}
            name={'pourcentage'}
            value={offre.pourcentage}
            onChange={handleChange}
            required
            placeholder={'Minimum : 0'}
          />
        </div>
        <div className={'button-add'}>
          <button
            type={'submit'}
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