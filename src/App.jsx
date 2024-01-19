import {Routes,Route} from 'react-router-dom';
import './App.scss';
import Home from "./pages/Home/index.jsx";
import NavBar from "./components/NavBar/index.jsx";
import Offre from "./pages/Offre/index.jsx";
import Login from "./pages/Login/index.jsx";
import PrivateRoute from "./utils/PrivateRoute/index.jsx";

function App() {
  return (
          <>
            <NavBar/>
            <Routes>
              <Route path={"/"} element={<PrivateRoute><Home/></PrivateRoute>}/>
              <Route path={"/offre"} element={<PrivateRoute><Offre/></PrivateRoute>}/>
              <Route path={"/login"} element={<Login/>}/>
            </Routes>
          </>

  )
}

export default App
