import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {handleAddQuestion} from "../actions/questions";

const NewPoll = ({dispatch}) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState("");
    const [secondOption, setSecondOption] = useState("");

    const handleFirstOptionChange = (e) => {
        const value = e.target.value;
        setFirstOption(value);
    };

    const handleSecondOptionChange = (e) => {
        const value = e.target.value;
        setSecondOption(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleAddQuestion(firstOption, secondOption));
        navigate("/");
    };

    return (
        <div>
            <h1 className="title">New Poll</h1>
            <hr className="title-line"/>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstOption"
                           data-testid="firstOptionLabel">First Option</label>
                    <input
                        value={firstOption}
                        onChange={handleFirstOptionChange}
                        type="text"
                        name="firstOption"
                        id="firstOption"
                        data-testid="firstOption" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="secondOption"
                           data-testid="secondOptionLabel">Second Option</label>
                    <input
                        value={secondOption}
                        onChange={handleSecondOptionChange}
                        type="text"
                        name="secondOption"
                        id="secondOption"
                        data-testid="secondOption" required/>
                </div>

                <div className="form-group">
                    <button type="submit"
                            data-testid="submit-poll">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};

export default connect()(NewPoll);
