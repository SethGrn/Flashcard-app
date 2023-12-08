import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Switch, Route } from "react-router-dom";
import DeckView from "./DeckView.js"
import NewDeck from "./NewDeck"
import { listDecks, deleteDeck } from "../utils/api/index.js"
import "./Main.css"

function Main ({ decks, setDecks }) {

    const history = useHistory();
    const [test, setTest] = useState();

    useEffect(() => {
        const getAPIData = async () => {
            const getData = await listDecks();
            setDecks(getData);
        }
        getAPIData();
    }, [test])

    const mappedList = decks.map((deck) => {
        function deleteHandler() {
            if(window.confirm("Delete this deck? You will not be able to recover it")) {
                deleteDeck(deck.id)
                setTest(deck.id);
            }
        }
        return <DeckView deck={deck} deleteHandler={deleteHandler} />
    })

    return (
        <>
            <button onClick={() => history.push("/decks/new")} type="button" className="btn btn-secondary btn-lg">+ Create Deck</button>
            {mappedList}
            
                <Route path="/decks/new">
                    <NewDeck />
                </Route>
            
        </>
    )
}

export default Main