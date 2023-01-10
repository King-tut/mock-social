import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    name: "Peter",
    email: "peterparker@gmail.com"

}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        showName(state){
            return state.name


        }
    }
})

export const {showName}  = userSlice.actions
export default userSlice.reducer