import React from "react"

function DeckView ({ deck }) {
    console.log(deck)
    return (
        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <a href="/decks" className="btn btn-secondary">View</a>
                <a href="sheesh" className="btn btn-primary">Study</a>
            </div>
        </div>
    )
}

export default DeckView