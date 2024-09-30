import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleclickGood = () => {
    setGood(good + 1)
  }
  const handleclickNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleclickBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button type="button" onClick={handleclickGood}>good</button>
        <button type="button" onClick={handleclickNeutral}>neutral</button>
        <button type="button" onClick={handleclickBad}>bad</button>

      </div>
      <h2>Statistics</h2>
      <div>
        <ul>
          <li> <span>good</span> <span>{good}</span> </li>
          <li> <span>neutral</span> <span>{neutral}</span> </li>
          <li> <span>bad</span> <span>{bad}</span> </li>

        </ul>
      </div>
    </div>
  )
}

export default App