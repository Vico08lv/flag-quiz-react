import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sValue: 0,
    mValue: 10,
    intervalID: undefined
}

export const chrono = createSlice({
    name: "chrono",
    initialState,
    reducers: {
        tick: (state, action) => {
            state.sValue--
            if (state.sValue === -1) {
                state.sValue = 59
                state.mValue--
            }
        },
        reset: (state, action) => {
            state.sValue = 0
            state.mValue = 10
            state.intervalID && window.clearInterval(state.intervalID)
            state.intervalID = undefined
        },
        setUpID: (state, action) => {
            state.intervalID = action.payload
        }
    }
})


export function startChrono(action) {
    return function (dispatch, getState) {
        if (getState().chrono.intervalID) return //pour éviter le spam
        const intervalID = setInterval(() => {
            dispatch(tick())
        }, 1000)
        // dispatch(tick())//pour pas attendre 1s au démarrage
        dispatch(setUpID(intervalID))
    };

}

export const { tick, reset, setUpID } = chrono.actions
export default chrono.reducer