import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Main from "./Main.js"
import NewCard from "./NewCard.js"
import Deck from "./Deck.js"
import Study from "./Study"
import EditDeck from "./EditDeck.js"

function Layout() {

  const [decks, setDecks] = useState([]);

  function updateDecks (data) {
    setDecks(data)
  }

  return (
    <>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/">
            <Main decks={decks} setDecks={updateDecks}/>
          </Route>

          <Route path="/decks/:id/study">
            <Study />
          </Route>

          <Route path="/decks/:id/cards/new">
            <NewCard />
          </Route>

          <Route path="/decks/:id/edit">
            <EditDeck />
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
