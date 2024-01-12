import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, readCard, updateCard } from "../utils/api/index.js"
import CardForm from "./CardForm.js"

function EditCard() {

    const { id, cardId } = useParams();

    const history = useHistory();

    const [deck, setDeck] = useState()

    const [formData, setFormData] = useState();
    
    useEffect(() => {
        const getAPIData = async () => {
            const getData = await readDeck(id);
            const getCardData = await readCard(cardId);
            setDeck(getData);
            setFormData(getCardData);
        }
        getAPIData();
    }, [id, cardId])

    if (!formData) return <p>loading...</p>
    
    const submitHandler = async (event) => {
        event.preventDefault()
        await updateCard(formData)
        history.push(`decks/${id}`)
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${id}`}>{ deck.name }</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card { cardId }</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            <CardForm submitHandler={ submitHandler } formData={ formData } setFormData={ setFormData }/>
        </>
        
    )
}

export default EditCard;