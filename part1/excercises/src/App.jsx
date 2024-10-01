import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))
  const [mostvote, setMostVote] = useState(0)


  const handleClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleClickVote = () => {
    const update = [...vote]
    update[selected] = update[selected] + 1
    setVote(update)
    mostVote(update)
  }

  const mostVote = (update) => {
    const max = Math.max(...update)
    const most = update.indexOf(max)
    console.log(most, max)
    setMostVote(most)
  }
  return (
    <div>
      <div>
        <h2>Anecdotes of the day</h2>
        <p>
          {anecdotes[selected]}
        </p>
        <p>has {vote[selected]} votes</p>
        <button type="button" onClick={handleClickVote}>vote</button>
        <button type="button" onClick={handleClick}>next anecdotes</button>
      </div>
      <div>
        <h2>Anecdote whit the most votes</h2>
        <p>
          {anecdotes[mostvote]}
        </p>
        <p>has {vote[mostvote]} votes</p>
      </div>
    </div>
  )
}

export default App