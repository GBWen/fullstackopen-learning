import {useEffect, useState} from "react";
import personService from './services/person'
import './App.css';

const App = () => {
    const [persons, setPersons] = useState([])
    const [displayPersons, setDisplayPersons] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(response => {
                setPersons(response[0])
                setDisplayPersons(displayPersons)
            })
            .catch(
                (err) => {
                    setMessage({
                        text: `GetAll error! ${err}`,
                        type: "error",
                    })
                }
            )
    }, [])

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    const handleInsertOrUpdate = (event) => {
        event.preventDefault()
        const newPersons = persons
        const exist = persons.filter(p => p.name === newName)
        const newPerson = {
            name: newName,
            number: newNumber,
        }
        if (exist.length === 0) {
            personService
                .create(newPerson)
                .then(response => {
                    newPerson.id = response.id
                    newPersons.push(newPerson)
                    setPersons(newPersons)
                    displayPersons.push(newPerson)
                    setDisplayPersons(newPersons)
                    setMessage({
                        text: `${newPerson.name} has been added`,
                        type: "success",
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                })
        } else {
            const result = window.confirm(`Update ${newPerson.name}`)
            if (result) {
                personService
                    .update(exist[0].id, newPerson)
                    .then(response => {
                        newPerson.id = exist[0].id
                        const newPersons = persons.map(item => item.id === exist[0].id ? newPerson : item)
                        setPersons(newPersons)
                        const newDisplayPersons = displayPersons.map(item => item.id === exist[0].id ? newPerson : item)
                        setDisplayPersons(newDisplayPersons)
                        setMessage({
                            text: `${newPerson.name} has been updated`,
                            type: "success",
                        })
                        setTimeout(() => {
                            setMessage(null)
                        }, 3000)
                    })
            }
        }

        setNewName('')
        setNewNumber('')
    }

    const handleDelete = (person) => {
        const result = window.confirm(`Delete ${person.name}`)
        if (result) {
            personService
                ._delete(person.id)
                .then(response => {
                    const newDisplayPersons = displayPersons.filter(item => item !== person)
                    const newPersons = persons.filter(item => item !== person)
                    setDisplayPersons(newDisplayPersons)
                    setPersons(newPersons)
                })
        }
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
        const newDisplayPersons = persons.filter(p => {
            return p.name.indexOf(filterName) !== -1
        })
        setDisplayPersons(newDisplayPersons)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message}/>
            <Filter
                handleFilter={handleFilter}
                filterName={filterName}
                handleFilterNameChange={handleFilterNameChange}/>
            <h2>Add a New</h2>
            <PersonForm
                handleInsertOrUpdate={handleInsertOrUpdate}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Content persons={displayPersons} handleDelete={handleDelete}/>
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
    const {handleInsertOrUpdate, newName, handleNameChange, newNumber, handleNumberChange} = props
    return (
        <form onSubmit={handleInsertOrUpdate}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">insert or update</button>
            </div>
        </form>
    )
}

const Content = ({persons, handleDelete}) => {
    return (
        <div>
            {
                persons.map(
                    person =>
                        <p key={person.id}>
                            {person.name + ' ' + person.number}
                            <button onClick={() => handleDelete(person)}>delete</button>
                        </p>)
            }
        </div>
    )
}

const Notification = ({message}) => {
    if (message == null) {
        return null
    }
    console.log(message)
    return (
        <div className={`notification notification_${message.type}`}>
            {message.text}
        </div>
    )
}

export default App;
