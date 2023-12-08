import React, { useEffect, useState } from "react"
import { useRouteMatch, useParams, Link, useHistory } from "react-router-dom"
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index.js"

function Deck () {
    const params = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();


    const [deck, setDeck] = useState([]);

    useEffect(() => {
        const getAPIData = async () => {
            const getData = await readDeck(params.id);
            console.log(getData)
            setDeck(getData);
        }
        getAPIData();
    }, [params])

    async function deleteHandler() {
        await deleteDeck(deck.id)
        history.push("/")
    }
    async function cardDeleteHandler(cardId) {
        await deleteCard(cardId)
    }
    
    if (deck.length === 0) return <p>Loading...</p>
        else {
            const cardList = deck.cards.map((card) => {
                return (
                    <div className="card">
                        <div className="card-body">
                            <p className="card-text ms-auto">{ card.front }</p>
                            <p className="card-text ms-auto">{ card.back }</p>
                            <div className="d-flex">
                            <a href={`/decks/${deck.id}/edit`} className="btn btn-secondary">Edit</a>
                            <div className="ml-auto">
                                <button onClick={() => {cardDeleteHandler(card.id)}} className="btn btn-primary bg-danger">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            })
            
            return (
                <>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                        </ol>
                    </nav>

                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{deck.name}</h5>
                            <p className="card-text">{deck.description}</p>
                            <div className="d-flex">
                            <a href={`/decks/${deck.id}/edit`} className="btn btn-secondary">Edit</a>
                            <a href={`/decks/${deck.id}/study`} className="btn btn-primary">Study</a>
                            <a href={`${url}/cards/new`} className="btn btn-primary">+ Add Cards</a>
                            <div className="ml-auto">
                                <button onClick={() => {deleteHandler()}} className="btn btn-primary bg-danger">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    <h2>Cards</h2>
                    { cardList }
                </>
                
            )
        }
    
}

export default Deck