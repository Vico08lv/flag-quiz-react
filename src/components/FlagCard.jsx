import { useState } from "react"
import { useDispatch } from "react-redux"
import "./FlagCard.css"
import { increment } from "../features/score"
import Modal from "./Modal"
import { createPortal } from "react-dom"



export default function flagCard({ country, langue }) {


  let countryIdentifier;
  if (langue) {
    countryIdentifier = country.translations.fra.common
  }
  else {
    countryIdentifier = country.name.common
  }

  const [validEntry, setValidEntry] = useState(false)

  const dispatch = useDispatch()

  function handleSubmitCountry(e, c) {
    e.stopPropagation()
    if (e.target.value.toUpperCase() === c.toUpperCase()) {
      setValidEntry(true)
      let next = document.getElementById(c).parentElement.parentElement.nextElementSibling.children
      // console.log(next[1])
      next[1].firstChild.focus()
      document.getElementById(c).setAttribute("disabled", "")
      dispatch(increment())
    }
    else {
      setValidEntry(false)
    }
  }

  const [showCountryInfoModal, setShowCountryInfoModal] = useState(false)


  return (
    <>
      <div className="flag-card" >
        <img className="flag-img cursor-pointer" onClick={() => setShowCountryInfoModal(!showCountryInfoModal)} src={country.flags.svg} alt="" />
        <p className="country-name"
          style={validEntry ? { background: "green" } : { background: "#b8b8b8" }}>
          <input
            id={countryIdentifier}
            onChange={(e) => handleSubmitCountry(e, countryIdentifier)}
            className="country-input"
            type="text" />
          {/* <span>{countryIdentifier}</span> */}
        </p>
      </div>

      {showCountryInfoModal && createPortal(
        <Modal
        langue={langue}
        closeModal={() => setShowCountryInfoModal(!showCountryInfoModal)} 
        country={country}
        />,
        document.body
      )}
    </>
  )
}

