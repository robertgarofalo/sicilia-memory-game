import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, choiceOne, choiceTwo }) => {

    const handleClick = () => {
        handleChoice(card)
    }

  return (
    <div className="card" key={card.id}>
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="card-front" />
          <img className="back" 
          src="/img/4.png" 
          onClick={choiceOne && choiceTwo ? null : handleClick} 
          alt="card-back" />
        </div>
  </div>
  )
}
export default SingleCard