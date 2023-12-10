import React from "react"
import { useHistory } from "react-router-dom"
import DeckView from "./DeckView.js"
import "./Master.css"

function Master ({ decks, deleteDeckHandler }) {
    console.log(decks)

    const history = useHistory();

    const mappedList = decks.map((deck) => {
        return <DeckView deck={deck} deleteDeckHandler={() => deleteDeckHandler(deck.id)} />
    }) 

    return (
        <>
            <button onClick={() => history.push("/decks/new")} type="button" className="btn btn-secondary btn-lg">+ Create Deck</button>
            {mappedList}
            
        </>
    )
}

export default Master