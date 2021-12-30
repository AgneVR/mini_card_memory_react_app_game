import { useEffect, useState } from 'react';
import cardBack from './images/8cEbeEMLi.png';
import './App.css';

function App() {
  const [getCard, setCard] = useState([]);
  const [getCardOne, setCardOne] = useState();
  const [getCardTwo, setCardTwo] = useState();
  const [getPause, setPause] = useState(false);

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52')
      .then((response) => response.json())
      .then(
        (data) => {
          let cardsArr = data.cards;
          cardsArr.forEach((el) => {
            el.opened = false;
          });
          setCard(cardsArr);
        },
        // setCard(data.cards)
      );
  }, []);
  //"CLUBS" "SPADES" suit
  //"HEARTS" "DIAMONDS"
  //xconsole.log(getCard);

  useEffect(() => {
    if (getCardOne && getCardTwo) {
      setPause(true);
      if (
        getCardOne.value === getCardTwo.value &&
        ((getCardOne.suit === 'CLUBS' && getCardTwo.suit === 'SPADES') ||
          (getCardTwo.suit === 'CLUBS' && getCardOne.suit === 'SPADES'))
      ) {
        console.log('CLUBS');
        let newCardsArr = getCard;
        newCardsArr.forEach((card) => {
          if (card === getCardOne || card === getCardTwo) {
            card.opened = true;
          }
        });
        setCard(newCardsArr);
      } else if (
        getCardOne.value === getCardTwo.value &&
        ((getCardOne.suit === 'HEARTS' && getCardTwo.suit === 'DIAMONDS') ||
          (getCardTwo.suit === 'HEARTS' && getCardOne.suit === 'DIAMONDS'))
      ) {
        console.log('HEARTS');
        let newCardsArr = getCard;
        newCardsArr.forEach((card) => {
          if (card === getCardOne || card === getCardTwo) {
            card.opened = true;
          }
        });
        setCard(newCardsArr);
      }

      setTimeout(() => {
        resetCads();
      }, 2000);
    }
  }, [getCardOne, getCardTwo]);

  function clickedCard(cardClicked) {
    if (getPause === false) {
      if (getCardOne) {
        setCardTwo(cardClicked);
      } else {
        setCardOne(cardClicked);
      }
    }
  }

  function resetCads() {
    setCardOne();
    setCardTwo();
    setPause(false);
  }

  return (
    <div className='container'>
      {getCard.map((el, i) => (
        <div key={i} className='card'>
          <div
            className={
              el === getCardOne || el === getCardTwo || el.opened === true ? 'turnAroundCard' : ''
            }
          >
            <img className='face' src={el.image} alt='card' />
            <img src={cardBack} onClick={() => clickedCard(el)} alt='' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
