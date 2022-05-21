import './App.css';
import { useEffect, useState, useCallback } from 'react'

import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/1.png", matched: false },
  { "src": "/img/2.png", matched: false },
  { "src": "/img/3.png", matched: false },
  { "src": "/img/flag.png", matched: false },
  { "src": "/img/5.png", matched: false },
  { "src": "/img/6.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(null)
  const [bestScore, setBestScore] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  // duplicate and shuffle cards 
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.floor(Math.random() * 10000) }))
    
    setGameOver(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
 
  useEffect(() => {
    
    if (choiceOne && choiceTwo ) {

      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
        // console.log('matched')
      } else {
        setTimeout(() => resetTurn(), 500)
        // console.log('no match')
      }

    } 

    let allMatched = cards.every(card => card.matched === true)
    if (cards.length > 0) {
      if (allMatched) {
       setGameOver(true)
      } 
    }
      
  },[choiceOne, choiceTwo])

  // console.log(cards)
  useEffect(() => {
    if (gameOver){

      if (bestScore === 0) {
        setBestScore(turns)
      } else if (turns < bestScore) {
        setBestScore(turns)
      } else {
        setBestScore(bestScore)
      }

      // console.log('game over')
    }
  }, [gameOver, bestScore])

  // Create new game automatically
useEffect(() => {
  shuffleCards()
},[])

  // handle a choice
  const handleChoice = (card) => {
    
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // handle reset
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1) 
  }

  

  return (
    <div className="App">
      <h2>Sicilian Memory</h2>
      <button onClick={shuffleCards}>New Game</button>
      {cards.length > 0 && <p>Turns: {turns}</p>}

      <div className="card-grid">
        {cards.map(card => 
        <SingleCard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        />)}
      </div>
      <br />
        <p>Best Score: {bestScore} turns</p>
    </div>
  );
}

export default App;


