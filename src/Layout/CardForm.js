import { useHistory } from "react-router-dom"

function CardForm ({ submitHandler, formData, setFormData }) {

    const history = useHistory();

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    return (
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
                value={formData.front}
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
                value={formData.back}
                onChange={changeHandler}
            />
            <hr/>
            <button type="button" className="btn btn-secondary" onClick={() => history.push("/")}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default CardForm;