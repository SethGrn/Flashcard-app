import React from "react"

function DeckView ({ deck, deleteDeckHandler }) {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="text-right">{deck.cards.length} cards</p>
                <p className="card-text">{deck.description}</p>
                <div className="d-flex">
                <a href={`/decks/${deck.id}`} className="btn btn-secondary">View</a>
                <a href={`/decks/${deck.id}/study`} className="btn btn-primary">Study</a>
                <div className="ml-auto">
                    <button onClick={() => {deleteDeckHandler()}} className="btn btn-primary bg-danger">Delete</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DeckView