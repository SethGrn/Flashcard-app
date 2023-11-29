import React from "react"

function Main () {
    return (
        <>
            <button style={{marginBottom: 15}} type="button" class="btn btn-secondary btn-lg">+ Create Deck</button>

            <div class="card" >
            <div class="card-body">
                <h5 class="card-title">Rendering in React</h5>
                <p class="card-text">React's component structure allowd fot quickly building a complex web applicaiton that relies on DOM manipulaion.</p>
                <a style={{marginRight: 10, fontSize: 20, paddingLeft: 20, paddingRight: 20}} href="/decks" class="btn btn-secondary">View</a>
                <a style={{marginRight: 10, fontSize: 20, paddingLeft: 20, paddingRight: 20}} href="sheesh" class="btn btn-primary">Study</a>
            </div>
            </div>
        </>
    )
}

export default Main