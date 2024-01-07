import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index.js"
import Main from "./Master.js"
import NewCard from "./NewCard.js"
import Deck from "./Deck.js"
import Study from "./StudyRoute/Study.js"
import EditDeck from "./EditDeck.js"
import NewDeck from "./NewDeck"
import EditCard from "./EditCard"

function Layout() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const getAPIData = async () => {
        const getData = await listDecks();
        setDecks(getData);
    }
    getAPIData();
}, [])

  function updateDecks (data) {
    setDecks(data)
  }

  function deleteDeckHandler (idToDelete) {
    if(window.confirm("Delete this deck? You will not be able to recover it")) {
      deleteDeck(idToDelete)
      setDecks((deckList) => {
        return deckList.filter((deck) => deck.id !== idToDelete)
      })
    }
  }

  return (
    <>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/">
            <Main decks={decks} deleteDeckHandler={deleteDeckHandler}/>
          </Route>

          <Route path="/decks/:id/study">
            <Study decks={ decks } />
          </Route>

          <Route path="/decks/:id/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/decks/:id/cards/new">
            <NewCard />
          </Route>

          <Route path="/decks/:id/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/new">
            <NewDeck />
          </Route>

          <Route path="/decks/:id">
            <Deck />
          </Route>
  
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Layout;
