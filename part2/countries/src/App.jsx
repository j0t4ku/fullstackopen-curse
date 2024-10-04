import { useEffect, useState } from 'react'
import { getAll } from './services/countries'
import Content from './component/Content'
import Filter from './component/Filter'

function App() {
  const [find, setfind] = useState("")
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState(null)

  function handleFind(e) {
    setfind(e.target.value)
    filterCountries(e.target.value)
  }

  function filterCountries(countri) {
    console.log(countri)
    const regex = new RegExp(countri, 'i')
    const filteredCountrie = countries.filter(countrie => countrie.name.common.match(regex))
    setFilter(filteredCountrie)

  }

  useEffect(() => {
    getAll()
      .then(response => {
        setCountries(response.flat())
      })
  }, [])



  return (
    <>
      <Filter find={find} handleFind={handleFind} />
      <Content countries={filter} setFilter={setFilter} />
    </>
  )
}

export default App
