import React, { useState, useEffect } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import { readDeck, readCard, updateCard } from "../utils/api/index.js"

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
    }, [])

    if (!formData) return <p>loading...</p>
    console.log(formData)
    
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    
    const submitHandler = async (event) => {
        event.preventDefault()
        const data = await updateCard(formData)
        history.push("/")
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/">{ deck.name }</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card { cardId }</li>
                </ol>
            </nav>
            <h3>Edit Card</h3>
            <form onSubmit={submitHandler}>
                <p>Front</p>
                <textarea
                    type="text"
                    name="front"
                    id="front"
                    placeholder="Front of Card"
                    rows="5"
                    cols="50"
                    required
                    value={formData.front}
                    onChange={changeHandler}
                />
                <hr/>
                <p>Back</p>
                <textarea
                    type="text"
                    name="back"
                    id="back"
                    placeholder="Back of Card"
                    rows="5"
                    cols="50"
                    required
                    value={formData.back}
                    onChange={changeHandler}
                />
                <hr/>
                <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
        
    )
}

export default EditCard;