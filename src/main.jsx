import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {store} from "./utils/store/index.js";
import {Provider} from "react-redux";
import {ProvideCsrf} from "./utils/hook/useCsrf.jsx";
import {ProvideAxios} from "./utils/hook/useAxios.jsx";
import {ProvideAuthAdmin} from "./utils/hook/useAuthAdmin.jsx";
import {ProvideOffer} from "./utils/hook/useOffer.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProvideCsrf>
        <ProvideAxios>
          <Provider store={store}>
            <ProvideAuthAdmin>
              <ProvideOffer>
                <App />
                <ToastContainer autoClose={3000}/>
              </ProvideOffer>
            </ProvideAuthAdmin>
          </Provider>
        </ProvideAxios>
      </ProvideCsrf>
    </BrowserRouter>
  </React.StrictMode>,
)
