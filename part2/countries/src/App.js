import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [countries, setCountries] = useState([])
    const [inputCountry, setInputCountry] = useState('')
    const [filterCountries, setFilterCountries] = useState([])

    useEffect(() => {
        console.log('effect')
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleInputCountryChange = (event) => {
        setInputCountry(event.target.value)
    }

    useEffect(() => {
        const displayCountries = countries.filter(c => c.name.common.indexOf(inputCountry) > 0)
        setFilterCountries(displayCountries)
    }, [inputCountry])

    return (
        <div>
            <div>
                find countries: <input value={inputCountry} onChange={handleInputCountryChange}/>
            </div>
            <Countries countries={filterCountries} setCountries={setCountries}/>
        </div>
    );
}

export default App;

const Countries = (props) => {
    const {countries} = props
    const [filterCountry, setFilterCountry] = useState()

    if (filterCountry != null) {
        return <Country country={filterCountry} />
    }
    if (countries.length === 0) {
        return (
            <div>
                Not found!
            </div>
        )
    }
    if (countries.length > 10) {
        return (
            <div>
                Too many found!
            </div>
        )
    }
    if (countries.length > 1) {
        return (
            <div>
                {
                    countries.slice(0, 10).map(
                        c =>
                            <p>
                                {c.name.common}
                                <button onClick={()=>setFilterCountry(c)}>show</button>
                            </p>
                    )
                }
            </div>
        )
    } else {
        return <Country country={countries[0]} />
    }
}

const Country = (props) => {
    const {country} = props

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital: {country.capital}</div>
            <div>area: {country.area}</div>
            <h2>Spoken languages</h2>
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.coatOfArms.png} alt={country.coatOfArms.png} width={"200px"}/>
        </div>
    )
}
