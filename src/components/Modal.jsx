import "./Modal.css"

export default function Modal({country, closeModal, langue}) {

    let countryIdentifier;
  if (langue) {
    countryIdentifier = country.translations.fra.common
  }
  else {
    countryIdentifier = country.name.common
  }

  return (
    <div onClick={closeModal}
    className="fixed z-10 inset-0 flex items-center justify-center bg-gray-600/50">
        <div
        onClick={e => e.stopPropagation()}
        className="max-w-[800px] rounded p-7 bg-gray-50 mb-[10vh] flex justify-start flex-col">
                <div className="font-semibold justify-center flex pb-5">{countryIdentifier}</div>
                <div>Capitale : {country.capital}</div>
                <div>Habitants : {country.population}</div>
                <a className="country-link pt-4"
                href={country.maps.googleMaps}
                target="_blank">Afficher sur la carte</a>
        </div>
    </div>
  )
}