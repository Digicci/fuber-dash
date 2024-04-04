import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  user: null,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setAuth: (state, action) => {
      return{
        ...state,
        user: action.payload === null ? null : {...action.payload},
        auth: action.payload !== null,
      }
    }
  },
})

export const {setAuth} = AuthSlice.actions

export default AuthSlice.reducer