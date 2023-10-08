import {connect} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {handleAddAnswer} from "../actions/questions";
import noAvailable from '../icons/noAvailable.png';

const PollPage = ({dispatch, authedUser, question, author}) => {
    const navigate = useNavigate();

    if (!authedUser || !question || !author) {
        return <Navigate to="/404"/>;
    }

    const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
    const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
    const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

    const handleOptionOne = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionOne"));
        navigate("/");
    };

    const handleOptionTwo = (e) => {
        e.preventDefault();
        dispatch(handleAddAnswer(question.id, "optionTwo"));
        navigate("/");
    };

    const calcPercentage = (option, question) => {
        const numberVotesTotal = question.optionOne.votes.length + question.optionTwo.votes.length;
        switch (option) {
            case "optionOne":
                return question.optionOne.votes.length / numberVotesTotal * 100 + " %";
            case "optionTwo":
                return question.optionTwo.votes.length / numberVotesTotal * 100 + " %";
            default:
                return "";
        }
    };

    return (
        <div>
            <h1 className="title">Poll by: {author.id}</h1>
            <hr className="title-line"/>

            <div className="poll-contain">                
              {(author?.avatarURL) ? <img src={author?.avatarURL} alt="Author" /> : <img src={noAvailable} alt="avatar" />}      
            </div>

            <div className="poll-contain">
                <h2 className="title">Would you rather?</h2>
            </div>

            <div className="poll-choice">
                <button onClick={handleOptionOne} disabled={hasVoted} >
                    <div className={hasVotedForOptionOne ? "chosen" : hasVoted ? "not-chose" : "normal"}>
                        <p className="title">{question.optionOne.text}</p>
                        {!hasVoted &&
                        <p>Click</p>
                        }
                        {hasVoted &&
                        <p className="text-xs">Votes: {question.optionOne.votes.length} ({calcPercentage("optionOne", question)})</p>
                        }
                    </div>
                </button>
                <button onClick={handleOptionTwo} disabled={hasVoted}>
                    <div className={hasVotedForOptionTwo ? "chosen" : hasVoted ? "not-chose" : "normal"}>
                        <p className="title">{question.optionTwo.text}</p>
                        {!hasVoted &&
                        <p>Click</p>
                        }
                        {hasVoted &&
                        <p>Votes: {question.optionTwo.votes.length} ({calcPercentage("optionTwo", question)})</p>
                        }
                    </div>
                </button>
            </div>
        </div>
    );
};

const mapStateToProps = ({authedUser, users, questions}) => {
    try {
        const question = Object.values(questions).find((question) => question.id === useParams().id);
        const author = Object.values(users).find((user) => user.id === question.author);
        return {authedUser, question, author};
    } catch (e) {
        return <Navigate to="/404"/>;
    }
};

export default connect(mapStateToProps)(PollPage);
