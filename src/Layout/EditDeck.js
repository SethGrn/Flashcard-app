import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api/index.js"

function EditDeck() {

    const { id } = useParams();

    const history = useHistory();

    const [deck, setDeck] = useState()

    const [formData, setFormData] = useState();
    
    useEffect(() => {
        const getAPIData = async () => {
            const getData = await readDeck(id);
            setDeck(getData);
        }
        getAPIData();
    }, [])

    useEffect (() => {
        if (deck) {
            const initialFormData = {
                id: id,
                name: deck.name,
                description: deck.description
            }
            setFormData(initialFormData)
        }
    }, [deck])
    
    if (!formData) return <p>loading</p>
    
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    
    const submitHandler = async (event) => {
        event.preventDefault()
        const data = await updateDeck(formData)
        history.push("/")
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${id}`}>{ deck.name }</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit</li>
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
                    value={formData.name}
                    onChange={changeHandler}
                />
                <hr/>
                <p>Description</p>
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Add a Deck Description"
                    rows="5" cols="60"
                    required
                    value={formData.description}
                    onChange={changeHandler}
                />
                <hr/>
                <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
        
    )
}

export default EditDeck;