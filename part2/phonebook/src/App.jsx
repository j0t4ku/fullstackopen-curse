import { useEffect, useState } from 'react'
import Content from './component/Content'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import axios from 'axios'
import { create, deletePerson, getAll, update } from './services/persons'
import { Notification } from './component/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const [newPhone, setNewPhone] = useState('')

  const [filter, setFilter] = useState('')

  const [allPersons, setAllPersons] = useState(persons)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    actualizarPersons()
  }, [])

  function actualizarPersons() {
    getAll().then(data => {
      setPersons(data)
      setAllPersons(data)
    })
  }

  function handleName(e) {
    setNewName(e.target.value)
  }
  function handlePhone(e) {
    setNewPhone(e.target.value)
  }

  function handleFilter(e) {
    setFilter(e.target.value)
    const regex = new RegExp(e.target.value, 'i')
    const filteredPersons = persons.filter(person => person.name.match(regex))
    console.log(filteredPersons)
    setAllPersons(filteredPersons)
  }

  function addPerson(e) {
    e.preventDefault()
    const exist = persons.find(person => person.name === newName)
    const newObject = {
      name: newName,
      number: newPhone
    }
    if (exist) {
      if (confirm(`${exist.name} is already added to phonebook, replace the old number, with a new one?`)) {
        console.log(exist.id)
        update(exist.id, newObject)
          .then(res => {
            actualizarPersons()
            alertMessege(`Person '${res.name}' was updated`, "updated")
          })
          .catch(e => {
            alertMessege(`Person '${newObject.name}' was already removed from server`, "error")
          })
        return
      }
      alertMessege(`Person '${newObject.name}' was already removed from server`, "error")
      return
    }
    create(newObject)
      .then(response => {
        setPersons(persons.concat(newObject))
        setAllPersons(allPersons.concat(newObject))
        setNewName('')
        setNewPhone('')
        alertMessege(`${response.name} has created`, "success")
      })

  }

  function alertMessege(mess, tipo) {
    console.log(tipo)
    const newMessage = { message: mess, tipo: tipo }
    setErrorMessage(
      newMessage
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  function handleDelete(id) {
    const index = persons.find(person => person.id === id)
    console.log(index)
    if (index === -1) {
      alert('Person doest exist')
      return
    }
    if (confirm(`You want to delete ${index.name}?`)) {
      deletePerson(id)
        .then(response => {
          actualizarPersons()
          alertMessege(`${response.name} has been deleted`, "error")
        })
        .catch(err => alert('Error to delete'))

    }
    return

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter}></Filter>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newPhone={newPhone} handleName={handleName} handlePhone={handlePhone} />
      <h2>Numbers</h2>
      <Content persons={allPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App