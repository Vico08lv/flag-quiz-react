import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: 0
}

export const score = createSlice({
    name: "score",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value++
        },
        resetScore: (state, action) => {
            state.value = 0
        }
    }
})

export const {increment, resetScore} =  score.actions
export default score.reducer