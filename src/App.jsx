import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlagCard from "./components/FlagCard"
import spinner from "./assets/loader.svg"
import Chrono from "./components/Chrono"
import "./App.css"
import chrono from "./features/chrono"
import game from "./features/game"
function App() {

  const [APIState, setAPIState] = useState({
    loading: true,
    error: false,
    data: undefined
  })


  const score = useSelector(state => state.score)

  const chrono = useSelector(state => state.chrono)

  const game = useSelector(state => state.game)

  const [langue, setLangue] = useState(false)

  // const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setAPIState({ ...APIState, loading: true })
    fetch("https://restcountries.com/v3.1/all")
      .then(res => {

        //pour capter une mauvaise ressource (connection à l'API ok, mais pas la ressource /usjhsd à la fin du lien)
        if (!res.ok) throw new Error("Erreur")
        return res.json()
      })
      .then(data => {
        setAPIState({ loading: false, error: false, data: data })
      })
      .catch(() => {
        setAPIState({ loading: false, error: true, data: undefined })
      })
  }, [])

  let content;
  if (APIState.loading) content = <img src={spinner} alt="icône de chargement lors du chargement des données" />
  else if (APIState.error) content = <p>Une erreur est survenue</p>

  //optionnal chaining
  else if (APIState.data?.length > 0) {
    content = <>
      <div className="h-[700px] w-[1350px] overflow-auto size-full"
      >
        {APIState.data.map(country =>
          <FlagCard
            key={country.name.common}
            country={country}
            langue={langue}
          // setScore={setScore}
          />
        )}
      </div>
    </>
  }
  else if (APIState.data?.length === 0) {
    content = <p>Aucune donnée </p>
  }

  return (
    <div>

      <div className="chrono">
        <Chrono></Chrono>
      </div>

      <div className="lang-switch flex item-center justify-center">
        <p className="pr-4 text-slate-100">Français : </p>
        <input type="checkbox" onChange={() => setLangue(!langue)} />

        {/* <button 
        onClick={() => setLangue(!langue)}
        className="bg-slate-400 rounded-full w-[60px] h-[30px]">
          <span className="ml-1 w-[20px] h-[20px] bg-slate-100 rounded-full flex"></span>
        </button> */}
      </div>


      {(game.started == true) ?
        <div className="flex flex-col text-lg text-slate-100 font-sem score mt-3">
          Score : {score.value} / {APIState.data?.length}
          <div className="m-5 border-1 rounded-b rounded-lg text-slate-900 border-slate-800 shadow-xl bg-slate-600">
            {content}
          </div>
        </div> :
        <div></div>}

      {/* MODALE DE VICTOIRE */}
      {(APIState.data?.length <= score.value) ? "" : ""}

      {/* {APIState.loading && <img src={spinner} alt="icône de chargement" />} */}

    </div>
  )
}

export default App



// appel API https://restcountries.com/v3.1/all

/*

- randomize flagCards --> useMemo pour les flagcards
- victory modal
- auto-focus le premier input au lancement
- intégration de map avec aggrandissement de la modale
- timer (10 minutes) plutot qu'un chrono

*/