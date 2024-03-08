import { configureStore } from "@reduxjs/toolkit"
import score from "./features/score.js"
import chrono from "./features/chrono.js"
import game from "./features/game.js"


export const store = configureStore({

    reducer: {
        score,
        chrono,
        game,
    },
})
