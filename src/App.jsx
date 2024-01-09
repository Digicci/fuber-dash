import {Routes,Route} from 'react-router-dom';
import './App.scss';
import Home from "./pages/Home/index.jsx";
import NavBar from "./components/NavBar/index.jsx";

function App() {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
