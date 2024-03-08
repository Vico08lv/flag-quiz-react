import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 248
}

export const score = createSlice({
    name: "score",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value++
            console.log("score ++")
        },
        resetScore: (state, action) => {
            state.value = 0
            console.log("score reset")
        }
    }
})

export const {increment, resetScore} =  score.actions
export default score.reducer