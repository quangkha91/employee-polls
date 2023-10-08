import {connect} from "react-redux";
import Card from "./Card";

const Dashboard = ({authedUser, questions, users}) => {
    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));

    return (
        <div>
            <h1 className="title">New questions:</h1>
            <hr className="title-line"/>
            <div className="card-group">
                {questions
                    .filter(unanswered)
                    .map((question) => (
                            <Card question={question} author={users[question.author]} key={question.id}/>
                    ))}
            </div>
            
            <h1 className="title">Answered questions:</h1>
            <div className="card-group">
                {questions
                    .filter(answered)
                    .map((question) => (
                            <Card question={question} author={users[question.author]} key={question.id}/>
                    ))}
            </div>
        </div>
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);
