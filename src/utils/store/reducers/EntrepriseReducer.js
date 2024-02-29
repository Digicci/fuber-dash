export const SET_ENTREPRISE = "SET_ENTREPRISE";

const initialState = {
  entreprise: [],
}

 export const EntrepriseReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_ENTREPRISE:
      return{
        ...state,
        entreprise: action.payload,
      }
    default:
      return state
  }
}

