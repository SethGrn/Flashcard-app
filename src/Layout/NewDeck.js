import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createDeck } from "../utils/api/index.js"

function NewDeck() {

    const history = useHistory();


    const initialFormData = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState(initialFormData);

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    
    const submitHandler = async (event) => {
        event.preventDefault()
        const data = await createDeck(formData)
        setFormData(initialFormData);
        history.push(`/decks/${data.id}`)
    }

    return (
        <>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={submitHandler}>
                <p>Name</p>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Deck Name"
                    required
                    onChange={changeHandler}
                />
                <hr/>
                <p>Description</p>
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Add a Deck Description"
                    required
                    onChange={changeHandler}
                />
                <hr/>
                <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn btn-danger" onClick={() => setFormData(initialFormData)}>Reset Form</button>
            </form>
        </>
        
    )
}

export default NewDeck;