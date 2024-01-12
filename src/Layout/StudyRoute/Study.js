import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { readDeck } from "../../utils/api/index.js"
import UnderThreeCards from "./UnderThreeCards.js"
import Breadcrumb from "./Breadcrumb.js"

function Study () {

    const history = useHistory()

    const { id } = useParams();

    const [ deck, setDeck ] = useState()

    const [currentCard, setCurrentCard] = useState(0);
    
    const [message, setMessage] = useState();

    const [cardIsFlipped, setCardIsFlipped] = useState(false)

    useEffect(() => {
        async function getAPIData () {
            const getData = await readDeck(id);
            setDeck(getData);
        }
        getAPIData();
    }, [id])

    

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
        checkIfFinalCard()
    }

    function nextCard () {
        setCurrentCard(currentCard + 1)
        setCardIsFlipped(false)
        setMessage()
    }
    
    return (
        <>
        <Breadcrumb deck={ deck } />
        <h1>Study: {deck.name}</h1>

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {currentCard + 1} of {cards.length}</h5>
                <p className="card-text">{message}</p>
                <div className="d-flex">
                    <button onClick={flipCard} className="btn btn-secondary">Flip</button>
                    {(currentCard + 1 !== cards.length && message === back) && <button onClick={() => nextCard()} className="btn btn-primary">Next</button>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Study