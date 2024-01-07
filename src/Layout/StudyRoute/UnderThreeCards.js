import React from "react"

function UnderThreeCards ({ deck }) {
    return (
        <div>
            <h1>Study: {deck.name}</h1>
            <h5>Not enough cards</h5>
            <p>You need at least 3 cards to study, there are {deck.cards.length} cards in this deck</p>
            <a href={`/decks/${deck.id}/cards/new`} type="button" className="btn btn-primary btn-lg">+ Add cards</a>
        </div>
    )
}

export default UnderThreeCards