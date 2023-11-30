import React, { useState, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import DeckList from "./DeckList.js"
import "./Main.css"

function Main ({ decks, updateDecks }) {

    const history = useHistory();

    useEffect(() => {
        const getAPIData = async () => {
            const getData = await fetch("http://localhost:8080/decks")
            const data = await getData.json();
            updateDecks(data);
        }
        getAPIData();
    }, [])
    
    return (
        <>
            <button onClick={() => history.push("/decks/new")} type="button" className="btn btn-secondary btn-lg">+ Create Deck</button>

            <DeckList deckList={decks}/>
        </>
    )
}

export default Main