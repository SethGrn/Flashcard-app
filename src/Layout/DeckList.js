import React from "react"
import DeckView from "./DeckView.js"

function DeckList ({ deckList }) {
    const mappedList = deckList.map((deck) => <DeckView deck={deck} />)
    return mappedList;
}


export default DeckList