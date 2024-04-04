import './addOffre.scss'
import FormAddOffre from "../FormAddOffre/index.jsx";

function AddOffre() {
  return(
    <>
      <div className={'add-offre'}>
        <h4>
          Ajouter votre offre
        </h4>
        <div className={'container-add-offre'}>
          <FormAddOffre/>
        </div>
      </div>
    </>
  )
}
export default AddOffre;