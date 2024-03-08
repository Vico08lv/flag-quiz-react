import { useSelector, useDispatch } from "react-redux"
import { startChrono, reset } from "../features/chrono"
import { resetScore } from "../features/score"
import { start, stop } from "../features/game"
import { useState } from "react"

export default function Chrono() {

    const score = useSelector(state => state.score)

    const dispatch = useDispatch()
    const chrono = useSelector(state => state.chrono)

    const game = useSelector(state => state.game)

    const [started, setStarted] = useState(false)
    return (
        <div className="flex flex-col pt-5 w[200px]">
            <button
                className="p-2 min-w[125px] bg-slate-100 rounded"
                onClick={started ? (() => { dispatch(reset()); setStarted(!started); dispatch(resetScore()); dispatch(stop()) }) : (() => { dispatch(startChrono()); setStarted(!started); dispatch(start()) })}>
                {started ? "Abandonner" : "Démarrer"}
            </button>
            <p className="text-xl text-slate-100">Temps restant: {chrono.mValue}min {chrono.sValue}s</p>

        </div>
    )
}