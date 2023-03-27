import './App.css';
import {useState} from "react";

const Winner = (props) => {
    const {anecdotes, votes} = props;
    const highestVoteCount = Math.max(...votes)
    const winnerIndex = votes.indexOf(highestVoteCount)

    return (<div>
        <p>{anecdotes[winnerIndex]}</p>
        <p>has {highestVoteCount} votes</p>
    </div>)
}

const Anecdotes = ({text}) => {
    return (
        <div>
            {text}
        </div>
    )
}

const Header = ({name}) => <h2>{name}</h2>

const App = () => {
    const anecdotes = ['If it hurts, do it more often', 'Adding manpower to a late software project makes it later!', 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Premature optimization is the root of all evil.', 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients']

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(6).fill(0))

    const handleNextClick = () => {
        const arrayIndex = Math.floor(Math.random() * anecdotes.length)
        setSelected(arrayIndex)
    }

    const handleVote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)
    }

    return (<div>
        <Header name="Anecdote of the day"/>
        <Anecdotes text={anecdotes[selected]}></Anecdotes>
        <button onClick={handleNextClick}>Next Anecdote</button>
        <button onClick={handleVote}>Vote</button>

        <Header name="Anecdote with most votes"/>
        <Winner anecdotes={anecdotes} votes={votes}></Winner>
    </div>)
}

export default App
