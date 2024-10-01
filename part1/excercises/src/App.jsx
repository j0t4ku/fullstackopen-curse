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
        <Buttons text='good' func={() => handleClick('good')} />
        <Buttons text='neutral' func={() => handleClick('neutral')} />
        <Buttons text='bad' func={() => handleClick('bad')} />

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
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positives} />
        </ul>
      }
    </div>
  </>
}


const Buttons = ({ text, func }) => {
  return (
    <button type="button" onClick={func}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <li> <span>{text}</span> : <span>{value}</span> </li>
  )
}

export default App