import { createSlice, configureStore } from "@reduxjs/toolkit"

const initialState = {logout: false, story: false,};

const counterSlice = createSlice({
    name:'logout',
    initialState,
    reducers:{
        loader(state){
            state.logout = !state.logout
        },
        storydisplay(state){
            state.story = !state.story
        }
    }
})


const store = configureStore({
    reducer:counterSlice.reducer
})

export const counterActions = counterSlice.actions;

export default store