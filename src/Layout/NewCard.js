import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { createCard, readDeck } from "../utils/api/index.js"
import CardForm from "./CardForm.js"

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
    
    async function submitHandler (event) {
        event.preventDefault()
        await createCard(id, formData)
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
            <CardForm submitHandler={ submitHandler } formData={ formData } setFormData={ setFormData }/>
        </>
        
    )
}

export default NewDeck;