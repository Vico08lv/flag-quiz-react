import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    started: false
}

export const game = createSlice({
    name: "game",
    initialState,
    reducers: {
        start: (state, action) => {
            state.started = true
        },
        stop: (state, action) => {
            state.started = false
        }
    }
})

export const {start, stop} =  game.actions
export default game.reducer