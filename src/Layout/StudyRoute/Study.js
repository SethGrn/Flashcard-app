import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import UnderThreeCards from "./UnderThreeCards.js"
import Breadcrumb from "./Breadcrumb.js"

function Study ({ decks }) {

    const history = useHistory()

    const { id } = useParams();

    const deck = decks.find((deck) => deck.id === parseInt(id))

    const [currentCard, setCurrentCard] = useState(0);
    
    const [message, setMessage] = useState();

    const [cardIsFlipped, setCardIsFlipped] = useState(false)

    useEffect(() => {
        checkIfFinalCard()
    }, [cardIsFlipped])
    

    if (!deck) return <p>loading...</p>;

    if (deck.cards.length < 3) {
            return (
                <div>
                    <Breadcrumb deck={ deck }/>
                    <UnderThreeCards deck={ deck }/>
                </div>
        )
    }

    const { cards } = deck;
    let card = cards[currentCard];
    const { front } = card;
    const { back } = card;

    function checkIfFinalCard () {
            if(cardIsFlipped  && currentCard === (cards.length - 1)) {
                console.log("window.confirm is called")
                setTimeout(() => {
                    if(window.confirm("Restart Cards? Click `cancel`to return to the home page")) {
                        setCurrentCard(0);
                        setMessage();
                    }else {
                        history.push("/")
                    }
                }, 1000)
            }
    }

    if(!message) setMessage(front)

    function flipCard () {
        if (message === front) setMessage(back)
        else setMessage(front)
        setCardIsFlipped(!cardIsFlipped)
    }

    function nextCard () {
        setCurrentCard(currentCard + 1)
        setCardIsFlipped(false)
        setMessage()
    }
    
    return (
        <>
        { 
            console.log("Function returns/items rendered", currentCard, message)
        }
        <Breadcrumb deck={ deck } />
        <h1>Study: {deck.name}</h1>

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {currentCard + 1} of {cards.length}</h5>
                <p className="card-text">{message}</p>
                <div className="d-flex">
                    <button onClick={flipCard} className="btn btn-secondary">Flip</button>
                    {(currentCard + 1 != cards.length && message === back) && <button onClick={() => nextCard()} className="btn btn-primary">Next</button>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Study