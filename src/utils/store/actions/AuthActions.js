import {SET_AUTH} from "../reducers/AuthReducer.js";
import {SET_ENTREPRISE} from "../reducers/EntrepriseReducer.js";

export const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    payload: auth === null ? null : {...auth}
  };
}

export const setEntreprise = (entreprise) => {
  return {
    type: SET_ENTREPRISE,
    payload: entreprise,
  }
}