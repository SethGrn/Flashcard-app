import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { createCard, readDeck } from "../utils/api/index.js"

function NewDeck() {

    const history = useHistory();

    const { id } = useParams();

    const [deck, setDeck] = useState();

    useEffect(() => {
        const getAPIData = async () => {
            const getData = await readDeck(id);
            setDeck(getData);
        }
        getAPIData();
    }, [])


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
        createCard(id, formData)
        history.push(`/decks/${id}`)
    }

    if (!deck) return <p>loading...</p>

    return (
        <>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${ id }`}>{ deck.name }</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
            </nav>
            <h3>{ deck.name }: Add Card</h3>
            <form onSubmit={submitHandler}>
                <p>Front</p>
                <textarea
                    type="text"
                    name="front"
                    id="front"
                    placeholder="Front side of card"
                    rows="5"
                    cols="100"
                    required
                    onChange={changeHandler}
                />
                <hr/>
                <p>Back</p>
                <textarea
                    type="text"
                    name="back"
                    id="back"
                    placeholder="Back side of card"
                    rows="5"
                    cols="100"
                    required
                    onChange={changeHandler}
                />
                <hr/>
                <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
        
    )
}

export default NewDeck;