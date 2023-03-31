import './App.css';
import {useState} from "react";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [displayPersons, setDisplayPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    const handleAdd = (event) => {
        event.preventDefault()
        const newPersons = persons
        const exist = newPersons.filter(p => p.name === newName)
        if (exist.length === 0) {
            newPersons.push(
                {
                    name: newName,
                    number: newNumber,
                }
            )
            setPersons(newPersons)
        } else {
            alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value)
    }

    const handleFilter = (event) => {
        event.preventDefault()
        const newDisplayPersons = persons.filter(p => p.name.indexOf(filterName) !== -1)
        setDisplayPersons(newDisplayPersons)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter
                handleFilter={handleFilter}
                filterName={filterName}
                handleFilterNameChange={handleFilterNameChange}/>
            <h2>Add a New</h2>
            <PersonForm
                handleAdd={handleAdd}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Content persons={displayPersons}/>
        </div>
    )
}

const Filter = (props) => {
    const {handleFilter, filterName, handleFilterNameChange} = props
    return (
        <form onSubmit={handleFilter}>
            <div>
                filter: <input value={filterName} onChange={handleFilterNameChange}/>
            </div>
            <div>
                <button type="submit">filter</button>
            </div>
        </form>)
}

const PersonForm = (props) => {
    const {handleAdd, newName, handleNameChange, newNumber, handleNumberChange} = props
    return (
        <form onSubmit={handleAdd}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const Content = ({persons}) => {
    return (
        <div>
            {
                persons.map(person => <p>{person.name + ' ' + person.number} </p>)
            }
        </div>
    )
}

export default App;
