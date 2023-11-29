import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./Main.js"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        
        <Switch>
          <Router exact path="/">
            <Main />
          </Router>

          <Router>
            <NotFound />
          </Router>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
