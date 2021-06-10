import { createSlice } from '@reduxjs/toolkit'
import styles from "../data.js"
const initialState=styles;
const themeState=createSlice({
    name:'themes',
    initialState,
    reducers:{
       themeSelected(state,action){
           const theme=action.payload
           
           state=theme
         
       }

    }
})

export const {themeSelected} =themeState.actions
export const selectTheme=(state)=>state.themes.themeSelected


export default themeState.reducer;