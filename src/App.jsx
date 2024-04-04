import {Routes,Route} from 'react-router-dom';
import './App.scss';
import Home from "./pages/Home/index.jsx";
import NavBar from "./components/NavBar/index.jsx";
import Offre from "./pages/Offre/index.jsx";
import Login from "./pages/Login/index.jsx";
import PrivateRoute from "./utils/PrivateRoute/index.jsx";
import PopupContainer from "./components/PopupContainer/index.jsx";
import Adhesion from "./pages/Adhesion/index.jsx";
import {useSelector} from "react-redux";
import {getAuth} from "./utils/store/selectors/AuthSelectors.js";


function App() {

    const {auth} = useSelector(getAuth)

  return (
          <>
              {
                  auth && <NavBar/>
              }
            <Routes>
              <Route path={"/"} element={<PrivateRoute><Home/></PrivateRoute>}/>
              <Route path={"/offre"} element={<PrivateRoute><Offre/></PrivateRoute>}/>
              <Route path={"/adhesion"} element={<PrivateRoute><Adhesion/></PrivateRoute>}/>
              <Route path={"/login"} element={<Login/>}/>
            </Routes>
            <PopupContainer/>
          </>

  )
}

export default App