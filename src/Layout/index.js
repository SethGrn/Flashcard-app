import React, { useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Main from "./Main.js"
import NewDeck from "./NewDeck"

function Layout() {
  

  const [decks, setDecks] = useState([]);

  const updateDecks = (data) => {
    setDecks(data)
  }

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Main decks={decks} updateDecks={updateDecks} />
          </Route>

          <Route path="/decks/new">
            <NewDeck />
          </Route>
  
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
