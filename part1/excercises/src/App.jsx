import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positives, setPositives] = useState(0)
  const [setscore, setSetscore] = useState(0)




  const handleClick = (opt) => {
    const updateAll = all + 1
    let updateScore = setscore
    if (opt === 'good') {
      handleclickGood()
      updateScore += 1
      setSetscore(updateScore)

    } else if (opt === 'neutral') {
      handleclickNeutral()
    } else if (opt === 'bad') {
      updateScore -= 1
      setSetscore(updateScore)
      handleclickBad()
    }
    setAll(updateAll)
    calculatePositive(updateAll)
    calculateAverage(updateScore, updateAll)

  }

  const handleclickGood = () => {
    const update = good + 1
    setGood(update)
  }
  const handleclickNeutral = () => {
    const update = neutral + 1
    setNeutral(update)
  }
  const handleclickBad = () => {
    const update = bad + 1
    setBad(update)
  }

  const calculateAverage = (score, all) => {
    setAverage(score / all)
  }
  const calculatePositive = (updateAll) => {
    setPositives(((good * 100) / updateAll))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button type="button" onClick={() => handleClick('good')}>good</button>
        <button type="button" onClick={() => handleClick('neutral')}>neutral</button>
        <button type="button" onClick={() => handleClick('bad')}>bad</button>

      </div>

      < Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positives={positives} />

    </div>
  )
}


const Statistics = ({ good, neutral, bad, all, average, positives }) => {
  return <>
    <h2>Statistics</h2>
    <div>
      {all == 0 ? <p>No feedback given</p> :
        <ul>
          <li> <span>good</span> <span>{good}</span> </li>
          <li> <span>neutral</span> <span>{neutral}</span> </li>
          <li> <span>bad</span> <span>{bad}</span> </li>
          <li> <span>all</span> <span>{all.toString()}</span> </li>
          <li> <span>average</span> <span>{average.toString()}</span> </li>
          <li> <span>positive</span> <span>{positives.toString()}</span> </li>
        </ul>
      }
    </div>
  </>
}

export default App