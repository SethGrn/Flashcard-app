import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { readDeck } from "../utils/api/index.js"

function Study () {

    const history = useHistory()

    const { id } = useParams();

    const [deck, setDeck] = useState();

    const [currentCard, setCurrentCard] = useState(0);
    
    const [message, setMessage] = useState();

    useEffect(() => {
        const getAPIData = async () => {
            const getData = await readDeck(id);
            setDeck(getData);
        }
        getAPIData();
    }, [])

    useEffect(() => {
        if (deck) {
            if(message === back  && currentCard + 1 === deck.cards.length) {
                if(window.confirm("Restart Cards? Click `cancel`to return to the home page")) {
                    setCurrentCard(0);
                    setMessage();
                }else {
                    history.push("/")
                }
            }
        }
    })

    if (!deck) return <p>loading...</p>;

    if (deck.cards.length < 3) {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href={`/decks/${id}`}>{deck.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h5>Not enough cards</h5>
                <p>You need at least 3 cards to study, there are {deck.cards.length} cards in this deck</p>
                <button onClick={() => history.push(`/decks/${deck.id}/cards/new`)} type="button" className="btn btn-primary btn-lg">+ Add cards</button>
            </>
            
        )
    }

    const { cards } = deck;
    let card = cards[currentCard];
    const { front } = card;
    const { back } = card;

    if(!message) setMessage(front)

    function flipCard () {
        if (message === front) setMessage(back)
        else setMessage(front)
    }

    function nextCard () {
        setCurrentCard(currentCard + 1)
        setMessage()
    }
    

    return (
        <>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href={`/decks/${id}`}>{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h1>Study: {deck.name}</h1>

        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {currentCard + 1} of {cards.length}</h5>
                <p className="card-text">{message}</p>
                <div className="d-flex">
                    <button onClick={() => flipCard()} className="btn btn-secondary">Flip</button>
                    {(currentCard + 1 != cards.length && message === back) && <button onClick={() => nextCard()} className="btn btn-primary">Next</button>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Study