import { useEffect, useState } from 'react'
import Content from './component/Content'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  const [allPersons, setAllPersons] = useState(persons)

  useEffect(() => {
    axios.
      get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  function handleName(e) {
    setNewName(e.target.value)
  }
  function handlePhone(e) {
    setNewPhone(e.target.value)
  }

  function handleFilter(e) {
    setFilter(e.target.value)
    const regex = new RegExp(filter, 'i')
    const filteredPersons = allPersons.filter(person => person.name.match(regex))
    console.log(filteredPersons)
    setPersons(filteredPersons)
  }

  function addPerson(e) {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newObject = {
      name: newName,
      number: newPhone
    }
    setPersons(persons.concat(newObject))
    setAllPersons(allPersons.concat(newObject))
    setNewName('')
    setNewPhone('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}></Filter>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newPhone={newPhone} handleName={handleName} handlePhone={handlePhone} />
      <h2>Numbers</h2>
      <Content persons={persons} />
    </div>
  )
}

export default App