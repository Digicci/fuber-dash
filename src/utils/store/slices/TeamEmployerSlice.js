import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  team: []
}

const TeamEmployerSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state,action) =>{
      return {
       ...state,
       team : action.payload,
      }
    }
  }
})

export const {setTeam} = TeamEmployerSlice.actions

export default TeamEmployerSlice.reducer