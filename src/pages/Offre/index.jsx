import "./offre.scss"
import OffreList from "../../components/OffreList/index.jsx";
import AddOffre from "../../components/AddOffre/index.jsx";
function Offre(){
  return (
    <>
      <div className={'container-offre'}>
        <div className={'title'}>
          <h1>
            Offre
          </h1>
        </div>
        <AddOffre/>
        <OffreList/>
      </div>
    </>
  );
}

export default Offre;